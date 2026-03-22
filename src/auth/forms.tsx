import { useState } from "react";
import Login from "./login";
import SignUp from "./signup";

const Forms = () => {
	const [isLogin, setLogin] = useState(true);

	const changeIsLogin = () => {
		setLogin(!isLogin);
	};
	return (
		<>
			{isLogin && <Login handleChange={changeIsLogin} />}
			{!isLogin && <SignUp handleChange={changeIsLogin} />}
		</>
	);
};

export default Forms;
