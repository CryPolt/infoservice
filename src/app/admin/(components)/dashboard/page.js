import React, { useEffect, useState, useCallback } from 'react';
import styles from './dashboard.module.css';
import {
    deleteService,
    toggleService,
    editService,
    getService
} from '../../../actions/Service';

const useClient = (fetchData) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [pagination, setPagination] = useState({});

    useEffect(() => {
        fetchData()
            .then(response => {
                if (response.status === 200) {
                    setData(response.body.data || []);
                    setPagination({ page: response.body.page, limit: response.body.limit, total: response.body.total });
                } else {
                    setError({ message: response.body.error });
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setError(error);
            })
            .finally(() => setLoading(false));
    }, [fetchData]);

    return { data, loading, error, pagination, setData };
};

const Dashboard = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [editModalData, setEditModalData] = useState({ id: null, title: '', description: '' });
    const [services, setServices] = useState([]);
    const [loadingServices, setLoadingServices] = useState(true);
    const [error, setError] = useState(null);
    const [pagination, setPagination] = useState({});

    const fetchData = useCallback(() => getService(currentPage, 10), [currentPage]);

    useEffect(() => {
        fetchData()
            .then(response => {
                if (response.status === 200) {
                    setServices(response.body.data || []);
                    setPagination({ page: response.body.page, limit: response.body.limit, total: response.body.total });
                } else {
                    setError({ message: response.body.error });
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setError(error);
            })
            .finally(() => setLoadingServices(false));
    }, [fetchData]);

    const handleDelete = async (id) => {
        try {
            const response = await deleteService(id);

            if (response.status === 200) {
                const newData = services.filter(service => service.id !== id);
                setServices(newData);
                alert('Service deleted successfully.');
            } else {
                alert(`Failed to delete service: ${response.body.error}`);
            }

        } catch (error) {
            console.error('Error deleting service:', error);
            alert('Failed to delete service. Please try again.');
        }
    };

    const handleEdit = (id, title, description) => {
        setEditModalData({ id, title, description });
        setEditModalOpen(true); 
    };

    const handleCloseModal = () => {
        setEditModalOpen(false);
    };

    const handleSaveModal = async (id, newTitle, newDescription) => {
        try {
            const response = await editService({ id, title: newTitle, description: newDescription });

            if (response.status === 200) {
                const newData = services.map(service => {
                    if (service.id === id) {
                        return { ...service, title: newTitle, description: newDescription };
                    }
                    return service;
                });

                setServices(newData);
                alert('Service updated successfully.');
            } else {
                alert(`Failed to update service: ${response.body.error}`);
            }

        } catch (error) {
            console.error('Error updating service:', error);
            alert('Failed to update service. Please try again.');
        }

        setEditModalOpen(false);
    };

    const handleToggleStatus = async (id, currentStatus) => {
        try {
            const response = await toggleService(id);

            if (response.status === 200) {
                const newData = services.map(service => {
                    if (service.id === id) {
                        return { ...service, isactive: currentStatus === 1 ? 0 : 1 };
                    }
                    return service;
                });

                setServices(newData);
            } else {
                alert(`Failed to toggle service status: ${response.body.error}`);
            }

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
                            <button className={styles.editButton} onClick={() => handleEdit(service.id, service.title, service.description)}>Edit</button>
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

            {editModalOpen && (
                <div className={styles.modal}>
                    <div className={styles.modalContent}>
                        <h2>Edit Service</h2>
                        <input
                            type="text"
                            value={editModalData.title}
                            onChange={(e) => setEditModalData({ ...editModalData, title: e.target.value })}
                        />
                        <textarea
                            value={editModalData.description}
                            onChange={(e) => setEditModalData({ ...editModalData, description: e.target.value })}
                        />
                        <button onClick={() => handleSaveModal(editModalData.id, editModalData.title, editModalData.description)}>Save</button>
                        <button onClick={handleCloseModal}>Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
