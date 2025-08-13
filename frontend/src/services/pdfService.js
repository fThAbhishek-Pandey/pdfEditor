import { PDFDocument, rgb, StandardFonts } from 'pdf-lib'

const PAGE_WIDTH_PT = 595.28 // A4 width in points
const PAGE_HEIGHT_PT = 841.89 // A4 height in points

// Helper to detect & embed PNG/JPG safely
async function embedImageAuto(pdfDoc, src) {
  const imgBytes = await fetch(src).then(r => r.arrayBuffer())

  // Detect by data URL
  if (src.startsWith('data:image/png') || src.endsWith('.png')) {
    return await pdfDoc.embedPng(imgBytes)
  }
  if (src.startsWith('data:image/jpeg') || src.endsWith('.jpg') || src.endsWith('.jpeg')) {
    return await pdfDoc.embedJpg(imgBytes)
  }

  // Detect by first byte
  const firstByte = new Uint8Array(imgBytes)[0]
  if (firstByte === 0x89) { // PNG magic number
    return await pdfDoc.embedPng(imgBytes)
  }
  if (firstByte === 0xFF) { // JPEG magic number
    return await pdfDoc.embedJpg(imgBytes)
  }

  throw new Error(`Unsupported image format: ${src}`)
}

async function ExportPDF(bgImage, fields, imgFields, dateField, qrCode, pageRef, flatten = true) {
  const pdfDoc = await PDFDocument.create()
  const page = pdfDoc.addPage([PAGE_WIDTH_PT, PAGE_HEIGHT_PT])

  const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica)

  // Scaling from editor px → PDF points
 // Scaling from editor px → PDF points (safe check)
const pageWidth = pageRef?.current?.clientWidth || 595
const pageHeight = pageRef?.current?.clientHeight || 842
const scaleX = PAGE_WIDTH_PT / pageWidth
const scaleY = PAGE_HEIGHT_PT / pageHeight


  // --- Background ---
  if (bgImage) {
    try {
      const bgImg = await embedImageAuto(pdfDoc, bgImage)
      page.drawImage(bgImg, {
        x: 0,
        y: 0,
        width: PAGE_WIDTH_PT,
        height: PAGE_HEIGHT_PT
      })
    } catch (err) {
      console.error(`Failed to embed background: ${bgImage}`, err)
    }
  }

  // --- Text Fields ---
  for (const f of fields) {
    if (f.type === 'text') {
      const x = f.x * scaleX
      const y = PAGE_HEIGHT_PT - (f.y + f.height) * scaleY
      page.drawText(f.text || '', {
        x,
        y,
        size: f.fontSize || 12,
        font: helvetica,
        color: rgb(0, 0, 0)
      })
    }
  }

  // --- Image Fields ---
  for (const imgField of imgFields) {
    try {
      const img = await embedImageAuto(pdfDoc, imgField.src)
      const x = imgField.x * scaleX
      const y = PAGE_HEIGHT_PT - (imgField.y + imgField.height) * scaleY
      page.drawImage(img, {
        x,
        y,
        width: imgField.width * scaleX,
        height: imgField.height * scaleY
      })
    } catch (err) {
      console.error(`Failed to embed image: ${imgField.src}`, err)
    }
  }

  // --- Date Field ---
  if (dateField && dateField.date) {
    const x = dateField.x * scaleX
    const y = PAGE_HEIGHT_PT - (dateField.y + dateField.height) * scaleY
    page.drawText(dateField.date, {
      x,
      y,
      size: dateField.fontSize || 12,
      font: helvetica,
      color: rgb(0, 0, 0)
    })
  }

  // --- QR Code ---
  if (qrCode && qrCode.qr) {
    try {
      const qrImg = await embedImageAuto(pdfDoc, qrCode.qr)
      const x = qrCode.x * scaleX
      const y = PAGE_HEIGHT_PT - (qrCode.y + qrCode.height) * scaleY
      page.drawImage(qrImg, {
        x,
        y,
        width: qrCode.width * scaleX,
        height: qrCode.height * scaleY
      })
    } catch (err) {
      console.error(`Failed to embed QR code: ${qrCode.qr}`, err)
    }
  }

  // --- Save & Open ---
  const pdfBytes = await pdfDoc.save()
  const blob = new Blob([pdfBytes], { type: 'application/pdf' })
  const url = URL.createObjectURL(blob)

  // Open preview in new tab
  window.open(url, '_blank')

  URL.revokeObjectURL(url)
}

export { ExportPDF }
