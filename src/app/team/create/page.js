"use client"
import React, { useState } from 'react';
import Head from 'next/head';
import styles from './teamcreate.module.css';
import { Header } from '../../(components)/header/header';

const TeamCreate = () => {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [socialLinks, setSocialLinks] = useState({
    facebook: '',
    twitter: '',
    linkedin: ''
  });
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('role', role);
      formData.append('image', imageFile);
      formData.append('socialLinks', JSON.stringify(socialLinks));

      const response = await fetch('/api/team/create', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      console.log('Response:', data);

      if (response.ok) {
        setSuccessMessage('Team member added successfully!');
        setName('');
        setRole('');
        setImageFile(null);
        setSocialLinks({
          facebook: '',
          twitter: '',
          linkedin: ''
        });
        setImageUrl(data.imageUrl); 
      } else {
        setError(data.error || 'Failed to add team member');
      }
    } catch (error) {
      console.error('Error adding team member:', error);
      setError('Failed to add team member');
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImageFile(file);
  };

  return (
    <>
      <Head>
        <style>{`
          html, body {
            overflow: hidden;
          }
        `}</style>
      </Head>
      <Header />
      <div className={styles.page}>
        <h1>Add Team Member</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
          </label>
          <br />
          <label>
            Role:
            <input type="text" value={role} onChange={(e) => setRole(e.target.value)} required />
          </label>
          <br />
          <label>
            Image:
            <input type="file" accept="image/*" onChange={handleImageChange} required />
          </label>
          <br />
          <label>
            Facebook Link:
            <input type="text" value={socialLinks.facebook} onChange={(e) => setSocialLinks({ ...socialLinks, facebook: e.target.value })} />
          </label>
          <br />
          <button type="submit">Add Team Member</button>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
        {imageUrl && <img src={imageUrl} alt="Team member" />} 
      </div>
    </>
  );
};

export default TeamCreate;