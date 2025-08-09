'use client';

import { useEffect } from 'react';
import { useUserStore } from '@/stores/useUserStore';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export default function UserProvider({ children }: { children: React.ReactNode }) {
    const supabase = createClientComponentClient();
    const { setUser, user, setUserPlan } = useUserStore();

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

                const {data: plan, error: planError} = await supabase
                    .from('user_subscriptions')
                    .select('*')
                    .eq('user_id', dbUser.id)
                    .single();
                if (planError) {
                    console.log('Failed to fetch user plan:', planError.message);
                } else if (plan) {
                    setUserPlan({
                        plan: plan.plan,
                        status: plan.status,
                        start_date: plan.start_date,
                        updated_at: plan.updated_at,
                        current_period_end: plan.current_period_end,
                        payment_system_id: plan.payment_system_id || null, // e.g., Stripe subscription ID
                    });
                }
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