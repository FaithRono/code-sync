// src/components/Editor/codeeditor.js

import React, { useEffect, useRef } from 'react';
import { useMonaco } from '@monaco-editor/react'; // Assuming you're using Monaco Editor

const CodeEditor = ({ code, onChange }) => {
  const monaco = useMonaco();
  const editorRef = useRef(null);

  useEffect(() => {
    if (monaco) {
      const editor = monaco.editor.create(editorRef.current, {
        value: code,
        language: 'javascript', // Change based on your needs
        theme: 'vs-dark',
      });

      editor.onDidChangeModelContent(() => {
        onChange(editor.getValue());
      });

      return () => editor.dispose();
    }
  }, [monaco, code, onChange]);

  return <div ref={editorRef} style={{ height: '100vh',  width: '110vh' }} />;
};

export default CodeEditor;
