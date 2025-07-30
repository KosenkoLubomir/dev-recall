import { Suspense } from 'react';
import OnboardingPageInner from './OnboardingPageInner';

export default function OnboardingPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
            <OnboardingPageInner />
        </Suspense>
    );
}