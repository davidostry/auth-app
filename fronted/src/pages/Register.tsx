import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { registerUser } from "../services/api";
import "./Register.css"

export default function Register() {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault();

        setError("");
        setLoading(true);

        try {
            await registerUser(username, email, password);

            navigate("/login");
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError("Registration failed");
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="register">
            <h1>Register</h1>

            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username</label>

                    <input
                        type="text"
                        value={username}
                        onChange={(event) =>
                            setUsername(event.target.value)
                        }
                    />
                </div>

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

                <button type="submit" disabled={loading}>
                    {loading ? "Registering..." : "Register"}
                </button>
            </form>

            <p>
                Already have an account?{" "}
                <Link className="link" to="/login">Login</Link>
            </p>
        </div>
    );
}