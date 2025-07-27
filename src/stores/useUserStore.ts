import { create } from 'zustand';
import { User } from '@/types/user';
import { StackItem } from '@/types/stack_item';

type UserState = {
    user: User;
    setUser: (user: User) => void;
    reset: () => void;
    setRole: (role: string) => void;
    setLevel: (level: string) => void;
    setStack: (stack_items: StackItem[]) => void;
    setVisibility: (visibility: 'public' | 'private') => void;
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

    setUser: (user: User) => set({ user }),

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