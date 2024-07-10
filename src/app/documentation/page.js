"use client"
import React, { useState, useEffect } from 'react';
import { Header } from '../(components)/header/header';
import styles from './page.module.css';
import Link from 'next/link';


export default function Documentation() {
    const [services, setServices] = useState([]);
    const [selectedService, setSelectedService] = useState(null);
    const [error, setError] = useState(null);
    const [showTools, setShowTools] = useState(false);

    useEffect(() => {
        fetch('/api/service')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                return response.json();
            })
            .then(data => {
                if (data.status === 200) {
                    const activeServices = data.body.data.filter(item => item.isactive === 1);
                    const mappedServices = activeServices.map(item => ({
                        id: item.id,
                        title: item.title,
                        description: item.description
                    }));
                    setServices(mappedServices);
                } else {
                    throw new Error('Failed to fetch data');
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setError('Failed to fetch data. Please try again later.');
            });
    }, []);

    const handleServiceClick = (service) => {
        setSelectedService(service);
        setShowTools(false);
    };

    const handleToolsClick = () => {
        setShowTools(true);
    };

    return (
        <>
            <Header />

            <div className={styles.container}>
                <div className={styles.leftPanel}>
                    <ul className={styles.sidebarList}>
                        <li className={styles.sidebarListItem}>
                            <Link href="#overview" passHref>
                                <span className={styles.sidebarLink}>Overview</span>
                            </Link>
                        </li>
                        <li className={styles.sidebarListItem}>
                            <Link href="/documentation" passHref>
                                <span className={styles.sidebarLink}>Documentation</span>
                            </Link>
                        </li>
                        <li className={styles.sidebarListItem}>
                            <span className={styles.sidebarLink} onClick={handleToolsClick}>
                                Используемые инструменты
                            </span>
                        </li>
                        <li className={styles.sidebarListItem}>
                            <Link href="#examples" passHref>
                                <span className={styles.sidebarLink}>Examples</span>
                            </Link>
                        </li>
                        <li className={styles.sidebarListItem}>
                            <h2>Services</h2>
                            <ul className={styles.serviceList}>
                                {services.map(service => (
                                    <li key={service.id}>
                                        <span className={styles.serviceLink} onClick={() => handleServiceClick(service)}>
                                            {service.title}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </li>
                    </ul>
                </div>
                <div className={styles.mainContent}>
                    {error ? (
                        <div className={styles.error}>
                            <p>{error}</p>
                        </div>
                    ) : selectedService ? (
                        <div className={styles.serviceDetails}>
                            <h1>{selectedService.title}</h1>
                            <p>Description: {selectedService.description}</p>
                            <Link href={`/service/${selectedService.id}`} passHref>
                                <button className={styles.viewDetailsButton}>Посмотреть схему</button>
                            </Link>
                        </div>
                    ) : showTools ? (
                        <div className={styles.toolsContent}>
                            <h1 className={styles.header}>Используемые инструменты</h1>
                            <div className={styles.paragraph}>
                                <p>
                                    Здесь информация о стеке инструментов команды PAY:
                                </p>
                                <ul>
                                    <li>React.js</li>
                                    <li>Next.js</li>
                                    <li>Node.js</li>
                                    <li>MySQL</li>
                                    <li>Swagger</li>
                                </ul>
                            </div>
                        </div>
                    ) : (
                        <div className={styles.defaultContent}>
                            <h1 className={styles.header}>Документация</h1>
                            <div className={styles.paragraph}>
                                <p>
                                    Добро пожаловать в документацию команды PAY — вашего надёжного партнёра в мире платежей и финансовых операций. Мы специализируемся на разработке и интеграции высоконадёжных API и сервисов, обеспечивающих безопасные и эффективные финансовые транзакции. Наша миссия состоит в том, чтобы упрощать и совершенствовать процессы обработки платежей, обеспечивая клиентам максимальную удобство и надёжность.
                                </p>
                                <p>
                                    Команда PAY — это высококвалифицированные специалисты, объединённые общей целью: упрощение финансовых операций и обеспечение безопасных платёжных решений. Мы специализируемся на разработке передовых API и сервисов, которые преобразуют и улучшают платёжные технологии. Наша команда создаёт инновационные решения для компаний любого масштаба, обеспечивая надёжность, эффективность и современный пользовательский опыт.
                                </p>
                                <p>
                                    Ваше доверие — наш приоритет. Мы стремимся к постоянному улучшению и расширению наших услуг, чтобы предоставлять вам самые передовые решения в области финансовых технологий. Документация PAY — это ваш надёжный гид в мире современных платёжных систем и финансовых инноваций.
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}