import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// 👉 IMPORTAR EL CONTEXT
import { PedidoProvider } from './context/PedidoContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PedidoProvider>
      <App />
    </PedidoProvider>
  </StrictMode>
)