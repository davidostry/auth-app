
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { loginUser } from "../services/api";
import { useAuthStore } from "../store/authStore";
import "./Login.css";

export default function Login() {
    const navigate = useNavigate();

    const setToken = useAuthStore((state) => state.setToken);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault();

        setError("");
        setLoading(true);

        try {
            // מוחק token ישן לפני התחברות חדשה
            localStorage.removeItem("token");

            const data = await loginUser(email, password);

            // השרת מחזיר { token: "..." }
            setToken(data.token);

            navigate("/profile");
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError("Login failed");
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="login">
            <h1>Login</h1>

            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email</label>

                    <input
                        type="email"
                        value={email}
                        onChange={(event) =>
                            setEmail(event.target.value)
                        }
                    />
                </div>

                <div>
                    <label>Password</label>

                    <input
                        type="password"
                        value={password}
                        onChange={(event) =>
                            setPassword(event.target.value)
                        }
                    />
                </div>

                {error && <p>{error}</p>}

                <button className="button" type="submit" disabled={loading}>
                    {loading ? "Logging in..." : "Login"}
                </button>
            </form>

            <p>
                Don't have an account?{" "}
                <br />
                <Link className="link" to="/register">Register</Link>
            </p>
        </div>
    );
}
