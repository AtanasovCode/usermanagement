import { create } from 'zustand';

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
    availableFlaires: [
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
            color: "#f87171",
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
    selectedFlaire: null,
    setSelectedFlaire: (flaire) => set({ selectedFlaire: flaire })
}));
