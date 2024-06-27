"use client";
import React, { useEffect, useState } from 'react';
import styles from './dashboard.module.css';

const useClient = (endpoint) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [pagination, setPagination] = useState({});

    useEffect(() => {
        fetch(endpoint)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setData(data.body.data || []);
                setPagination({ page: data.body.page, limit: data.body.limit, total: data.body.total });
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setError(error);
                setLoading(false);
            });
    }, [endpoint]);

    return { data, loading, error, pagination, setData };
};

const Dashboard = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const { data: services, loading: loadingServices, setData: setServices, pagination, error } = useClient(`/api/service?page=${currentPage}&limit=10`);
    const { data: tables, loading: loadingTables } = useClient('/api/db');

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`/api/service/delete?id=${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error(`Failed to delete service: ${response.status} ${response.statusText}`);
            }

            const newData = services.filter(service => service.id !== id);
            setServices(newData);

        } catch (error) {
            console.error('Error deleting service:', error);
            alert('Failed to delete service. Please try again.');
        }
    };

    const handleEdit = async (id) => {
        const newTitle = prompt('Enter new title:');
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

                const newData = services.map(service => {
                    if (service.id === id) {
                        return { ...service, title: newTitle, description: newDescription };
                    }
                    return service;
                });

                setServices(newData);

            } catch (error) {
                console.error('Error updating service:', error);
                alert('Failed to update service. Please try again.');
            }
        }
    };

    const handleToggleStatus = async (id, currentStatus) => {
        const newStatus = currentStatus === 1 ? 0 : 1;

        try {
            const response = await fetch('/api/service/toggle', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id, isactive: newStatus }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const newData = services.map(service => {
                if (service.id === id) {
                    return { ...service, isactive: newStatus };
                }
                return service;
            });

            setServices(newData);

        } catch (error) {
            console.error('Error toggling service status:', error);
            alert('Failed to toggle service status. Please try again.');
        }
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    if (loadingServices) {
        return <p>Loading services...</p>;
    }

    if (error) {
        return <p>Error: {error.message}</p>;
    }

    if (!services || !Array.isArray(services) || services.length === 0) {
        return <p>No services available.</p>;
    }

    return (
        <div className={styles.dashboard}>
            <h1>Service Management</h1>
            <div className={styles.servicesTable}>
                <div className={styles.tableHeader}>
                    <div className={styles.columnHeader}>Title</div>
                    <div className={styles.columnHeader}>Description</div>
                    <div className={styles.columnHeader}>Status</div>
                    <div className={styles.columnHeader}>Actions</div>
                </div>
                {services.map(service => (
                    <div key={service.id} className={styles.tableRow}>
                        <div className={styles.column}>
                            {service.url ? (
                                <a href={service.url} className={styles.serviceLink}>{service.title}</a>
                            ) : (
                                <span>{service.title}</span>
                            )}
                        </div>
                        <div className={styles.column}>{service.description}</div>
                        <div className={styles.column}>
                            <label className={styles.switch}>
                                <input
                                    type="checkbox"
                                    checked={service.isactive === 1}
                                    onChange={() => handleToggleStatus(service.id, service.isactive)}
                                />
                                <span className={styles.slider}></span>
                            </label>
                            <button className={styles.deleteButton} onClick={() => handleDelete(service.id)}>Delete</button>
                            <button className={styles.editButton} onClick={() => handleEdit(service.id)}>Edit</button>
                        </div>
                    </div>
                ))}
            </div>
            <div className={styles.pagination}>
                {Array.from({ length: Math.ceil(pagination.total / pagination.limit) }, (_, index) => (
                    <button
                        key={index}
                        className={`${styles.pageButton} ${pagination.page === index + 1 ? styles.active : ''}`}
                        onClick={() => handlePageChange(index + 1)}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>

            <h1>Database Analysis</h1>
            {loadingTables ? (
                <p>Loading analysis...</p>
            ) : tables && tables.length > 0 ? (
                <div className={styles.analysisTable}>
                    <div className={styles.tableHeader}>
                        <div className={styles.columnHeader}>Table Name</div>
                    </div>
                    {tables.map((table, index) => (
                        <div key={index} className={styles.tableRow}>
                            <div className={styles.column}>{table.name}</div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No tables available.</p>
            )}
        </div>
    );
};

export default Dashboard;