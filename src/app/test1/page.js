"use client"
import React, { useState } from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Highlight from '@tiptap/extension-highlight';
import TextAlign from '@tiptap/extension-text-align';
import Table from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import Link from '@tiptap/extension-link';
import Underline from '@tiptap/extension-underline';
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';
import ListItem from '@tiptap/extension-list-item';
import CodeBlock from '@tiptap/extension-code-block';
import 'highlight.js/styles/github.css'; // Import highlight.js style
import hljs from 'highlight.js/lib/core'; // Import only core of highlight.js

// Import desired languages for syntax highlighting
import javascript from 'highlight.js/lib/languages/javascript';
import css from 'highlight.js/lib/languages/css';
import html from 'highlight.js/lib/languages/xml';

import styles from './test1/tiptap.module.css'; // Import your custom styles
import { content } from './content.js'; // Assuming this file contains initial content

// Register languages with highlight.js
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('css', css);
hljs.registerLanguage('html', html);

const MenuBar = ({ editor, saveContent, setTitle }) => {
  if (!editor) {
    return null;
  }

  const addLink = () => {
    const url = prompt('Enter the URL');
    if (url) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  };

  return (
    <div className="control-group">
      <div className="button-group">
        <input
          type="text"
          placeholder="Enter title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <button onClick={saveContent}>Save</button>
        <button onClick={() => editor.chain().focus().toggleBold().run()}>
          Bold
        </button>
        <button onClick={() => editor.chain().focus().toggleItalic().run()}>
          Italic
        </button>
        <button onClick={() => editor.chain().focus().toggleUnderline().run()}>
          Underline
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        >
          H1
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        >
          H2
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        >
          H3
        </button>
        <button onClick={() => editor.chain().focus().toggleBulletList().run()}>
          Bullet List
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          Ordered List
        </button>
        <button onClick={() => editor.chain().focus().toggleBlockquote().run()}>
          Blockquote
        </button>
        <button onClick={addLink}>Add Link</button>
        <button onClick={() => editor.chain().focus().unsetLink().run()}>
          Remove Link
        </button>
        <button
          onClick={() =>
            editor.chain().focus().insertTable({ rows: 3, cols: 3 }).run()
          }
        >
          Insert Table
        </button>
        <button onClick={() => editor.chain().focus().toggleCodeBlock().run()}>
          Code Block
        </button>
      </div>
    </div>
  );
};

const DocumentationEditor = () => {
  const [title, setTitle] = useState('');
  const editor = useEditor({
    extensions: [
      StarterKit,
      Highlight,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableCell,
      TableHeader,
      Link,
      Underline,
      BulletList,
      OrderedList,
      ListItem,
      CodeBlock.configure({
        HTMLAttributes: {
          class: styles.codeBlock, // Apply custom CSS class for styling
        },
      }),
    ],
    content,
    editorProps: {
      attributes: {
        spellcheck: 'false',
      },
    },
  });

  const saveContent = async () => {
    if (!editor || !title) return;

    const htmlContent = editor.getHTML();

    try {
      const response = await fetch('/api/saveContent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content: htmlContent }),
      });

      if (response.ok) {
        alert('Content saved successfully');
      } else {
        alert('Failed to save content');
      }
    } catch (error) {
      console.error('Error saving content:', error);
      alert('Error saving content');
    }
  };

  return (
    <>
      <MenuBar editor={editor} saveContent={saveContent} setTitle={setTitle} />
      <EditorContent editor={editor} className={styles.tiptap} />
    </>
  );
};

export default DocumentationEditor;
