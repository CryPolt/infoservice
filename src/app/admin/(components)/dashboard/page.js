"use client"
import { useEffect, useState } from 'react';
import styles from './dashboard.module.css';

const useClient = (endpoint) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(endpoint)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setData(data.body || []);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setError(error);
                setLoading(false);
            });
    }, [endpoint]);

    return { data, setData, loading, error };
};

export const Dashboard = () => {
    const { data: services, setData: setServices, loading, error } = useClient('/api/service');

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`/api/service/delete?id=${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error(`Failed to delete service: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            console.log('Service deleted successfully:', data.message);
            
            setServices(data.services);
            
        } catch (error) {
            console.error('Error deleting service:', error);
            alert('Failed to delete service. Please try again.');
        }
    };
    

    const handleEdit = async (id) => {
        const newTitle = prompt('Ente new title:');
        const newDescription = prompt('Enter new description:');
    
        if (newTitle && newDescription) {
            try {
                const response = await fetch('/api/service/edit', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ id, title: newTitle, description: newDescription }),
                });
    
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
    
                const data = await response.json();
                console.log('Service updated successfully:', data.message);

                // Refetch the updated list of services
                fetch('/api/service')
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }
                        return response.json();
                    })
                    .then(data => {
                        setServices(data.body || []);
                    })
                    .catch(error => {
                        console.error('Error fetching data:', error);
                    });
    
            } catch (error) {
                console.error('Error updating service:', error);
                alert('Failed to update service. Please try again.');
            }
        }
    };

    return (
        <div className={styles.dashboard}>
            <h1>Service Management</h1>
            {loading ? (
                <p>Loading...</p>
            ) : services && services.length > 0 ? (
                <div className={styles.servicesTable}>
                    <div className={styles.tableHeader}>
                        <div className={styles.columnHeader}>Title</div>
                        <div className={styles.columnHeader}>Description</div>
                        <div className={styles.columnHeader}>Actions</div>
                    </div>
                    {services.map(service => (
                        <div key={service.id} className={styles.tableRow}>
                            <div className={styles.column}>{service.title}</div>
                            <div className={styles.column}>{service.description}</div>
                            <div className={styles.column}>
                                <button className={styles.deleteButton} onClick={() => handleDelete(service.id)}>Delete</button>
                                <button className={styles.editButton} onClick={() => handleEdit(service.id)}>Edit</button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No services available.</p>
            )}
        </div>
    );
};

export default Dashboard;
