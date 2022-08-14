import create from 'zustand'

export const useGlobalStore = create((set) => ({
    session: undefined,
    setSession: (session) => set({ session: session }),

    showLoginModal: false,
    setShowLoginModal: (show) => set({ showLoginModal: show }),
}))