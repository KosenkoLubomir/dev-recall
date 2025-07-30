'use client';

import { useEffect, useState } from 'react';
import { useUserStore } from '@/stores/useUserStore';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export default function UserProvider({ children }: { children: React.ReactNode }) {
    const supabase = createClientComponentClient();
    const { setUser, user } = useUserStore();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const handleUser = async () => {
            const {
                data: { user: authUser },
                error: authError,
            } = await supabase.auth.getUser();

            if (authError || !authUser) {
                setLoading(false);
                return;
            }

            // Skip if Zustand already has correct user
            if (user?.id === authUser.id) {
                setLoading(false);
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

            setLoading(false);
        };

        handleUser();

        // 👇 Subscribe to auth state changes (login/logout)
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            if (session?.user) {
                handleUser(); // re-fetch and store user
            }
        });

        // 👇 Cleanup subscription on unmount
        return () => {
            subscription.unsubscribe();
        };
    }, [supabase, setUser, user?.id]);

    // if (loading) {
    //     return (
    //         <div className="min-h-screen flex items-center justify-center">
    //             <span className="text-gray-500">Loading...</span>
    //         </div>
    //     );
    // }

    return <>{children}</>;
}