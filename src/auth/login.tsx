import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "../firebase";

interface LoginProps {
	handleChange: () => void;
}

const Login = ({ handleChange }: LoginProps) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (email && password) {
			await signInWithEmailAndPassword(auth, email, password)
				.then((userCredential) => {
					// Signed in
					const user = userCredential.user;
					console.log("User logged in:", user);
				})
				.catch((error) => {
					const errorCode = error.code;
					const errorMessage = error.message;
					alert(`Error ${errorCode}: ${errorMessage}`);
				});
		}
	};
	return (
		<>
			<form
				action="#"
				method="post"
				className="bg-white p-3 p-md-5 rounded-5 col-11 col-md-7 col-lg-5 auth-form"
				onSubmit={handleSubmit}
			>
				<p className="fs-3 text-center fw-bold">Log in</p>
				<div className="form-floating w-100">
					<input
						type="email"
						className="form-control mb-3"
						id="log_email"
						placeholder=""
						required
						onChange={(e) => setEmail(e.target.value)}
					/>
					<label htmlFor="log_email" className="fs-6">
						Email...
					</label>
				</div>

				<div className="form-floating w-100">
					<input
						type="password"
						className="form-control mb-3"
						pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
						id="log_pass"
						placeholder=""
						required
						onChange={(e) => setPassword(e.target.value)}
					/>
					<label htmlFor="log_pass" className="fs-6">
						Password...
					</label>
				</div>

				<span className="mb-2">
					Don't have an account?
					<span
						onClick={handleChange}
						className="text-primary"
						style={{ cursor: "pointer" }}
					>
						Create one
					</span>
				</span>
				<button type="submit" className="btn btn-primary">
					Log in
				</button>
			</form>
		</>
	);
};

export default Login;
