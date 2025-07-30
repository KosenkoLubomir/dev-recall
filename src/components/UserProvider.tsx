'use client';

import { useEffect } from 'react';
import { useUserStore } from '@/stores/useUserStore';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export default function UserProvider({ children }: { children: React.ReactNode }) {
    const supabase = createClientComponentClient();
    const { setUser, user } = useUserStore();

    useEffect(() => {
        const handleUser = async () => {
            const {
                data: { user: authUser },
                error: authError,
            } = await supabase.auth.getUser();

            if (authError || !authUser) {
                return;
            }

            if (user?.id === authUser.id) {
                return;
            }

            const { data: dbUser, error: fetchError } = await supabase
                .from('users')
                .select('*')
                .eq('id', authUser.id)
                .single();

            if (fetchError && fetchError.code !== 'PGRST116') {
                console.error('Failed to fetch user:', fetchError.message);
            } else if (dbUser) {
                setUser(dbUser);
            }
        };

        handleUser();

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            if (session?.user) {
                handleUser();
            }
        });

        return () => {
            subscription.unsubscribe();
        };
    }, [supabase, setUser, user?.id]);

    return <>{children}</>;
}