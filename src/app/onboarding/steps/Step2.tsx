'use client';

import React, { useEffect, useState } from 'react';
import { useOnboardingStore } from '@/stores/useOnboardingStore';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useUserStore } from "@/stores/useUserStore";
import Button from "@/components/Button";

export default function Step2() {
    const supabase = createClientComponentClient();
    const { setStep } = useOnboardingStore();
    const { user, setStack } = useUserStore();

    const [stackOptions, setStackOptions] = useState<{ id: string; name: string }[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [isShowingAll, setIsShowingAll] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchRoleBasedStacks = async () => {
            setLoading(true);
            const { data, error } = await supabase.rpc('get_stack_items_by_role', {
                role_input: user.role,
            });
            if (error) console.error('Error loading role-based stack:', error.message);
            else setStackOptions(data || []);
            setLoading(false);
        };

        if (user.role) fetchRoleBasedStacks();
    }, [user.role]);

    const fetchAllStacks = async () => {
        setLoading(true);
        const { data, error } = await supabase.from('stack_items').select('*');
        if (error) console.error('Error loading all stack items:', error.message);
        else setStackOptions(data || []);
        setLoading(false);
    };

    const toggleStack = (id: string) => {
        const item = stackOptions.find((s) => s.id === id);
        if (!item) return;

        const exists = user.stack_items?.some((s) => s.id === id);
        if (exists) {
            setStack(user.stack_items.filter((s) => s.id !== id));
        } else if (!user.stack_items || user.stack_items.length < 20) {
            setStack([...(user.stack_items || []), item]);
        }
    };

    const handleNext = async () => {
        setSaving(true);

        await supabase.from('users').update({ stack_items: [] }).eq('id', user.id);
        const { error } = await supabase
            .from('users')
            .update({ stack_items: user.stack_items.map((s) => s.id) })
            .eq('id', user.id);

        if (error) console.error('Failed to save stack:', error.message);
        else setStep(3);

        setSaving(false);
    };

    const filteredOptions = stackOptions.filter((s) =>
        s.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleToggleShowAll = async () => {
        const newState = !isShowingAll;
        setIsShowingAll(newState);
        if (newState) await fetchAllStacks();
        else {
            const { data, error } = await supabase.rpc('get_stack_items_by_role', {
                role_input: user.role,
            });
            if (error) console.error('Error loading role-based stack:', error.message);
            else setStackOptions(data || []);
        }
    };

    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">Step 2: Select Your Tech Stack</h2>

            <div className="flex items-center justify-between gap-2 mb-4">
                <input
                    type="text"
                    placeholder="Search stack..."
                    className="border rounded px-3 py-2 text-sm w-full focus:outline-none border-gray-300 focus:border-blue-500"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button
                    onClick={handleToggleShowAll}
                    className="text-sm text-blue-600 underline whitespace-nowrap"
                >
                    {isShowingAll ? 'Show Role-Based' : 'Show All'}
                </button>
            </div>

            {loading ? (
                <div className="h-10">Loading stack options...</div>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-4">
                    {filteredOptions.map(({ id, name }) => (
                        <button
                            key={id}
                            onClick={() => toggleStack(id)}
                            className={`border cursor-pointer rounded px-3 py-2 text-sm ${
                                user.stack_items?.some((item) => item.id === id)
                                    ? 'bg-blue-600 text-white border-blue-600 hover:bg-blue-700'
                                    : 'border-gray-300 hover:bg-gray-100'
                            }`}
                        >
                            {name}
                        </button>
                    ))}
                </div>
            )}

            <div className="text-sm text-gray-500 mb-2">{user?.stack_items?.length || "0"}/20 selected</div>

            <Button onClick={handleNext} view={"primary"} disabled={saving || user?.stack_items?.length === 0}>{saving ? 'Saving...' : 'Next'}</Button>
        </div>
    );
}