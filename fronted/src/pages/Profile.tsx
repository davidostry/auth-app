
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getDetails } from "../services/api";
import { useAuthStore } from "../store/authStore";

type User = {
    _id: string;
    userName: string | null;
    email: string;
};

export default function Profile() {
    const navigate = useNavigate();

    const token = useAuthStore((state) => state.token);
    const logout = useAuthStore((state) => state.logout);

    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadUser() {
            if (!token) {
                navigate("/login");
                return;
            }

            try {
                setLoading(true);
                setError("");

                const data = await getDetails(token);
                
                

                console.log("DETAILS FROM SERVER:", data);

                setUser(data);
            } catch (error) {
                console.error("PROFILE ERROR:", error);

                if (error instanceof Error) {
                    setError(error.message);
                } else {
                    setError("Failed to load user details");
                }
            } finally {
                setLoading(false);
            }
        }

        loadUser();
    }, [token, navigate]);

    function handleLogout() {
        logout();
        navigate("/login");
    }

    if (loading) {
        return <p>Loading details...</p>;
    }

    return (
        <div>
            <h1>Profile</h1>

            {error && (
                <p>{error}</p>
            )}

            {!error && user && (
                <div>
                    <p>
                        <strong>Username:</strong> {user.userName}
                    </p>

                    <p> <strong>Email:</strong> {user.email} </p>
                    <p> <strong>ID:</strong> {user._id} </p>
                </div>
            )}
            <button onClick={handleLogout}>
                Logout

            </button>
        </div>);
}
