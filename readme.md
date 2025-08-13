


# 📄 PDF Editor

A browser-based **PDF Editor** built with **React**, **Vite**, and **PDF.js** that allows users to edit, preview, and store PDF-related data directly in the browser — no backend required.

---

## 🚀 Features
- **Live PDF Preview** – Render PDFs instantly while editing.
- **Drag & Drop Elements** – Position text, images, and QR codes.
- **Toolbar Tools** – Add, edit, and remove content.
- **Local Storage Persistence** – Work is saved automatically in the browser.
- **Fast Development Setup** – Powered by Vite for quick builds.
- **No Server Dependency** – Runs fully in the browser.

---

## 📂 Project Structure
```

frontend/
│
├── vite.config.js               # Vite build & dev server configuration
├── index.html                    # Main HTML entry point
│
├── src/
│   ├── main.jsx                  # React entry point
│   ├── App.jsx                   # Root component & context provider
│   │
│   ├── contexts/
│   │   └── EditorContext.jsx     # Global state management
│   │
│   ├── components/
│   │   ├── Toolbar.jsx           # Editing tools UI
│   │   ├── PDFPreview\.jsx        # PDF preview viewer
│   │   ├── Editor/
│   │   │   ├── Editor.jsx        # Main PDF editor interface
│   │   │   └── PageCanvas.jsx    # Canvas for rendering and editing pages
│   │
│   ├── services/
│   │   ├── pdfService.js         # PDF generation & rendering using PDF.js
│   │   └── storageService.js     # localStorage persistence
│   │
│   ├── assets/                   # Static assets (images, icons, etc.)
│   │
│   └── ...
│
└── ...

````

---

## 🛠 Technologies Used
- **React** – UI library for building the editor.
- **Vite** – Fast build tool and dev server.
- **PDF.js** – PDF rendering engine.
- **localStorage** – Persistent browser storage.
- **react-rnd** – For draggable and resizable elements.

---

## ⚙ Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/fthabhishek-pandey/pdfeditor.git
cd pdfeditor/frontend
````

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Start Development Server

```bash
npm run dev
```

The app will be available at:

```
http://localhost:5173
```

---

## 🖥 How It Works

1. **Vite** serves the `index.html`.
2. `main.jsx` mounts the root `App.jsx` component.
3. **App.jsx** provides global state via `EditorContext`.
4. UI Components like `Toolbar`, `Editor`, `PageCanvas`, and `PDFPreview` interact with the context to:

   * Read current editor state
   * Modify content
   * Trigger PDF rendering
5. **pdfService.js** uses **PDF.js** to render and generate PDFs.
6. **storageService.js** saves the state in `localStorage`.

---

## 📎 Useful Links

* [Vite Config](https://github.com/fthabhishek-pandey/pdfeditor/blob/main/frontend/vite.config.js)
* [App.jsx](https://github.com/fthabhishek-pandey/pdfeditor/blob/main/frontend/src/App.jsx)
* [EditorContext.jsx](https://github.com/fthabhishek-pandey/pdfeditor/blob/main/frontend/src/contexts/EditorContext.jsx)
* [Toolbar.jsx](https://github.com/fthabhishek-pandey/pdfeditor/blob/main/frontend/src/components/Toolbar.jsx)
* [PageCanvas.jsx](https://github.com/fthabhishek-pandey/pdfeditor/blob/main/frontend/src/components/Editor/PageCanvas.jsx)
* [PDFPreview.jsx](https://github.com/fthabhishek-pandey/pdfeditor/blob/main/frontend/src/components/PDFPreview.jsx)
* [pdfService.js](https://github.com/fthabhishek-pandey/pdfeditor/blob/main/frontend/src/services/pdfService.js)
* [storageService.js](https://github.com/fthabhishek-pandey/pdfeditor/blob/main/frontend/src/services/storageService.js)

---

## 📜 License

This project is licensed under the **MIT License** – you’re free to use, modify, and distribute it.

---

## 🤝 Contributing

1. **Fork** the repository
2. **Create a feature branch** (`git checkout -b feature-name`)
3. **Commit your changes** (`git commit -m 'Add new feature'`)
4. **Push to branch** (`git push origin feature-name`)
5. **Open a Pull Request**

---

## 📧 Contact

**Abhishek Pandey** – [GitHub](https://github.com/fthabhishek-pandey)

```

---

```
