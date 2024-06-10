import { useState } from "react";
import { useSignup } from "../hooks/useSignup";


const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { signup, isLoading, error } = useSignup();

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(email, password);

        await signup(email, password);
    }

    return (
        <form className="signup" onSubmit={handleSubmit}>
            <h3>Sign Up</h3>
            <label>Email:</label>
            <input
                type="email"
                onChange={(event) => setEmail(event.target.value)}
                value={email}
            />
            <label>Password:</label>
            <input
                type="password"
                onChange={(event) => setPassword(event.target.value)}
                value={password}
            />
            <button disabled={isLoading}>
                Sign Up
            </button>
            {error && <div className="error">{error}</div>}
        </form>
    );
}

export default Signup;