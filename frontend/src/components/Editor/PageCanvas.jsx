/**
 *
 *This is a workspace for editing the pdf.
 */
import React, { useContext } from "react";
import { Rnd } from "react-rnd";
import { EditorContext } from "../../contexts/EditorContext.jsx";

const PageCanvas = () => {
  const {
    fields,
    bgImage,
    pageRef,
    imgFields,
    setImgFields,
    setFields,
    dateField,
    setDateField,
    qrCode,
    setQrCode,
  } = useContext(EditorContext);

  // ---------- Generic Update/Remove Helpers ----------
  const updateField = (id, patch, setter) => {
    setter((prev) => prev.map((f) => (f.id === id ? { ...f, ...patch } : f)));
  };

  const removeField = (id, setter) => {
    setter((prev) => prev.filter((f) => f.id !== id));
  };

  // ---------- Styled Field Container ----------
  const fieldContainerStyle = {
    border: "1px dashed #666",
    backgroundColor: "rgba(255,255,255,0)",
    padding: "2px",
    borderRadius: "2px",
    display: "flex",
    alignItems: "center",
    gap: "4px",
    height: "100%",
    position: "relative",
  };

  const deleteBtnStyle = {
    background: "red",
    color: "white",
    border: "none",
    borderRadius: "50%",
    width: "30px",
    height: "30px",
    cursor: "pointer",
    fontSize: "14px",
    lineHeight: "18px",
    position: "absolute",
    top: "-10px",
    right: "-10px",
    boxShadow: "0 0 4px rgba(0,0,0,0.3)",
  };

  return (
    <div className="workspace flex flex-col gap-2">
      <h2 className="text-lg font-semibold">Workspace</h2>
      <div className="page-container flex justify-center p-4 bg-gray-100 rounded-lg shadow-inner">
        <div
          className="page relative shadow-lg border border-gray-300"
          ref={pageRef}
          style={{
            width: 595,
            height: 842,
            backgroundColor: "#fff",
            overflow: "hidden",
          }}
        >
          {bgImage && (
            <img
              src={bgImage}
              alt="background"
              className="absolute top-0 left-0 w-full h-full object-cover"
            />
          )}

          {/* ---------- Text Fields ---------- */}
          {fields.map((field) => (
            <Rnd
              key={field.id}
              size={{ width: field.width, height: field.height }}
              position={{ x: field.x, y: field.y }}
              bounds="parent"
              onDragStop={(e, d) =>
                updateField(field.id, { x: d.x, y: d.y }, setFields)
              }
              onResizeStop={(e, dir, ref, delta, pos) =>
                updateField(
                  field.id,
                  {
                    width: parseInt(ref.style.width, 10),
                    height: parseInt(ref.style.height, 10),
                    x: pos.x,
                    y: pos.y,
                  },
                  setFields
                )
              }
            >
              <div style={fieldContainerStyle}>
                <input
                  type="text"
                  value={field.text}
                  onChange={(e) =>
                    updateField(field.id, { text: e.target.value }, setFields)
                  }
                  className="flex-1 border border-gray-300 rounded px-1 text-sm"
                  style={{ fontSize: field.fontSize }}
                />
                <button
                  style={deleteBtnStyle}
                  onClick={() => removeField(field.id, setFields)}
                >
                  ×
                </button>
              </div>
            </Rnd>
          ))}

          {/* ---------- Image Fields ---------- */}
          {imgFields.map((field) => (
            <Rnd
              key={field.id}
              size={{ width: field.width, height: field.height }}
              position={{ x: field.x, y: field.y }}
              bounds="parent"
              onDragStop={(e, d) =>
                updateField(field.id, { x: d.x, y: d.y }, setImgFields)
              }
              onResizeStop={(e, dir, ref, delta, pos) =>
                updateField(
                  field.id,
                  {
                    width: parseInt(ref.style.width, 10),
                    height: parseInt(ref.style.height, 10),
                    x: pos.x,
                    y: pos.y,
                  },
                  setImgFields
                )
              }
            >
              <div style={fieldContainerStyle}>
                <img
                  src={field.src}
                  alt="Uploaded"
                  className="max-w-full max-h-full object-contain rounded"
                />
                <button
                  style={deleteBtnStyle}
                  onClick={() => removeField(field.id, setImgFields)}
                >
                  ×
                </button>
              </div>
            </Rnd>
          ))}

          {/* ---------- Date Fields ---------- */}
          {dateField.map((field) => (
            <Rnd
              key={field.id}
              size={{ width: field.width, height: field.height }}
              position={{ x: field.x, y: field.y }}
              bounds="parent"
              onDragStop={(e, d) =>
                updateField(field.id, { x: d.x, y: d.y }, setDateField)
              }
              onResizeStop={(e, dir, ref, delta, pos) =>
                updateField(
                  field.id,
                  {
                    width: parseInt(ref.style.width, 10),
                    height: parseInt(ref.style.height, 10),
                    x: pos.x,
                    y: pos.y,
                  },
                  setDateField
                )
              }
            >
              <div style={fieldContainerStyle}>
                <span style={{ fontWeight: "bold" }}>{field.date}</span>
                <button
                  style={deleteBtnStyle}
                  onClick={() => removeField(field.id, setDateField)}
                >
                  ×
                </button>
              </div>
            </Rnd>
          ))}

          {/* ---------- QR Code Fields ---------- */}
          {qrCode && qrCode.map((field) => (
            <Rnd
              key={field.id}
              size={{ width: field.width, height: field.height }}
              position={{ x: field.x, y: field.y }}
              bounds="parent"
              onDragStop={(e, d) =>
                updateField(field.id, { x: d.x, y: d.y }, setQrCode)
              }
              onResizeStop={(e, dir, ref, delta, pos) =>
                updateField(
                  field.id,
                  {
                    width: parseInt(ref.style.width, 10),
                    height: parseInt(ref.style.height, 10),
                    x: pos.x,
                    y: pos.y,
                  },
                  setQrCode
                )
              }
            >
              <div style={fieldContainerStyle}>
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(
                    field.qr
                  )}&size=150x150`}
                  alt="QR Code"
                  className="max-w-full max-h-full object-contain"
                />
                <button
                  style={deleteBtnStyle}
                  onClick={() => removeField(field.id, setQrCode)}
                >
                  ×
                </button>
              </div>
            </Rnd>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PageCanvas;
