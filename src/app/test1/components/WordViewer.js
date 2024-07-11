import React, { useState, useEffect, useRef, forwardRef } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';

// Динамический импорт ReactQuill для предотвращения проблем с серверным рендерингом
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const PageBuilder = forwardRef((props, ref) => {
  const [content, setContent] = useState('');
  const editorRef = useRef(null);

  useEffect(() => {
    const editor = editorRef.current;
    if (!editor) return;

    const observer = new MutationObserver((mutationsList) => {
      for (let mutation of mutationsList) {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          console.log('New nodes added:', mutation.addedNodes);
        }
      }
    });

    observer.observe(editor, { childList: true });

    return () => {
      observer.disconnect();
    };
  }, []);

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

  const handleSave = () => {
    console.log(content);
  };

  return (
    <div style={{ maxWidth: '800px', margin: 'auto', padding: '20px' }}>
      <ReactQuill
        theme="snow"
        value={content}
        onChange={handleTextChange}
        modules={modules}
        formats={formats}
        placeholder="Напишите вашу документацию здесь..."
        style={{ width: '100%', height: '300px' }}
        ref={ref} // Передача ref сюда
      />
      <div style={{ marginTop: '20px' }}>
        <button onClick={() => insertMarkdown('**Жирный текст** ')}>Жирный</button>
        <button onClick={() => insertMarkdown('_Курсивный текст_ ')}>Курсив</button>
        <button onClick={() => insertMarkdown('# Заголовок 1\n\n')}>Заголовок 1</button>
        <button onClick={insertTable}>Вставить таблицу Markdown</button>
        <button onClick={insertTableJira}>Вставить таблицу Jira</button>
      </div>
      <button onClick={handleSave} style={{ marginTop: '20px' }}>Сохранить</button>
    </div>
  );
});

export default PageBuilder;
