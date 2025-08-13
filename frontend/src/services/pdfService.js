/**
 * 
 * Genarating pdf 
 * 
 * 
 */

import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

const PAGE_WIDTH_PT = 595.28; // A4 width in points
const PAGE_HEIGHT_PT = 841.89; // A4 height in points

// Helper to detect & embed PNG/JPG safely
async function embedImageAuto(pdfDoc, src) {
  const imgBytes = await fetch(src).then((r) => r.arrayBuffer());

  // Detect by data URL
  if (src.startsWith("data:image/png") || src.endsWith(".png")) {
    return await pdfDoc.embedPng(imgBytes);
  }
  if (
    src.startsWith("data:image/jpeg") ||
    src.endsWith(".jpg") ||
    src.endsWith(".jpeg")
  ) {
    return await pdfDoc.embedJpg(imgBytes);
  }

  // Detect by first byte
  const firstByte = new Uint8Array(imgBytes)[0];
  if (firstByte === 0x89) {
    // PNG magic number
    return await pdfDoc.embedPng(imgBytes);
  }
  if (firstByte === 0xff) {
    // JPEG magic number
    return await pdfDoc.embedJpg(imgBytes);
  }

  throw new Error(`Unsupported image format: ${src}`);
}

async function ExportPDF(
  bgImage,
  fields,
  imgFields,
  qrCode,
  dateField,
  pageRef,
  flatten = true
) {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([PAGE_WIDTH_PT, PAGE_HEIGHT_PT]);

  const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica);

  // Scaling from editor px → PDF points
  const pageWidth = pageRef?.current?.clientWidth || 595;
  const pageHeight = pageRef?.current?.clientHeight || 842;
  const scaleX = PAGE_WIDTH_PT / pageWidth;
  const scaleY = PAGE_HEIGHT_PT / pageHeight;

  // --- Background ---
  if (bgImage) {
    try {
      const bgImg = await embedImageAuto(pdfDoc, bgImage);
      page.drawImage(bgImg, {
        x: 0,
        y: 0,
        width: PAGE_WIDTH_PT,
        height: PAGE_HEIGHT_PT,
      });
    } catch (err) {
      console.error(`Failed to embed background: ${bgImage}`, err);
    }
  }

  // --- Text Fields ---
  for (const f of fields) {
    if (f.type === "text") {
      const x = f.x * scaleX;
      const y = PAGE_HEIGHT_PT - (f.y + f.height) * scaleY;
      page.drawText(f.text || "", {
        x,
        y,
        size: f.fontSize || 12,
        font: helvetica,
        color: rgb(0, 0, 0),
      });
    }
  }

  // --- Image Fields ---
  for (const imgField of imgFields) {
    try {
      const img = await embedImageAuto(pdfDoc, imgField.src);
      const x = imgField.x * scaleX;
      const y = PAGE_HEIGHT_PT - (imgField.y + imgField.height) * scaleY;
      page.drawImage(img, {
        x,
        y,
        width: imgField.width * scaleX,
        height: imgField.height * scaleY,
      });
    } catch (err) {
      console.error(`Failed to embed image: ${imgField.src}`, err);
    }
  }

  // --- Date Field ---
  for (const df of dateField) {
    if (df && df.date) {
      const x = df.x * scaleX;
      const y = PAGE_HEIGHT_PT - (df.y + df.height) * scaleY;
      page.drawText(df.date, {
        x,
        y,
        size: df.fontSize || 12,
        font: helvetica,
        color: rgb(0, 0, 0),
      });
    }
  }
  // --- QR Code ---
  for (const qr of qrCode) {
    if (qr && qr.qr) {
      try {
        const qrImg = await embedImageAuto(pdfDoc, qr.qr);
        const x = qr.x * scaleX;
        const y = PAGE_HEIGHT_PT - (qr.y + qr.height) * scaleY;
        page.drawImage(qrImg, {
          x,
          y,
          width: qr.width * scaleX,
          height: qr.height * scaleY,
        });
      } catch (err) {
        console.error(`Failed to embed QR code: ${qr.qr}`, err);
      }
    }
  }
  // --- Save & Open ---
  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([pdfBytes], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);

  // Open preview in new tab
  window.open(url, "_blank");

  URL.revokeObjectURL(url);
}

export { ExportPDF };
