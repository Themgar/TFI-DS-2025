import { BrowserRouter, Routes, Route } from "react-router-dom";

// --- LOGIN ---
import AdminLogin from "./pages/admin/AdminLogin";

// --- ADMIN ---
import AdminSection from "./pages/admin/AdminSection";
import AdminLayout from "./layout/AdminLayout";
import Mozos from "./pages/admin/Mozos";
import Productos from "./pages/admin/Productos";
import Mesas from "./pages/admin/Mesas";

// --- MOZO ---
import MozoHome from "./pages/mozo/MozoHome";
import MozoLayout from "./layout/MozoLayout";
import AgregarPedido from "./pages/mozo/AgregarPedido";
import SeleccionarProducto from "./pages/mozo/SeleccionarProducto";
import ComandasActivas from "./pages/mozo/ComandasActivas";   // 👈 NUEVO

// --- SISTEMA DE AUTENTICACIÓN ---
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>

          {/* =============== LOGIN =============== */}
          <Route path="/" element={<AdminLogin />} />

          {/* =============== ADMIN (SIN SIDEBAR) =============== */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminSection />
              </ProtectedRoute>
            }
          />

          {/* =============== ADMIN (CON SIDEBAR) =============== */}
          <Route
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/admin/mozos" element={<Mozos />} />
            <Route path="/admin/productos" element={<Productos />} />
            <Route path="/admin/mesas" element={<Mesas />} />
          </Route>

          {/* =============== MOZO (SIN SIDEBAR) =============== */}
          <Route
            path="/mozo/home"
            element={
              <ProtectedRoute allowedRoles={["mozo"]}>
                <MozoHome />
              </ProtectedRoute>
            }
          />

          {/* =============== MOZO (CON SIDEBAR) =============== */}
          <Route
            element={
              <ProtectedRoute allowedRoles={["mozo"]}>
                <MozoLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/mozo/agregar-pedido" element={<AgregarPedido />} />
            <Route path="/mozo/seleccionar-producto" element={<SeleccionarProducto />} />

            {/* Ruta nueva para comandas activas */}
            <Route path="/mozo/pedidos-abiertos" element={<ComandasActivas />} />
          </Route>

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;