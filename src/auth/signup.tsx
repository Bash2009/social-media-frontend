import { useState } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

interface SignUpProps {
    handleChange: () => void;
}

const SignUp = ({ handleChange }: SignUpProps) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        if (email && password) {
            await createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // Signed in
                    const user = userCredential.user;
                    console.log("User created:", user);
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    alert(`Error ${errorCode}: ${errorMessage}`);
                });
        }
        return (
            <>
                <form
                    action="#"
                    method="post"
                    onSubmit={handleSubmit}
                    className="bg-white p-3 p-md-5 rounded-5 col-11 col-md-7 col-lg-5 auth-form"
                >
                    <p className="fs-3 text-center fw-bold">Sign up</p>
                    <div className="form-floating w-100">
                        <input
                            type="email"
                            className="form-control mb-3"
                            id="sign_email"
                            placeholder=""
                            required
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <label htmlFor="sign_email" className="fs-6">
                            Email...
                        </label>
                    </div>

                    <div className="form-floating w-100">
                        <input
                            type="password"
                            className="form-control mb-3"
                            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                            id="sign_pass"
                            placeholder=""
                            required
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <label htmlFor="sign_pass" className="fs-6">
                            Password...
                        </label>
                    </div>

                    <div className="form-floating w-100">
                        <input
                            type="password"
                            className="form-control mb-3"
                            id="con_pass"
                            placeholder=""
                            required
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <label htmlFor="con_pass" className="fs-6">
                            Confirm password...
                        </label>
                    </div>

                    <span className="mb-2">
                        Have an account?
                        <span
                            onClick={handleChange}
                            className="text-primary"
                            style={{ cursor: "pointer" }}
                        >
                            Log in
                        </span>
                    </span>
                    <button type="submit" className="btn btn-primary">
                        Create
                    </button>
                </form>
            </>
        );
    };
};

export default SignUp;
