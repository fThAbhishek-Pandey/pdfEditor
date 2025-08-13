/*




*/


import React, { useContext } from "react";
import { EditorContext } from "../contexts/EditorContext.jsx";
import { ExportPDF } from "../services/pdfService.js";
import Preview from "./preview.jsx";
const Toolbar = () => {
  const {
    bgImage,
    setBgImage,
    fields,
    setFields,
    imgFields,
    setImgFields,
    thumbnail,
    setThumbnail,
    mydate,
    setMyDate,
    dateField,
    setDateField,
    qrCode,
    setQrCode,
    myqr,
    setMyQr,
    pageRef,
  } = useContext(EditorContext);
  const addImageField = () => {
    if (!bgImage) {
      alert("Please upload a background image first.");
      return;
    }

    setImgFields((prev) => [
      ...prev,
      {
        id: Date.now(),
        src: thumbnail,
        x: 50,
        y: 50,
        width: 150,
        height: 150,
      },
    ]);
  };

  const addTextField = () => {
    if (!bgImage) {
      alert("Please upload a background image first.");
      return;
    }
    setFields((prev) => [
      ...prev,
      {
        id: Date.now(),
        type: "text",
        text: "Edit Me",
        x: 50,
        y: 50,
        width: 200,
        height: 40,
        fontSize: 14,
      },
    ]);
  };

  const addDateField = () => {
    if (!bgImage) {
      alert("Please upload a background image first.");
      return;
    }
    setDateField((prev) => [
      ...prev,
      {
        id: Date.now(),
        type: "date",
        date: mydate || "_",
        x: 50,
        y: 50,
        width: 200,
        height: 40,
      },
    ]);
  };

  const addQRcode = () => {
    if (!bgImage) {
      alert("Please upload a background image first.");
      return;
    }
    if (!myqr) {
      alert("Please enter QR code text first.");
      return;
    }


    setQrCode((prev) => [
      ...prev,
      {
        id: Date.now(),
        type: "qr",
        qr: myqr,
        x: 50,
        y: 50,
        width: 150,
        height: 150,
      },
    ]);
  };

  const handleExportPDF = async () => {
    try {
      await ExportPDF(bgImage, fields, imgFields, qrCode, dateField, pageRef);
    } catch (error) {
      console.error("Error exporting PDF:", error);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setBgImage(reader.result);
    reader.readAsDataURL(file);
  };

  const handleImageFieldUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setThumbnail(reader.result);
    reader.readAsDataURL(file);
  };

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-semibold">Toolbar</h2>
      {/* Export */}
      <button
        className="bg-yellow-500 text-white px-4 py-2 rounded mr-2"
        onClick={handleExportPDF}
      >
        Export PDF
      </button>

      {/* Clear */}
      <button
        className="bg-red-500 text-white px-4 py-2 rounded mr-2"
        onClick={() => setFields([])}
      >
        Clear Fields
      </button>
      {/* Background image upload */}
      <div className="bg-green-400 p-2 rounded hover:bg-green-600">
        <label>
          Add Background (PNG/JPG):
          <input type="file" accept="image/*" onChange={handleImageUpload} />
        </label>
      </div>

      {/* Text field controls */}
      <button
        className="bg-green-500 text-white px-4 py-2 rounded mr-2"
        onClick={addTextField}
      >
        Add Text Field
      </button>

      {/* Image field controls */}
      <div className="bg-green-400 p-2 rounded hover:bg-green-600">
        <label>
          Upload Image Field:
          <input
            type="file"
            accept="image/*"
            onChange={handleImageFieldUpload}
          />
        </label>
        <button
          onClick={addImageField}
          className="ml-2 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Image Field
        </button>
      </div>

      {/* Date field controls */}
      <div className="flex items-center space-x-2">
        <input
          type="date"
          value={mydate || ""}
          onChange={(e) => setMyDate(e.target.value)}
        />
        {mydate ? (
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={addDateField}
          >
            Add Date
          </button>
        ) : (
          <div>Date not select</div>
        )}
      </div>

      {/* QR code controls */}
      <div className="flex items-center space-x-2">
        <input
          type="text"
          value={myqr || ""}
          onChange={(e) => setMyQr(e.target.value)}
          placeholder="Enter QR Code Text"
        />
        {myqr ? (
          <button
            className="bg-purple-500 text-white px-4 py-2 rounded"
            onClick={addQRcode}
          >
            Add QR Code
          </button>
        ) : (
          <div>link not add</div>
        )}
      </div>
    </div>
  );
};

export default Toolbar;
