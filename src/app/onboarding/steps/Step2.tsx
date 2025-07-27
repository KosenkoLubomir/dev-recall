// app/onboarding/steps/Step2.tsx
'use client';

import { useEffect, useState } from 'react';
import { useOnboardingStore } from '@/stores/useOnboardingStore';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import {useUserStore} from "@/stores/useUserStore";

export default function Step2() {
    const supabase = createClientComponentClient();
    const { setStep } = useOnboardingStore();

    const { user, setStack } = useUserStore();

    const [stackOptions, setStackOptions] = useState<{ id: string; name: string }[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const fetchStacks = async () => {
            setLoading(true);

            const { data, error } = await supabase.rpc('get_stack_items_by_role', {
                role_input: user.role,
            });

            if (error) {
                console.error('Error loading stack:', error.message);
            } else {
                console.log('fetched data', data);
                setStackOptions(data || []);
            }

            setLoading(false);
        };

        console.log('Fetching stack items for role:', user.role);

        if (user.role) fetchStacks();
    }, [user.role, supabase]);

    const toggleStack = (id: string) => {
        if (!stackOptions || !Array.isArray(stackOptions)) return;

        const item = stackOptions.find((s) => s.id === id);
        if (!item) return;

        const exists = (user.stack_items || []).find((s) => s.id === id);

        if (exists) {
            setStack(user.stack_items.filter((s) => s.id !== id));
        } else if (!user.stack_items || user.stack_items.length < 20) {
            setStack([...(user.stack_items || []), item]);
        }
    };

    const handleNext = async () => {
        setSaving(true);

        // Optional: Reset previous selection
        await supabase.from('users').update({ stack_items: [] }).eq('id', user.id);

        const { error } = await supabase
            .from('users')
            .update({ stack_items: user.stack_items.map((s) => s.id) }) // Only send IDs to Supabase
            .eq('id', user.id);

        if (error) {
            console.error('Failed to save stack:', error.message);
        } else {
            setStep(3);
        }

        setSaving(false);
    };

    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">Step 2: Select Your Tech Stack</h2>
            {loading ? (
                <div className={"h-10"}>Loading stack options...</div>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-4">
                    {stackOptions.map(({ id, name }) => (
                        <button
                            key={id}
                            onClick={() => toggleStack(id)}
                            className={`border cursor-pointer rounded px-3 py-2 text-sm ${
                                user.stack_items?.some((item) => item.id === id) ? 'bg-blue-600 text-white border-blue-600 hover:bg-blue-700' : 'border-gray-300 hover:bg-gray-100'
                            }`}
                        >
                            {name}
                        </button>
                    ))}
                </div>
            )}

            <div className="text-sm text-gray-500 mb-2">{user?.stack_items?.length || "0"}/20 selected</div>

            <button
                disabled={saving || user?.stack_items?.length === 0}
                onClick={handleNext}
                className="bg-blue-600 cursor-pointer text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
            >
                {saving ? 'Saving...' : 'Next'}
            </button>
        </div>
    );
}