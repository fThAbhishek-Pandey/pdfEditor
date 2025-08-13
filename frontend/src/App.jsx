/**
 *
 *
 *
 *
 */

import React, { useState } from "react";
import Toolbar from "./components/Toolbar";
import Editor from "./components/Editor/Editor";
import PDFPreview from "./components/PDFPreview";
const App = () => {
  return (
    <div>
      <div>
        <div className="flex  justify-baseline h-screen-30">
          <div className="w-[20%] items-left">
            <Toolbar />
          </div>

          <Editor />
          {/* Right: PDF Preview */}
          <div className="preview-panel w-full lg:w-[40%] flex flex-col bg-gray-50">
            <div className="toolbar flex items-center justify-between px-4 py-2 bg-gray-200 border-b border-gray-300">
              <h2 className="text-lg font-semibold text-gray-700">
                Live Preview
              </h2>
            </div>
            <div className="flex-1 overflow-auto p-4">
              <PDFPreview />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default App;
