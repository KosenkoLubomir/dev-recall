// app/onboarding/steps/Step3.tsx
'use client';

import { useState } from 'react';
import { useOnboardingStore } from '@/stores/useOnboardingStore';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import {useUserStore} from "@/stores/useUserStore";

export default function Step3() {
    const supabase = createClientComponentClient();

    const {
        user,
        setVisibility } = useUserStore();

    const [saving, setSaving] = useState(false);
    const router = useRouter();

    const handleSelect = async (value: 'public' | 'private') => {
        setVisibility(value);
    };

    const handleFinish = async () => {
        setSaving(true);
        const { error } = await supabase.from('users').update({ visibility: user.visibility }).eq('id', user.id);
        if (error) {
            console.error('Failed to save visibility:', error.message);
        } else {
            // end onboarding or redirect to dashboard
            router.push('/dashboard'); // redirect to dashboard
            //setStep(0);
        }
        setSaving(false);
    };

    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">Step 3: Profile Visibility</h2>
            <p className="mb-4 text-sm text-gray-600">
                Select whether your profile should be publicly visible or private. Private profiles will be part of PRO plan (coming soon).
            </p>

            <div className="flex gap-4 mb-4">
                <button
                    className={`border px-4 py-2 cursor-pointer rounded ${
                        user.visibility === 'public' ? 'bg-blue-600 text-white' : 'border-gray-300'
                    }`}
                    onClick={() => handleSelect('public')}
                >
                    Public
                </button>

                <button
                    className={`border px-4 py-2 cursor-pointer rounded ${
                        user.visibility === 'private' ? 'bg-blue-600 text-white' : 'border-gray-300'
                    }`}
                    onClick={() => handleSelect('private')}
                >
                    Private
                </button>
            </div>

            <button
                disabled={saving}
                onClick={handleFinish}
                className="bg-green-600 cursor-pointer text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
            >
                {saving ? 'Saving...' : 'Finish'}
            </button>
        </div>
    );
}