'use client';

import { useEffect, useState } from 'react';
import { useOnboardingStore } from '@/stores/useOnboardingStore';
import Step1 from '@/app/onboarding/steps/Step1';
import Step2 from '@/app/onboarding/steps/Step2';
import Step3 from '@/app/onboarding/steps/Step3';
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter, useSearchParams } from "next/navigation";
import { useUserStore } from "@/stores/useUserStore";

export default function OnboardingPageInner() {
    const [loading, setLoading] = useState(true);
    const { step, setStep } = useOnboardingStore();
    const { user } = useUserStore();
    const TOTAL_STEPS = 3;

    const supabase = createClientComponentClient();
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        const code = searchParams.get('code');
        const alreadyAuthed = user?.id;

        if (!code && alreadyAuthed) {
            setLoading(false);
            return;
        }

        if (code && !alreadyAuthed) {
            const handleAuth = async () => {
                const { data: { user }, error: authError } = await supabase.auth.getUser();
                if (authError || !user) {
                    console.error('Failed to fetch user after code exchange:', authError?.message);
                    return;
                }

                const { error: insertError } = await supabase.from('users').insert({
                    id: user.id,
                    email: user.email,
                    name: user.user_metadata?.name ?? '',
                    visibility: 'public',
                });

                if (insertError && insertError.code !== '23505') {
                    console.error('User insert failed:', insertError.message);
                    return;
                }

                setLoading(false);
            };

            handleAuth();
        }
    }, [searchParams, supabase, router, user]);

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center">Loading onboarding…</div>;
    }

    const renderStep = () => {
        switch (step) {
            case 1: return <Step1 />;
            case 2: return <Step2 />;
            case 3: return <Step3 />;
            default: return <Step1 />;
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-start px-6 py-12 bg-gray-50">
            <div className="w-full max-w-2xl mb-4">
                <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
                    ></div>
                </div>
                <div className="text-sm text-gray-500 text-right mt-1">
                    Step {step} of {TOTAL_STEPS}
                </div>
            </div>

            <div className="flex justify-between items-center mb-8 w-full max-w-2xl">
                <button
                    onClick={() => setStep(step - 1)}
                    disabled={step === 1}
                    className="cursor-pointer text-blue-600 hover:underline disabled:text-gray-400 disabled:cursor-not-allowed"
                >
                    ← Back
                </button>

                {step < TOTAL_STEPS && (
                    <button
                        onClick={() => setStep(step + 1)}
                        className="cursor-pointer text-blue-600 hover:underline"
                    >
                        Next →
                    </button>
                )}
            </div>

            <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-md">
                {renderStep()}
            </div>
        </div>
    );
}