"use client"
import React, { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { Header } from '../../(components)/header/header';
import 'react-quill/dist/quill.snow.css';
import styles from '../page.module.css';
import Link from 'next/link';
import { getDocumentation, createDocumentation, updateDocumentation } from '../../actions/Documentation'; // Импортируем все необходимые функции

// Dynamic import of ReactQuill to avoid server-side rendering issues
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const DocumentationPage = () => {
    const [content, setContent] = useState('');
    const editorRef = useRef(null);
    const [isEditing, setIsEditing] = useState(false);
    const [isNewPage, setIsNewPage] = useState(false);
    const [title, setTitle] = useState('');

    useEffect(() => {
        fetchDocumentation();
    }, []);

    const fetchDocumentation = async () => {
        try {
            // Предположим, что getDocumentation также импортирован правильно
            const response = await getDocumentation();
            if (response.status === 200) {
                setContent(response.body.content);
                setTitle(response.body.title);
            } else {
                console.error('Ошибка при получении документации:', response.body.error);
            }
        } catch (error) {
            console.error('Ошибка при получении документации:', error);
        }
    };

    const modules = {
        toolbar: [
            [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
            [{ size: [] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
            ['link', 'image', 'video'],
            ['clean'],
            [{ 'script': 'sub' }, { 'script': 'super' }],
            [{ 'color': [] }, { 'background': [] }],
            ['code-block'],
        ],
        clipboard: {
            matchVisual: false,
        },
    };

    const formats = [
        'header', 'font', 'size',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image', 'video',
        'script', 'color', 'background',
        'code-block'
    ];

    const handleTextChange = (value) => {
        setContent(value);
    };

    const insertMarkdown = (markdown) => {
        setContent(content + markdown);
    };

    const insertTable = () => {
        const tableMarkdown = '| Заголовок 1 | Заголовок 2 |\n| ------------- | ------------- |\n| Ячейка 1 | Ячейка 2 |\n';
        setContent(content + tableMarkdown);
    };

    const insertTableJira = () => {
        const tableJiraMarkdown = '|| Заголовок 1 | Заголовок 2 ||\n| Ячейка 1 | Ячейка 2 |\n';
        setContent(content + tableJiraMarkdown);
    };

    const handleSave = async () => {
        try {
            const response = await createDocumentation({ title, content });
            if (response.status === 201 && response.body.success) {
                setIsEditing(false);
                setIsNewPage(false);
                fetchDocumentation();
            } else {
                console.error('Ошибка при создании новой страницы документации:', response.body.error);
            }
        } catch (error) {
            console.error('Ошибка при создании новой страницы документации:', error);
        }
    };

    const handleCancel = () => {
        setIsEditing(false);
        setIsNewPage(false);
        fetchDocumentation();
    };

    const handleCreateNewPage = () => {
        setIsNewPage(true);
        setIsEditing(true);
        setContent('');
        setTitle('');
    };

    return (
        <>
            <Header />

            <div className={styles.container}>
                <div className={styles.sidebar}>
                    <ul className={styles.sidebarList}>
                        <li className={styles.sidebarListItem}>
                            <Link href="#overview" passHref>
                                <span className={styles.sidebarLink}>Обзор</span>
                            </Link>
                        </li>
                        <li className={styles.sidebarListItem}>
                            <Link href="/documentation" passHref>
                                <span className={styles.sidebarLink}>Документация</span>
                            </Link>
                        </li>
                        <li className={styles.sidebarListItem}>
                            <span className={styles.sidebarLink} onClick={handleCreateNewPage}>
                                Создать новую страницу
                            </span>
                        </li>
                    </ul>
                </div>
                <div className={styles.content}>
                    {isEditing ? (
                        <div className={styles.editContent}>
                            <input
                                type="text"
                                className={styles.input}
                                placeholder="Введите заголовок"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                            <div style={{ maxWidth: '800px', margin: 'auto', padding: '20px' }}>
                                <ReactQuill
                                    theme="snow"
                                    value={content}
                                    onChange={handleTextChange}
                                    modules={modules}
                                    formats={formats}
                                    placeholder="Напишите вашу документацию здесь..."
                                    style={{ width: '100%', height: '300px' }}
                                />
                                <div style={{ marginTop: '20px' }}>
                                    <button onClick={() => insertMarkdown('**Жирный текст** ')}>Жирный</button>
                                    <button onClick={() => insertMarkdown('_Курсивный текст_ ')}>Курсив</button>
                                    <button onClick={() => insertMarkdown('# Заголовок 1\n\n')}>Заголовок 1</button>
                                    <button onClick={insertTable}>Вставить таблицу Markdown</button>
                                    <button onClick={insertTableJira}>Вставить таблицу Jira</button>
                                </div>
                                <button onClick={handleSave} style={{ marginTop: '20px' }}>Создать</button>
                            </div>
                        </div>
                    ) : (
                        <div className={styles.defaultContent}>
                            <h1 className={styles.header}>Документация</h1>
                            <div className={styles.paragraph}>
                                <p>{content}</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};