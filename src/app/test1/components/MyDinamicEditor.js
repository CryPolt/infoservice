// pages/MyEditor.js

"use client";

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { createDocumentation, editDocumentation, showDocumentation } from '../../actions/Documentation';

const DynamicEditor = dynamic(
  () => import('react-draft-wysiwyg').then(mod => mod.Editor),
  { ssr: false }
);

export default function MyEditor({ docId }) {
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (docId) {
      loadDocument(docId);
    }
    setMounted(true);
    return () => {
      setMounted(false);
    };
  }, [docId]);

  const loadDocument = async (id) => {
    const { status, body } = await showDocumentation(id);
    if (status === 200) {
      const contentState = convertFromRaw(JSON.parse(body.content));
      setEditorState(EditorState.createWithContent(contentState));
    }
    // Handle error cases if needed
  };

  const onEditorStateChange = (newEditorState) => {
    if (mounted) {
      setEditorState(newEditorState);
    }
  };

  const saveDocument = async () => {
    const contentState = editorState.getCurrentContent();
    const contentRaw = JSON.stringify(convertToRaw(contentState));
    
    if (docId) {
      // Update existing document
      const { status, body } = await editDocumentation({
        id: docId,
        title: 'Your Title Here', // Replace with your title logic
        content: contentRaw
      });
      if (status === 200) {
        console.log('Document updated successfully');
      } else {
        console.error('Failed to update document');
      }
    } else {
      // Create new document
      const { status, body } = await createDocumentation({
        title: 'Your Title Here', // Replace with your title logic
        content: contentRaw,
        author: 'Your Author Here' // Replace with your author logic
      });
      if (status === 201) {
        console.log('Document created successfully');
        // Optionally redirect or perform any other action after creation
      } else {
        console.error('Failed to create document');
      }
    }
  };

  return (
    <div>
      <DynamicEditor
        editorState={editorState}
        onEditorStateChange={onEditorStateChange}
      />
      <button onClick={saveDocument}>Save</button>
    </div>
  );
}
