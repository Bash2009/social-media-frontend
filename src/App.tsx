import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import "./index.css";
import "./verification/VerifyEmail.css";
import "./chatList/ChatList.css";

import Auth from "./auth/auth";
import RequireAuth from "./auth/RequireAuth";
import VerifyEmail from "./verification/VerifyEmail";
import ProfileSetup from "./profileSetup/ProfileSetup";
import ChatLayout from "./chatList/ChatLayout";

const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				{/* Public */}
				<Route path="/" element={<Auth />} />
				<Route path="/verify-email" element={<VerifyEmail />} />

				{/* Protected — require Firebase session + access token */}
				<Route
					path="/profile-setup"
					element={
						<RequireAuth>
							<ProfileSetup />
						</RequireAuth>
					}
				/>
				<Route
					path="/chats"
					element={
						<RequireAuth>
							<ChatLayout />
						</RequireAuth>
					}
				/>
			</Routes>
		</BrowserRouter>
	);
};

export default App;
