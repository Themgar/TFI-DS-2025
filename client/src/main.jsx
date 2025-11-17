import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { PedidoProvider } from './context/PedidoContext.jsx'
import { ComandasProvider } from './context/ComandasContext.jsx'
import { HistorialProvider } from './context/HistorialContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PedidoProvider>
      <ComandasProvider>
        <HistorialProvider>
          <App />
        </HistorialProvider>
      </ComandasProvider>
    </PedidoProvider>
  </StrictMode>,
)