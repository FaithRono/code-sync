// src/components/Editor/editorheader.js

import React from 'react';
import './editor.css';

const EditorHeader = () => {
  return (
    <div className="editor-header">
      <div className="editor-header-left">
        <select className="language-selector">
          <option value="javascript">JavaScript</option>
          <option value="typescript">TypeScript</option>
          <option value="python">Python</option>
          <option value="java">Java</option>
          <option value="csharp">C#</option>
          <option value="cpp">C++</option>
          <option value="html">HTML</option>
          <option value="css">CSS</option>
          <option value="json">JSON</option>
          <option value="xml">XML</option>
          <option value="php">PHP</option>
          <option value="ruby">Ruby</option>
          <option value="go">Go</option>
          <option value="rust">Rust</option>
          <option value="kotlin">Kotlin</option>
          <option value="swift">Swift</option>
          <option value="dart">Dart</option>
          <option value="shell">Shell</option>
          <option value="sql">SQL</option>
          <option value="markdown">Markdown</option>
          <option value="yaml">YAML</option>
          <option value="powershell">PowerShell</option>
          <option value="perl">Perl</option>
          <option value="r">R</option>
          <option value="objective-c">Objective-C</option>
          <option value="scala">Scala</option>
          <option value="vb">VB.NET</option>
        </select>
      </div>
      <div className="editor-header-right">
        <button className="run-button">Run</button>
        <button className="submit-button">Submit</button>
      </div>
    </div>
  );
};

export default EditorHeader;
