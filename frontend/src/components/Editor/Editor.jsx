// src/components/Editor.jsx
import React from "react";
import PDFPreview from "../PDFPreview.jsx";
import PageCanvas from "./PageCanvas.jsx";

export default function Editor() {
  return (
    <div className="editor-root flex flex-col lg:flex-row h-full bg-gray-100">
      {/* Left: Canvas Editor */}
      <div className="editor-panel flex-1 flex flex-col border-r border-gray-300 bg-white shadow-md">
        {/* Toolbar */}
        <div className="toolbar flex items-center justify-between px-4 py-2 bg-gray-200 border-b border-gray-300">
          <h2 className="text-lg font-semibold text-gray-700">Page Editor</h2>
         
        </div>

        {/* Editable Canvas Area */}
        <div className="flex-1 overflow-auto p-4">
          <PageCanvas />
        </div>
      </div>

      
    </div>
  );
}
