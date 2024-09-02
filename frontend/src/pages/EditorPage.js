import React from 'react';
import CodeEditor from '../components/Editor/CodeEditor';
import Whiteboard from '../components/Editor/Whiteboard';
import EditorHeader from '../components/Editor/EditorHeader';

const EditorPage = () => {
  const handleCodeChange = (newCode) => {
    // Handle code changes here
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <EditorHeader />
      <div style={{ display: 'flex', flex: 1 }}>
        <div style={{ flex: 1 }}>
          <CodeEditor code="const hello = 'world';" onChange={handleCodeChange} />
        </div>
        <div style={{ flex: 1 }}>
          <Whiteboard />
        </div>
      </div>
    </div>
  );
};

export default EditorPage;
