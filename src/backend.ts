import axios from "axios";
import { io } from "socket.io-client";

export const socket = io(import.meta.env.VITE_BACKEND_URL, {
	withCredentials: true,
	autoConnect: false,
});

const api = axios.create({
	baseURL: import.meta.env.VITE_BACKEND_URL,
	withCredentials: true,
});

export default api;
