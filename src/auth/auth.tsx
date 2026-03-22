import { useState } from "react";
import { type User } from "firebase/auth";
import Forms from "./forms";
const Auth = () => {
	const [user] = useState<User | null>(null);
	if (!user) return <Forms />;
};

export default Auth;
