"use client"
import { useEffect, useState } from 'react';

const fetchUsers = async () => {
    const res = await fetch('/api/users');
    if (!res.ok) {
        throw new Error('Failed to fetch users');
    }
    return res.json();
};

const addUser = async (user) => {
    const res = await fetch('/api/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    });
    if (!res.ok) {
        throw new Error('Failed to add user');
    }
    return res.json();
};

export default function Admin() {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getUsers = async () => {
            try {
                const data = await fetchUsers();
                if (Array.isArray(data)) {
                    setUsers(data);
                } else {
                    throw new Error('Error Fetch database');
                }
                setError(null); 
            } catch (error) {
                console.error(error);
                setError(error.message); 
            }
        };
        getUsers();
    }, []);

    const handleAddUser = async () => {
        const user = { name: 'New User' };
        try {
            const newUser = await addUser(user);
            setUsers((prev) => [...prev, newUser]);
            setError(null); 
        } catch (error) {
            console.error(error);
            setError(error.message); 
        }
    };

    return (
        <div>
            <h1>Admin Page</h1>
            <button onClick={handleAddUser}>Add User</button>
            {error && <div style={{ color: 'red' }}>Error: {error}</div>}
            <ul>
                {Array.isArray(users) && users.map((user, index) => (
                    <li key={index}>{user.name}</li>
                ))}
            </ul>
        </div>
    );
}
