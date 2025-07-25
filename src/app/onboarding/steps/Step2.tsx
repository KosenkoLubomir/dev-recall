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
        const currentStack = Array.isArray(user.stack_items) ? user.stack_items : [];

        if (currentStack.includes(id)) {
            setStack(currentStack.filter((s) => s !== id));
        } else if (currentStack.length < 20) {
            setStack([...currentStack, id]);
        }
    };

    const handleNext = async () => {
        setSaving(true);

        // Remove existing stack (if re-onboarding)
        await supabase.from('users').update({stack_items: ""}).eq('id', user.id);

        const { error } = await supabase.from('users').update({stack_items: user.stack_items}).eq('id', user.id);

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
                                user.stack_items?.includes(id) ? 'bg-blue-600 text-white border-blue-600 hover:bg-blue-700' : 'border-gray-300 hover:bg-gray-100'
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