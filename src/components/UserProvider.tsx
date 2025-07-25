'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/stores/useUserStore';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export default function UserProvider({ children }: { children: React.ReactNode }) {
    const supabase = createClientComponentClient();
    const router = useRouter();
    const { setUser, user } = useUserStore();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user?.id) {
            setLoading(false);
            return;
        }

        const handleUser = async () => {
            const {
                data: { user },
                error: authError,
            } = await supabase.auth.getUser();

            if (!authError && user) {
                    const {data: existingUser, error: fetchError} = await supabase
                        .from('users')
                        .select('*')
                        .eq('id', user.id)
                        .single();

                if (fetchError && fetchError.code !== 'PGRST116') {
                    console.error('Failed to fetch user:', fetchError.message);
                    return;
                }
                setUser(existingUser);
            }

            setLoading(false);
        };

        handleUser();
    }, [supabase, router, setUser, user]);

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center">
            <span className="text-gray-500">Loading...</span>
        </div>
    );

    return <>{children}</>;
}