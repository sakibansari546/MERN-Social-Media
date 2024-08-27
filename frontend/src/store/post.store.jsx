import { create } from "zustand";
import axios from "axios";

const API_URL = import.meta.env.VITE_MODE === "development" ? "http://localhost:3000/api/post" : "/api/post";

const postStore = create((set) => ({
    posts: [],
    post: null,
    message: "",
    isLoading: false,
    error: null,

    createPost: async (formData) => {
        set({ isLoading: true, error: null });
        try {
            const res = await axios.post(`${API_URL}/create-post`, formData, { withCredentials: true });
            set((state) => ({ message: res.data.message, isLoading: false }));
        } catch (error) {
            set({ error: error.message, isLoading: false });
        }
    },

    getPosts: async () => {
        set({ isLoading: true, error: null });
        try {
            const res = await axios.get(`${API_URL}/get-posts`, { withCredentials: true });
            set((state) => ({ posts: res.data.posts, isLoading: false }));
        } catch (error) {
            set({ error: error.message, isLoading: false });
        }
    },
    likeOrNot: async (postId) => {
        set({ error: null });
        try {
            const res = await axios.post(`${API_URL}/like-unlike`, { postId }, { withCredentials: true });
            // set((state) => ({ message: res.data.message }));
        } catch (error) {
            set({ error: error.message, });
        }
    }


}));

export default postStore;