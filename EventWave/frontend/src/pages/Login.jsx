import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {

            const response = await api.post(
                "/login",
                {
                    username,
                    password
                }
            );

            localStorage.setItem(
                "token",
                response.data.token
            );
            localStorage.setItem(
                "role",
                response.data.role
            );
            if (response.data.role === "admin") {
                navigate("/admin");
            }
            else {
                navigate("/student");
            }

        } catch (error) {

            console.log(error);

            setError(
                error.response?.data?.message ||
                "Login Failed"
            );
        }
    };

    return (
        <div>

            <h1>EventWave Login</h1>

            <form onSubmit={handleLogin}>

                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <br /><br />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <br /><br />

                <button type="submit">
                    Login
                </button>

            </form>

            {error && <p>{error}</p>}

        </div>
    );
}

export default Login;