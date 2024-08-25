import { create } from "zustand";
import axios from "axios";

const API_URL = import.meta.env.VITE_MODE === "development" ? "http://localhost:3000/api/auth" : "/api/auth";

// console.log(import.meta.env.VITE_MODE);

export const useAuthStore = create((set) => ({
    user: null,
    isAuthenticated: false,
    error: null,
    isLoading: false,
    isCheckingAuth: true,
    message: null,

    signupAndSignin: async (formData, type) => {
        set({ isLoading: true, error: null });
        try {
            const res = await axios.post(`${API_URL}/${type}`, formData, { withCredentials: true });
            set({ user: res.data.user, isAuthenticated: type === 'signin', isLoading: false });
            return res.data.user;
        } catch (error) {
            console.error('Signup Error:', error.response ? error.response.data : error.message);
            set({ error: error.response?.data?.message || `Error during ${type}`, isLoading: false });
            throw error;
        }
    },

    verifyEmail: async (code) => {
        set({ isLoading: true, error: null });
        try {
            let res = await axios.post(`${API_URL}/verify-email`, { code }, { withCredentials: true });
            set({ user: res.data.user, isAuthenticated: true, isLoading: false });
            return res.data.user;
        } catch (error) {
            console.error('Verification Error:', error.response ? error.response.data : error.message);
            set({ error: error.response?.data?.message || "Error verifying email", isLoading: false });
            throw error;
        }
    },

    forgotPassword: async (email) => {
        set({ isLoading: true, error: null });
        try {
            let res = await axios.post(`${API_URL}/forgot-password`, { email }, { withCredentials: true });
            set({ message: res.data.message, isLoading: false });
            return res.data.message;
        } catch (error) {
            console.error('Forgot Password Error:', error.response ? error.response.data : error.message);
            set({ error: error.response?.data?.message || "Error sending password reset link", isLoading: false });
            throw error;
        }
    },

    resetPassword: async (password, token) => {
        set({ isLoading: true, error: null });
        try {
            let response = await axios.post(`${API_URL}/reset-password/${token}`, { password }, { withCredentials: true });
            set({ user: response.data.user, isAuthenticated: true, isLoading: false });
        } catch (error) {
            console.error('Reset Password Error:', error.response ? error.response.data : error.message);
            set({ error: error.response?.data?.message || "Error resetting password", isLoading: false });
            throw error;
        }
    },

    checkAuth: async () => {
        set({ isCheckingAuth: true });
        try {
            const res = await axios.get(`${API_URL}/check-auth`, { withCredentials: true });
            set({ user: res.data.user, isAuthenticated: true, isCheckingAuth: false });
            return res.data.user;
        } catch (error) {
            console.error('Auth Check Error:', error.message);
            set({ isCheckingAuth: false });
            return null;
        }
    },
    logout: async () => {
        try {
            await axios.get(`${API_URL}/logout`, { withCredentials: true });
            set({ user: null, isAuthenticated: false });
        } catch (error) {
            console.error('Logout Error:', error.message);
        }
    },

    editProfile: async (formData) => {
        set({ isLoading: true, error: null });
        try {
            const res = await axios.patch(`${API_URL}/edit-profile`, formData, { withCredentials: true });
            set({ user: res.data.user, isLoading: false });
            return res.data.user;
        } catch (error) {
            console.error('Edit Profile Error:', error.response ? error.response.data : error.message);
            set({ error: error.response?.data?.message || "Error editing profile", isLoading: false });
            throw error;
        }
    }

}));
