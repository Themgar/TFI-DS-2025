import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminLayout from "./layout/AdminLayout";
import Mozos from "./pages/admin/Mozos";
import Productos from "./pages/admin/Productos";
import Mesas from "./pages/admin/Mesas";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AdminLogin />} />
          <Route path="/admin/" element={<AdminLayout />}>
          <Route index element={<div className="p-4">Bienvenido al panel.</div>} />
          <Route path="mozos" element={<Mozos />} />
          <Route path="productos" element={<Productos />} />
          <Route path="mesas" element={<Mesas />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;