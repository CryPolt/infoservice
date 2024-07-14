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
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ContentView = () => {
  const { id } = useParams();
  const [document, setDocument] = useState(null);

  useEffect(() => {
    const fetchDocument = async () => {
      try {
        const response = await axios.get(`/api/getContent/${id}`);
        setDocument(response.data);
      } catch (error) {
        console.error('Error fetching document:', error);
      }
    };

    fetchDocument();
  }, [id]);

  if (!document) return null;

  return (
    <div>
      <h1>{document.title}</h1>
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
