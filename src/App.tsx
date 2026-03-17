import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import "./verification/VerifyEmail.css";
import VerifyEmail from "./verification/VerifyEmail";
import ProfileSetup from "./profileSetup/ProfileSetup";
import Auth from "./auth/auth";
import "./App.css";
import "./verification/VerifyEmail.css";

const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Auth />} />
				<Route path="/verify-email" element={<VerifyEmail />} />
				<Route path="/profile-setup" element={<ProfileSetup />} />
			</Routes>
		</BrowserRouter>
	);
};

export default App;
