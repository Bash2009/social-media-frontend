import { useEffect, useState } from "react";
import {
	onAuthStateChanged,
	sendEmailVerification,
	type User,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import Forms from "./forms";

const Auth = () => {
	const navigate = useNavigate();
	async function resendVerificationEmail() {
		if (!auth.currentUser) return;
		await sendEmailVerification(auth.currentUser).catch((error) => {
			console.log(`Error ${error.code}: ${error.message}`);
		});
	}

	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		return onAuthStateChanged(auth, (u) => {
			setUser(u);
			setLoading(false);
		});
	}, []);

	if (loading) return null;
	if (!user) return <Forms />;

	if (!user.emailVerified) {
		resendVerificationEmail();
		navigate("/verify-email");
	} else {
		navigate("/profile-setup");
	}
};

export default Auth;
