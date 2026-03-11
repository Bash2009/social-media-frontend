import { useEffect, useState } from "react";
import {
	onAuthStateChanged,
	sendEmailVerification,
	type User,
} from "firebase/auth";
import { auth } from "./firebase";
import Auth from "./auth/auth";
import VerifyEmail from "./verification/VerifyEmail";
import "./App.css";
import "./verification/VerifyEmail.css";

// Replace this with your actual authenticated app
const Dashboard = () => <div>Your app here</div>;

const App = () => {
	async function resendVerificationEmail() {
		if (!auth.currentUser) return;
		await sendEmailVerification(auth.currentUser).catch((error) => {
			console.log(`Error ${error.code}: ${error.message}`);
		});
	}

	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const unsub = onAuthStateChanged(auth, (u) => {
			setUser(u);
			setLoading(false);
		});
		return unsub;
	}, []);

	if (loading) return null;
	if (!user) return <Auth />;

	if (!user.emailVerified) {
		resendVerificationEmail();
		return <VerifyEmail />;
	}
	return <Dashboard />;
};

export default App;
