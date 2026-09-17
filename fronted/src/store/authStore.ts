import { create } from 'zustand';

type AuthStore = {
    token: string | null;
    setToken: (token: string) => void;
    logout: () => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
    token: localStorage.getItem("token"),

    setToken: (token) => {
        localStorage.setItem("token", token);
        set({ token });
    },
    logout: () => {
        localStorage.removeItem("token");
        set({ token: null });
    },
}));
