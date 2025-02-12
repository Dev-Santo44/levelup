import React, { useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../services/firebase/firebase";
import { Link, useNavigate } from "react-router-dom";

import '../styles/Login.css'

const SignIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSignIn = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/home");
        } catch (err) {
            setError(err.message);
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
            navigate("/");
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="main-contain">
            <div className="login-container">
                <div className="text-area">
                <h1 className="text-2xl mb-4">Player Login</h1>
                <p>Start Your amazing journy with us Level up.. </p>
                {error && <p className="text-red-500">{error}</p>}
                </div>
                <div>
                    <form onSubmit={handleSignIn} className="flex flex-col gap-4">
                        <label for="email">Email</label>
                        <input
                            id="email"
                            type="email"
                            placeholder="Enter your Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="border rounded p-2"
                        />
                        <label for="password">Password</label>
                        <input
                            id="password"
                            type="password"
                            placeholder="Enter your Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="border rounded p-2"
                        />
                        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Sign In</button>
                    </form>
                    <p>Don't have an account <Link to={'/signup'}>Sign up here</Link></p>

                    <button
                        onClick={handleGoogleSignIn}
                        className="bg-red-500 text-white p-2 rounded mt-4"
                    >

                        Google

                    </button>
                    <p>Sign In with Google here...</p>
                </div>
            </div>
        </div>
    );
};

export default SignIn;