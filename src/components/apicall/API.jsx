import { useState, useEffect } from "react";

const API = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const res = await fetch("URL", { method: "GET" });

            if (!res.ok) {
                throw new Error(" Faliled to fetch users");
            }
            const data = await res.json();
            setUsers(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    if (loading) <h2>Loading....</h2>;

    if (error) <h2>{error}</h2>;

    return <div>{users.length > 0 ? <p>Users</p> : <p>No Users</p>}</div>;
};

export default API;
