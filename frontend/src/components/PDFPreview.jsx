/**
 * This is a place where you can visuaalise previw of pdf
 * 
 * 
 */

import React, { useContext, useEffect, useState } from "react";
import { EditorContext } from "../contexts/EditorContext";
import { ExportPDF } from "../services/pdfService.js";

const PDFPreview = () => {
  const {
    bgImage,
    fields,
    imgFields,
    setFields,
    setImgFields,
    setQrCode,
    qrCode,
    dateField,
    pageRef,
    setDateField
  } = useContext(EditorContext);
  const [previewqr, setPreviewqr] = useState();
const handleqr = async(qrdata)=>{
  if(!qrdata) return;
  try {
    const response = await fetch(`https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(qrdata)}&size=150x150`);
    const blob = await response.blob();
    setPreviewqr(URL.createObjectURL(blob));
    return previewqr;
  } catch (error) {
    console.error("Error generating QR code:", error);
  }
}
useEffect(()=>{
     console.log()
     handleqr();
},[qrCode])
  const handleDownload = async () => {
    if (!bgImage) {
      alert("Please add a background image first.");
      return;
    }
    try {
      await ExportPDF(bgImage, fields, imgFields, qrCode, dateField, pageRef);
    } catch (error) {
      console.error("PDF export failed:", error);
    }
  };

  const handleClear = () => {
    setFields([]);
    setImgFields([]);
    setQrCode([]);
    setDateField([]);
  };

  return (
    <div className="preview flex flex-col h-full bg-white shadow-md rounded-lg overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center px-4 py-2 bg-gray-200 border-b border-gray-300">
        <h3 className="text-lg font-semibold text-gray-700">
          Live WYSIWYG Preview
        </h3>
      </div>

      {/* Preview Area */}
      <div className="flex-1 overflow-auto flex justify-center items-center bg-gray-50 p-4">
        <div
          className="relative border border-gray-300 bg-white shadow"
          style={{
            width: 595 / 2, // scaled A4 width
            height: 842 / 2, // scaled A4 height
          }}
        >
          {bgImage && (
            <img
              src={bgImage}
              alt="Preview background"
              className="absolute top-0 left-0 w-full h-full object-cover"
            />
          )}

          {/* Text Fields */}
          {fields.map((f) => (
            <div
              key={f.id}
              className="absolute"
              style={{
                left: f.x / 2,
                top: f.y / 2,
                width: f.width / 2,
                fontSize: f.fontSize / 2,
              }}
            >
              {f.type === "text" && (
                <span style={{ whiteSpace: "pre-wrap" }}>{f.text}</span>
              )}
              {f.type === "date" && <span>{f.date}</span>}
              {f.type === "qr" && (
                <img
                  src={()=>handleqr(f.qr)}
                  
                  alt="QR Code"
                  style={{ width: f.width / 2, height: f.height / 2 }}
                />
              )}
            </div>
          ))}

          {/* Image Fields */}
          {imgFields.map((f) => (
            <div
              key={f.id}
              className="absolute"
              style={{
                left: f.x / 2,
                top: f.y / 2,
              }}
            >
              <img
                src={f.src}
                alt="Field"
                style={{
                  width: f.width / 2,
                  height: f.height / 2,
                  objectFit: "contain",
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Footer Buttons */}
      <div className="flex justify-end gap-2 p-3 bg-gray-100 border-t border-gray-300">
        <button
          onClick={handleDownload}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition"
        >
          Download PDF
        </button>
        <button
          onClick={handleClear}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition"
        >
          Clear Preview
        </button>
      </div>
    </div>
  );
};

export default PDFPreview;
