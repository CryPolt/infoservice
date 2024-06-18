// src/app/admin/page.js
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

    useEffect(() => {
        const getUsers = async () => {
            try {
                const data = await fetchUsers();
                setUsers(data);
            } catch (error) {
                console.error(error);
            }
        };
        getUsers();
    }, []);

    const handleAddUser = async () => {
        const user = { name: 'New User' };
        try {
            const newUser = await addUser(user);
            setUsers((prev) => [...prev, newUser]);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h1>Admin Page</h1>
            <button onClick={handleAddUser}>Add User</button>
            <ul>
                {users.map((user, index) => (
                    <li key={index}>{user.name}</li>
                ))}
            </ul>
        </div>
    );
}
