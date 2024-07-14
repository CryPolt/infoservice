"use client";
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Header } from '../../(components)/header/header'; // Подставьте свой путь к компоненту Header
import { showDocumentation, editDocumentation } from '../../actions/Documentation';

export default function Documentation() {
  const { id } = useParams();
  const [document, setDocument] = useState(null);
  const [error, setError] = useState(null);
  const [editedContent, setEditedContent] = useState('');

  useEffect(() => {
    const fetchDocument = async () => {
      const response = await showDocumentation(id);
      if (response.status === 200) {
        const content = response.body.content || '';
        console.log('Fetched content:', content); // Логируем содержимое для отладки
        setDocument(response.body);
        setEditedContent(content); // Устанавливаем содержимое напрямую, если это простой текст или HTML
        setError(null);
      } else {
        setError(response.body.error || 'Не удалось загрузить документ');
      }
    };

    fetchDocument();
  }, [id]);

  const handleSave = async () => {
    const response = await editDocumentation({ id, title: document.title, content: editedContent });
    if (response.status === 200) {
      setDocument({
        ...document,
        title: response.body.title,
        content: response.body.content,
      });
      setError(null);
    } else {
      setError(response.body.error || 'Не удалось сохранить документ');
    }
  };

  const handleChange = (event) => {
    setEditedContent(event.target.value);
  };

  if (!document) {
    return (
      <>
        <Header />
        <div>Загрузка...</div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div>
        <h1>{document.title}</h1>
        <textarea
          value={editedContent}
          onChange={handleChange}
          style={{ width: '100%', height: '400px' }}
        />
        <br />
        <button onClick={handleSave}>Сохранить</button>
        {error && <div>{error}</div>}
      </div>
    </>
  );
}
