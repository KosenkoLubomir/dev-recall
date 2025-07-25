import { create } from 'zustand';

type OnboardingState = {
    step: number;
    setStep: (step: number) => void;
    reset: () => void;
};

export const useOnboardingStore = create<OnboardingState>((set) => ({
    step: 1,
    setStep: (step) => set({ step }),
    reset: () => set({ step: 1 }),
}));