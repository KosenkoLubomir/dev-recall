'use client';

import {useState} from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useOnboardingStore } from '@/stores/useOnboardingStore';
import { useUserStore} from "@/stores/useUserStore";
import { ROLES, LEVELS } from '@/constants/userOptions';

export default function Step1() {
    const supabase = createClientComponentClient();
    const { setStep } = useOnboardingStore();

    const { user, setRole, setLevel } = useUserStore();

    const [loading, setLoading] = useState(false);

    const handleNext = async () => {
        if (!user.role || !user.level || !user.id) return;

        setLoading(true);

        // First: update user info
        const { error: updateError } = await supabase
            .from('users')
            .update({ role: user.role, level: user.level })
            .eq('id', user.id);

        if (updateError) {
            console.error('Failed to update user:', updateError.message);
            setLoading(false);
            return;
        }

        setStep(2);
        setLoading(false);
    };

    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">Step 1: Select Role and Level</h2>

            <div className="mb-4">
                <label className="block font-medium mb-1">Role</label>
                <select
                    className="w-full border px-3 py-2 rounded"
                    value={user?.role || ''}
                    onChange={(e) => setRole(e.target.value)}
                >
                    <option value="">-- Select Role --</option>
                    {ROLES.map((r) => (
                        <option key={r} value={r}>{r}</option>
                    ))}
                </select>
            </div>

            <div className="mb-4">
                <label className="block font-medium mb-1">Level</label>
                <select
                    className="w-full border px-3 py-2 rounded"
                    value={user?.level || ''}
                    onChange={(e) => setLevel(e.target.value)}
                >
                    <option value="">-- Select Level --</option>
                    {LEVELS.map((l) => (
                        <option key={l} value={l}>{l}</option>
                    ))}
                </select>
            </div>

            <button
                disabled={loading || !user?.role || !user?.level}
                onClick={handleNext}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
            >
                {loading ? 'Saving...' : 'Next'}
            </button>
        </div>
    );
}