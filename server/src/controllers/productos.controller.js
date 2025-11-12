import {
  getProductosDB,
  getProductoByIdDB,
  addProductoDB,
  updateProductoDB,
  deleteProductoDB
} from "../models/productosModel.js";

export const getProductos = async (req, res) => {
  try {
    const data = await getProductosDB();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error al obtener productos" });
  }
};

export const getProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const producto = await getProductoByIdDB(id);
    if (!producto) return res.status(404).json({ message: "Producto no encontrado" });
    res.json(producto);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error al obtener producto" });
  }
};

export const addProducto = async (req, res) => {
  try {
    const producto = req.body;
    await addProductoDB(producto);
    res.status(201).json({ message: "Producto agregado" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error al agregar producto" });
  }
};

export const updateProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const producto = req.body;
    await updateProductoDB(id, producto);
    res.json({ message: "Producto actualizado" });
  } catch (err) {
    console.error("ERROR updateProducto:", err);
    res.status(500).json({ message: "Error al actualizar producto" });
  }
};

export const deleteProducto = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteProductoDB(id);
    res.json({ message: "Producto eliminado" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error al eliminar producto" });
  }
};