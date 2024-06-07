import { create } from 'zustand';

export const useStore = create((set) => ({
    session: null,
    setSession: (session) => set({ session }),
    userId: null,
    setUserId: (id) => set({ userId: id })
}));
