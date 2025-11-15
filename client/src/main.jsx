import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { PedidoProvider } from './context/PedidoContext.jsx'
import { ComandasProvider } from './context/ComandasContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PedidoProvider>
      <ComandasProvider>
        <App />
      </ComandasProvider>
    </PedidoProvider>
  </StrictMode>,
)