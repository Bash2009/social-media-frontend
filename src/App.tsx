import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import "./verification/VerifyEmail.css";
import VerifyEmail from "./verification/VerifyEmail";
import ProfileSetup from "./profileSetup/ProfileSetup";
import Auth from "./auth/auth";
import "./App.css";
import "./verification/VerifyEmail.css";
import "./chatList/ChatList.css";
import ChatList from "./chatList/ChatList";
import ChatLayout from "./chatList/ChatLayout";

const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Auth />} />
				<Route path="/verify-email" element={<VerifyEmail />} />
				<Route path="/profile-setup" element={<ProfileSetup />} />
				<Route path="/chats" element={<ChatLayout />} />
			</Routes>
		</BrowserRouter>
	);
};

export default App;
