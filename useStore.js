import { create } from 'zustand';
import * as Crypto from 'expo-crypto';

export const useStore = create((set) => ({
    //supabase state
    session: null,
    setSession: (session) => set({ session }),
    userId: null,
    setUserId: (id) => set({ userId: id }),

    //state for user info
    email: null,
    saveEmail: (email) => set({ email }),
    username: null,
    saveUsername: (username) => set({ username }),
    initialAvatarUrl: "https://robohash.org/bluerobotwithtechpart",
    avatarUrl: null,
    saveAvatarUrl: (avatarUrl) => set({ avatarUrl }),
    website: "mywebsite.com",
    saveWebsite: (website) => set({ website }),

    //State for creating a new post
    title: null,
    saveTitle: (title) => set({ title }),
    body: null,
    saveBody: (body) => set({ body }),
    availableFlairs: [
        {
            name: "Opinion",
            color: "#1fb2cd",
        },
        {
            name: "Discussion",
            color: "#155e75",
        },
        {
            name: "Rant",
            color: "#1e40af",
        },
        {
            name: "Help",
            color: "#be123c",
        },
        {
            name: "Question",
            color: "#16a34a",
        },
        {
            name: "Meme",
            color: "#65a30d",
        },
        {
            name: "Serious",
            color: "#be123c",
        },
    ],
    flair: { name: null, color: null },
    saveFlair: (name, color) => set({ flair: { name, color } })
}));
