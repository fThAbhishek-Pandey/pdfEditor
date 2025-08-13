//  this is not complete


import React from "react";
import PageCanvas from "./Editor/PageCanvas.jsx";

export default function Preview() {
  const handleOpenPreview = async () => {
    // Open the preview window first
    const previewWindow = window.open("", "_blank", "width=900,height=700");

    // Write basic HTML structure into the new window
    previewWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>PDF Preview</title>
          <style>
            body {
              margin: 0;
              padding: 0;
              display: flex;
              justify-content: center;
              align-items: center;
              background-color: #f0f0f0;
              height: 100vh;
            }
            iframe {
              border: none;
              width: 90%;
              height: 90%;
              box-shadow: 0px 0px 20px rgba(0,0,0,0.2);
            }
          </style>
        </head>
        <body>
          <iframe id="pdf-frame"></iframe>
        </body>
      </html>
    `);
    previewWindow.document.close();

    // Dynamically import your PDF generator
    const { generatePDFBlob } = await import("./PDFPreview.jsx");

    // Generate the PDF blob
    const pdfBlob = await generatePDFBlob(); // Ensure this returns a Blob

    // Create a URL for the blob and set it in the iframe
    const blobUrl = URL.createObjectURL(pdfBlob);
    previewWindow.document.getElementById("pdf-frame").src = blobUrl;
  };

  return (
    <div className="editor-root" style={{ padding: "20px" }}>
      <button
        onClick={handleOpenPreview}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          background: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Open PDF Preview
      </button>
    </div>
  );
}
