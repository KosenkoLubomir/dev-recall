import { create } from 'zustand';
import { User, UserPlan } from '@/types/user';
import { StackItem } from '@/types/stack_item';

type UserState = {
    user: User;
    userPlan: UserPlan;
    setUser: (user: User) => void;
    reset: () => void;
    setRole: (role: string) => void;
    setLevel: (level: string) => void;
    setStack: (stack_items: StackItem[]) => void;
    setVisibility: (visibility: 'public' | 'private') => void;
    setUserPlan: (plan: UserPlan) => void;
};

export const useUserStore = create<UserState>((set) => ({
    user: {
        id: '',
        email: '',
        name: '',
        role: '',
        level: '',
        stack_items: [],
        visibility: 'public',
    },

    userPlan: {
        plan: 'free',
        status: 'inactive',
        start_date: '',
        updated_at: '',
        current_period_end: '',
        payment_system_id: null, // e.g., Stripe subscription ID
    },

    setUser: (user: User) => set({ user }),

    setUserPlan: (plan: UserPlan) => set({ userPlan: plan }),

    setRole: (role: string) => set((state) => ({
        user: {
            ...state.user,
            role,
        }
    })),

    setLevel: (level: string) => set((state) => ({
        user: {
            ...state.user,
            level,
        }
    })),

    setStack: (stack_items: StackItem[]) => set((state) => ({
        user: {
            ...state.user,
            stack_items,
        }
    })),

    setVisibility: (visibility: 'public' | 'private') => set((state) => ({
        user: {
            ...state.user,
            visibility,
        }
    })),

    reset: () => set({
        user: {
            id: '',
            email: '',
            name: '',
            role: '',
            level: '',
            stack_items: [],
            visibility: 'public',
        },
    }),
}));