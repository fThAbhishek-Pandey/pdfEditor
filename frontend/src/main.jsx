import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import EditorProvider from './contexts/EditorContext.jsx'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <EditorProvider>
      <App />
    </EditorProvider>
  </StrictMode>
)

  
