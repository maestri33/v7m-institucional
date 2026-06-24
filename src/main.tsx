import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

const container = document.getElementById('root')
if (!container) {
  throw new Error('Root container not found')
}

const rootElement = (
  <StrictMode>
    <App />
  </StrictMode>
)

if (container.children.length > 0) {
  hydrateRoot(container, rootElement)
} else {
  createRoot(container).render(rootElement)
}
