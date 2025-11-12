import { useEffect, useState } from "react";
import ModalAgregarProducto from "../../components/modals/ModalAgregarProducto";
import ModalEditarProducto from "../../components/modals/ModalEditarProducto";
import ModalConfirmacion from "../../components/modals/ModalConfirmacion";
import {
    getProductosRequest,
    addProductoRequest,
    updateProductoRequest,
    deleteProductoRequest
} from "../../api/productosAPI";

export default function Productos() {
    const [productos, setProductos] = useState([]);
    const [agregarOpen, setAgregarOpen] = useState(false);
    const [editarOpen, setEditarOpen] = useState(false);
    const [productoSeleccionado, setProductoSeleccionado] = useState(null);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [confirmAction, setConfirmAction] = useState(null);

    const loadProductos = async () => {
        const res = await getProductosRequest();
        setProductos(res.data);
    };

    useEffect(() => {
        loadProductos();
    }, []);

    const handleAdd = async (nuevo) => {
        // pedir confirmación
        setConfirmAction(() => async () => {
            await addProductoRequest(nuevo);
            setAgregarOpen(false);
            await loadProductos();
        });
        setConfirmOpen(true);
    };

    const handleUpdate = async (id, data) => {
        setConfirmAction(() => async () => {
            await updateProductoRequest(id, data);
            setEditarOpen(false);
            await loadProductos();
        });
        setConfirmOpen(true);
    };

    const handleDelete = async (id) => {
        setConfirmAction(() => async () => {
            await deleteProductoRequest(id);
            setEditarOpen(false);
            await loadProductos();
        });
        setConfirmOpen(true);
    };

    const executeConfirm = async () => {
        if (confirmAction) await confirmAction();
        setConfirmOpen(false);
        setConfirmAction(null);
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold">Productos</h3>
                <button
                    onClick={() => setAgregarOpen(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                >
                    Agregar Producto
                </button>
            </div>

            <div className="grid gap-3">
                {productos.map(p => (
                    <div
                        key={p.id}
                        onClick={() => { setProductoSeleccionado(p); setEditarOpen(true); }}
                        className="cursor-pointer bg-white p-4 rounded-xl shadow flex items-center justify-between hover:shadow-lg transition"
                    >
                        <div>
                            <div className="font-semibold text-lg">{p.name}</div>
                            <div className="text-sm text-gray-500">{p.category}</div>
                        </div>
                        <div className="text-gray-500 font-medium">${p.price}</div>
                    </div>
                ))}
            </div>

            <ModalAgregarProducto
                open={agregarOpen}
                onClose={() => setAgregarOpen(false)}
                onAdd={handleAdd}
            />

            <ModalEditarProducto
                open={editarOpen}
                onClose={() => setEditarOpen(false)}
                producto={productoSeleccionado}
                onUpdate={handleUpdate}
                onDelete={handleDelete}
            />

            <ModalConfirmacion
                open={confirmOpen}
                onClose={() => setConfirmOpen(false)}
                onConfirm={executeConfirm}
                mensaje="¿Desea realizar esta acción?"
            />
        </div>
    );
}