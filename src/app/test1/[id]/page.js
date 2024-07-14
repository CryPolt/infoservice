"use client"
import React, { useEffect, useState } from 'react';
import { EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Highlight from '@tiptap/extension-highlight';
import TableCell from '@tiptap/extension-table-cell';
import TextAlign from '@tiptap/extension-text-align';
import Table from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableHeader from '@tiptap/extension-table-header';
import Link from '@tiptap/extension-link';
import Underline from '@tiptap/extension-underline';
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';
import ListItem from '@tiptap/extension-list-item';
import { useParams } from 'next/navigation';

const ContentView = () => {
  const { id } = useParams();
  const [document, setDocument] = useState(null);

  useEffect(() => {
    const fetchDocument = async () => {
      try {
        const response = await fetch(`/api/gettest/${id}`);
        if (response.ok) {
          const data = await response.json();
          console.log('Fetched document:', data);
          setDocument(data.body); // Используем data.body, так как данные возвращаются как { status: 200, body: { title, content } }
        } else {
          console.error('Error fetching document:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching document:', error);
      }
    };
    fetchDocument();
  }, [id]);
  
  console.log('Current document state:', document);

  if (!document) return <div>Loading...</div>;

  return (
    <div>
      <h1>{document.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: document.content }} /> {/* Отображаем HTML контент */}
      <EditorContent
        editor={null} // Passing null to editor disables editing
        content={document.content}
        extensions={[
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
        ]}
      />
    </div>
  );
};

export default ContentView;
