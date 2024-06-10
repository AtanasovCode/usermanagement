import { create } from 'zustand';

export const useStore = create((set) => ({
    session: null,
    setSession: (session) => set({ session }),
    userId: null,
    setUserId: (id) => set({ userId: id }),
    email: null,
    saveEmail: (email) => set({ email }),
    username: null,
    saveUsername: (username) => set({ username }),
    initialAvatarUrl: "https://robohash.org/bluerobotwithtechpart",
    avatarUrl: null,
    saveAvatarUrl: (avatarUrl) => set({ avatarUrl }),
    website: "mywebsite.com",
    saveWebsite: (website) => set({ website }),
}));
