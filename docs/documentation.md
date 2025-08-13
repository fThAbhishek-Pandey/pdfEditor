<!-- Documentation -->
---

# 📄 PDF Editor Project Architecture

This document describes the **frontend architecture** of the PDF Editor project and the  flowchart is given bellow. It explains the role of each module, how they interact, and the external dependencies involved.

---

## **1. Overview**

The PDF Editor application is a browser-based tool built with **React** and **Vite**. It enables users to edit, preview, and store PDF-related data in the browser. The architecture consists of:

* **Browser/Client Components** (React UI, State Management, and Services)
* **External Systems** (localStorage, PDF.js)
* **Static Hosting Layer** (Vite Dev Server/CDN)
## Architechure flowchart
[Flowchart](https://github.com/fThAbhishek-Pandey/pdfEditor/blob/main/docs/flowchartpdfEditor.png  "flowchart")
```mermaid
flowchart TD
    %% --------- BROWSER / CLIENT ----------
    subgraph "Browser / Client"
        subgraph "Static Host (Vite Dev Server / CDN)"
            VITE["Vite Config"]:::service
            INDEX["index.html"]:::default
            VITE -->|"serves"| INDEX
        end
        subgraph "React App"
            MAIN["main.jsx"]:::default
            APP["App.jsx"]:::default
            subgraph "State Layer"
                CONTEXT["EditorContext"]:::state
            end
            subgraph "UI Components"
                TOOLBAR["Toolbar"]:::ui
                EDITOR["Editor"]:::ui
                PAGECANVAS["PageCanvas"]:::ui
                PDFPREVIEW["PDFPreview"]:::ui
            end
            subgraph "Services"
                PDFSERVICE["pdfService"]:::service
                STORAGESERVICE["storageService"]:::service
            end
            ASSETS["Static Assets"]:::external
        end
    end

    %% --------- EXTERNAL SYSTEMS ----------
    subgraph "External Systems"
        LOCALSTORAGE["localStorage"]:::external
        PDFJS["PDF.js (Rendering Engine)"]:::external
    end

    %% --------- EDGES ----------
    INDEX -->|"loads"| MAIN
    MAIN -->|"renders"| APP
    APP -->|"provides context"| CONTEXT
    TOOLBAR -->|"dispatch action"| CONTEXT
    EDITOR -->|"read/write state"| CONTEXT
    PAGECANVAS -->|"read/write state"| CONTEXT
    PDFPREVIEW -->|"read state"| CONTEXT
    CONTEXT -->|"render request"| PDFSERVICE
    CONTEXT -->|"persist state"| STORAGESERVICE
    STORAGESERVICE -->|"reads/writes"| LOCALSTORAGE
    PDFSERVICE -->|"uses"| PDFJS
    APP -->|"loads assets"| ASSETS

    %% --------- CLICKABLE LINKS (GitHub supports this) ----------
    click VITE "https://github.com/fthabhishek-pandey/pdfeditor/blob/main/frontend/vite.config.js" _blank
    click INDEX "https://github.com/fthabhishek-pandey/pdfeditor/blob/main/frontend/index.html" _blank
    click MAIN "https://github.com/fthabhishek-pandey/pdfeditor/blob/main/frontend/src/main.jsx" _blank
    click APP "https://github.com/fthabhishek-pandey/pdfeditor/blob/main/frontend/src/App.jsx" _blank
    click CONTEXT "https://github.com/fthabhishek-pandey/pdfeditor/blob/main/frontend/src/contexts/EditorContext.jsx" _blank
    click TOOLBAR "https://github.com/fthabhishek-pandey/pdfeditor/blob/main/frontend/src/components/Toolbar.jsx" _blank
    click EDITOR "https://github.com/fthabhishek-pandey/pdfeditor/blob/main/frontend/src/components/Editor/Editor.jsx" _blank
    click PAGECANVAS "https://github.com/fthabhishek-pandey/pdfeditor/blob/main/frontend/src/components/Editor/PageCanvas.jsx" _blank
    click PDFPREVIEW "https://github.com/fthabhishek-pandey/pdfeditor/blob/main/frontend/src/components/PDFPreview.jsx" _blank
    click PDFSERVICE "https://github.com/fthabhishek-pandey/pdfeditor/blob/main/frontend/src/services/pdfService.js" _blank
    click STORAGESERVICE "https://github.com/fthabhishek-pandey/pdfeditor/blob/main/frontend/src/services/storageService.js" _blank
    click ASSETS "https://github.com/fthabhishek-pandey/pdfeditor/tree/main/frontend/src/assets" _blank

    %% --------- STYLES ----------
    classDef ui fill:#AEDFF7,stroke:#0B6FA4,color:#03396C
    classDef state fill:#C9F0C1,stroke:#2E8B57,color:#006400
    classDef service fill:#FFD8A8,stroke:#FF8C00,color:#A0522D
    classDef external fill:#E0E0E0,stroke:#A9A9A9,color:#696969
    classDef default fill:#FFFFFF,stroke:#CCCCCC,color:#333333
```
---

## **2. Architecture Diagram**
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
│   │   ├── PDFPreview.jsx        # PDF preview viewer
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

```

---

## **3. Modules & Components**

### **Static Host (Vite Dev Server / CDN)**

| Component       | Description                                            | Source                                                                                              |
| --------------- | ------------------------------------------------------ | --------------------------------------------------------------------------------------------------- |
| **Vite Config** | Configures the Vite development and build environment. | [vite.config.js](https://github.com/fthabhishek-pandey/pdfeditor/blob/main/frontend/vite.config.js) |
| **index.html**  | Entry HTML file served by Vite or CDN.                 | [index.html](https://github.com/fthabhishek-pandey/pdfeditor/blob/main/frontend/index.html)         |

---

### **React App**

#### **Main Files**

| Component    | Description                                                        | Source                                                                                      |
| ------------ | ------------------------------------------------------------------ | ------------------------------------------------------------------------------------------- |
| **main.jsx** | Application entry point; renders the `App` component into the DOM. | [main.jsx](https://github.com/fthabhishek-pandey/pdfeditor/blob/main/frontend/src/main.jsx) |
| **App.jsx**  | Root component containing global layout and context provider.      | [App.jsx](https://github.com/fthabhishek-pandey/pdfeditor/blob/main/frontend/src/App.jsx)   |

---

#### **State Layer**

| Component         | Description                                                               | Source                                                                                                                 |
| ----------------- | ------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| **EditorContext** | Provides global state for editor tools, canvas elements, and PDF preview. | [EditorContext.jsx](https://github.com/fthabhishek-pandey/pdfeditor/blob/main/frontend/src/contexts/EditorContext.jsx) |

---

#### **UI Components**

| Component      | Description                                          | Source                                                                                                                    |
| -------------- | ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| **Toolbar**    | User interface for editing tools and actions.        | [Toolbar.jsx](https://github.com/fthabhishek-pandey/pdfeditor/blob/main/frontend/src/components/Toolbar.jsx)              |
| **Editor**     | Main editing interface for manipulating PDF content. | [Editor.jsx](https://github.com/fthabhishek-pandey/pdfeditor/blob/main/frontend/src/components/Editor/Editor.jsx)         |
| **PageCanvas** | Canvas area where PDF pages are rendered and edited. | [PageCanvas.jsx](https://github.com/fthabhishek-pandey/pdfeditor/blob/main/frontend/src/components/Editor/PageCanvas.jsx) |
| **PDFPreview** | Displays a rendered preview of the final PDF.        | [PDFPreview.jsx](https://github.com/fthabhishek-pandey/pdfeditor/blob/main/frontend/src/components/PDFPreview.jsx)        |

---

#### **Services**

| Service            | Description                                              | Source                                                                                                                 |
| ------------------ | -------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| **pdfService**     | Generates and renders PDF pages using PDF.js.            | [pdfService.js](https://github.com/fthabhishek-pandey/pdfeditor/blob/main/frontend/src/services/pdfService.js)         |
| **storageService** | Handles saving and retrieving state from `localStorage`. | [storageService.js](https://github.com/fthabhishek-pandey/pdfeditor/blob/main/frontend/src/services/storageService.js) |

---

#### **Assets**

| Type              | Description                            | Source                                                                                   |
| ----------------- | -------------------------------------- | ---------------------------------------------------------------------------------------- |
| **Static Assets** | Images, icons, and other static files. | [assets/](https://github.com/fthabhishek-pandey/pdfeditor/tree/main/frontend/src/assets) |

---

## **4. External Systems**

| System           | Description                                                          |
| ---------------- | -------------------------------------------------------------------- |
| **localStorage** | Browser storage for persisting editor state.                         |
| **PDF.js**       | JavaScript rendering engine used for displaying and processing PDFs. |

---

## **5. Data Flow**

1. **Vite** serves `index.html`.
2. `index.html` loads **main.jsx**, which renders **App.jsx**.
3. **App** initializes `EditorContext` and provides global state.
4. **UI Components** (Toolbar, Editor, PageCanvas, PDFPreview) interact with the state layer.
5. **pdfService** processes PDF rendering requests.
6. **storageService** persists state to `localStorage`.
7. **PDF.js** handles PDF rendering for previews.

---

---

This Markdown can be placed directly in a `README.md` or `ARCHITECTURE.md` for your repo.

---

If you want, I can also make a **GitHub-friendly version** where the Mermaid diagram **renders directly in README** and all links stay clickable without extra configs. Would you like me to prepare that next?
