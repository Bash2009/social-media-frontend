import axios from "axios";
import { io } from "socket.io-client";
import { auth } from "./firebase";
import { signOut } from "firebase/auth";

// ── Axios instance ────────────────────────────────────────────────────────────

const api = axios.create({
	baseURL: import.meta.env.VITE_BACKEND_URL,
	withCredentials: true,
});

// Attach the access token to every outgoing request
api.interceptors.request.use((config) => {
	const token = localStorage.getItem("access_token");
	if (token) config.headers.Authorization = `Bearer ${token}`;
	return config;
});

// On 401, attempt a silent token refresh; if that fails too, sign out fully
api.interceptors.response.use(
	(res) => res,
	async (error) => {
		const original = error.config;
		if (error.response?.status === 401 && !original._retry) {
			original._retry = true;
			const refreshToken = localStorage.getItem("refresh_token");
			if (refreshToken) {
				try {
					const { data } = await axios.post(
						`${import.meta.env.VITE_BACKEND_URL}/auth/refresh`,
						{ uid: auth.currentUser?.uid },
						{ headers: { Authorization: `Bearer ${refreshToken}` } },
					);
					localStorage.setItem("access_token", data.access_token);
					localStorage.setItem("refresh_token", data.refresh_token);
					original.headers.Authorization = `Bearer ${data.access_token}`;
					return api(original);
				} catch {
					await logout();
				}
			} else {
				await logout();
			}
		}
		return Promise.reject(error);
	},
);

export default api;

// ── Socket singleton ──────────────────────────────────────────────────────────
// Token is read lazily at connect-time so it's always fresh after a login/refresh.

export const socket = io(import.meta.env.VITE_BACKEND_URL, {
	withCredentials: true,
	autoConnect: false,
	auth: (cb) => cb({ token: localStorage.getItem("access_token") }),
});

// ── Shared logout ─────────────────────────────────────────────────────────────
// Invalidates tokens on the backend, clears localStorage, disconnects the socket,
// and signs out of Firebase. Call this from any "Sign out" button.

export const logout = async () => {
	const refreshToken = localStorage.getItem("refresh_token");
	try {
		if (refreshToken) {
			await axios.post(
				`${import.meta.env.VITE_BACKEND_URL}/auth/logout`,
				{ uid: auth.currentUser?.uid },
				{ headers: { Authorization: `Bearer ${refreshToken}` } },
			);
		}
	} catch {
		// Best-effort — clear locally regardless of server response
	} finally {
		localStorage.removeItem("access_token");
		localStorage.removeItem("refresh_token");
		socket.disconnect();
		await signOut(auth);
	}
};
