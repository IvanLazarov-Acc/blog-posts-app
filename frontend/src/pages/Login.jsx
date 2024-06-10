import { useState } from "react";
import { useLogin } from "../hooks/useLogin";


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login, isLoading, error } = useLogin();

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(email, password);

        await login(email, password);
    }

    return (
        <form className="login" onSubmit={handleSubmit}>
            <h3>Log In</h3>
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
            <button>
                Log In
            </button>
            {error && <div className="error">{error}</div>}
        </form>
    );
}

export default Login;