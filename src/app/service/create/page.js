"use client";
import { useState } from 'react';
import style from '../service.module.css';
import { Header } from '../../(components)/header/header';
import SvgUploadForm from '../../SvgEditor/(components)/SvgUploadForm/SvgUploadForm';
import { createService } from '../../actions/Service';

export default function CreateService() {
    const [modalOpen, setModalOpen] = useState(false);
    const [formOpen, setFormOpen] = useState(false);
    const [newItem, setNewItem] = useState({ title: '', description: '', isactive: 0, svgid: null });
    const [selectedFile, setSelectedFile] = useState(null); 
    const [selectedId, setSelectedId] = useState(''); 

    const toggleModal = () => setModalOpen(!modalOpen);
    const toggleForm = () => setFormOpen(!formOpen);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewItem(prevState => ({
            ...prevState,
            [name]: name === 'isactive' ? Number(value) : value
        }));
    };

    const handleSvgUpload = (svgId) => {
        setNewItem(prevState => ({ ...prevState, svgid: svgId }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // 1. Create the service
            const serviceResult = await createService(newItem);

            if (serviceResult.status !== 201) {
                throw new Error(serviceResult.body.error || 'Failed to create service');
            }

            if (selectedFile && selectedId) {
                const formData = new FormData();
                formData.append('file', selectedFile);
                formData.append('id', selectedId);

                const response = await fetch('/api/uploadSvg', {
                    method: 'POST',
                    body: formData,
                });

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.error || 'Failed to upload SVG');
                }

                handleSvgUpload(data.svgId);
            }

            setNewItem({ title: '', description: '', isactive: 0, svgid: null });
            toggleForm();
        } catch (error) {
            console.error('Error creating service:', error);
            alert('Failed to create service');
        }
    };

    return (
        <>
            <Header />
            <div className={style.portfolio}>
                <button onClick={toggleForm}>Add Service</button>
            </div>

            {formOpen && (
                <div className={style.modal}>
                    <div className={style.modalContent}>
                        <span className={style.close} onClick={toggleForm}>&times;</span>
                        <h2>Add Service</h2>
                        <form onSubmit={handleSubmit}>
                            <label>
                                Title:
                                <input
                                    type="text"
                                    name="title"
                                    value={newItem.title || ''}
                                    onChange={handleInputChange}
                                />
                            </label>
                            <br />
                            <label>
                                Description:
                                <input
                                    type="text"
                                    name="description"
                                    value={newItem.description || ''}
                                    onChange={handleInputChange}
                                />
                            </label>
                            <br />
                            <label>
                                Active:
                                <select
                                    name="isactive"
                                    value={newItem.isactive}
                                    onChange={handleInputChange}
                                >
                                    <option value={1}>Active</option>
                                    <option value={0}>Inactive</option>
                                </select>
                            </label>
                            <br />
                            {/* Pass necessary props to SvgUploadForm */}
                            <SvgUploadForm
                                selectedFile={selectedFile}
                                setSelectedFile={setSelectedFile}
                                selectedId={selectedId}
                                setSelectedId={setSelectedId}
                                onSvgUpload={handleSvgUpload}
                            />
                            <button type="submit">Add</button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}