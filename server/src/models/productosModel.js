import { db } from "../config/db.js";

export const getProductosDB = async () => {
  const [rows] = await db.execute("SELECT * FROM productos");
  return rows;
};

export const getProductoByIdDB = async (id) => {
  const [rows] = await db.execute("SELECT * FROM productos WHERE id = ?", [id]);
  return rows[0];
};

export const addProductoDB = async (producto) => {
  await db.execute(
    "INSERT INTO productos (name, price, category) VALUES (?, ?, ?)",
    [producto.name, producto.price, producto.category]
  );
};

export const updateProductoDB = async (id, producto) => {
  await db.execute(
    "UPDATE productos SET name = ?, price = ?, category = ? WHERE id = ?",
    [producto.name, producto.price, producto.category, id]
  );
};

export const deleteProductoDB = async (id) => {
  await db.execute("DELETE FROM productos WHERE id = ?", [id]);
};