"use client"
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import styles from './team.module.css'; 
import { Header } from '../(components)/header/header';

const Team = () => {
    const [teamMembers, setTeamMembers] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTeamMembers = async () => {
            try {
                const response = await fetch('/api/team');
                if (!response.ok) {
                    throw new Error('Failed to fetch team members');
                }
                const data = await response.json();
                setTeamMembers(data.body); 
            } catch (error) {
                console.error('Error fetching team members:', error);
                setError('Failed to fetch team members');
            }
        };

        fetchTeamMembers();
    }, []);

    return (
        <>
            <Head>
                <style>{`
                    html, body {
                        overflow: hidden;
                    }
                `}</style>
            </Head>
            <Header> </Header>
            <div className={styles.page}>
                <h1>Our Team</h1>
                <div className={styles.teamCards}>
                    {teamMembers.map((member) => (
                        <div key={member.id} className={styles.teamCard}>
                            <div className={styles.teamMember}>
                                <img 
                                    src={member.imageUrl.startsWith('/uploads/') ? member.imageUrl : '/uploads/default.jpg'} 
                                    alt={member.name} 
                                    onError={(e) => e.target.src = '/uploads/default.jpg'} 
                                />
                                <h3>{member.name}</h3>
                                <p>{member.role}</p>
                                <div className={styles.socialLinks}>
                                    {member.facebookLink && (
                                        <a href={member.facebookLink} className="fa fa-facebook"></a>
                                    )}
                                    {member.twitterLink && (
                                        <a href={member.twitterLink} className="fa fa-twitter"></a>
                                    )}
                                    {member.linkedinLink && (
                                        <a href={member.linkedinLink} className="fa fa-linkedin"></a>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </div>
        </>
    );
};

export default Team;
