// src/models/comandasModel.js
import { pool } from "../db.js";

// -----------------------------------------------------
// CREAR COMANDA
// -----------------------------------------------------
export async function crearComandaDB({ mesa_id, mozo_id }) {
  const [result] = await pool.query(
    `
      INSERT INTO comandas (mesa_id, mozo_id, fecha, estado)
      VALUES (?, ?, NOW(), 'abierta')
    `,
    [mesa_id, mozo_id]
  );

  return result.insertId;
}

// -----------------------------------------------------
// AGREGAR ITEM A DETALLE
// -----------------------------------------------------
export async function agregarItemDB(idComanda, item) {
  const { producto_id, cantidad, precio_unitario } = item;

  await pool.query(
    `
      INSERT INTO comanda_detalle 
        (comanda_id, producto_id, cantidad, precio_unitario)
      VALUES (?, ?, ?, ?)
    `,
    [idComanda, producto_id, cantidad, precio_unitario]
  );
}

// -----------------------------------------------------
// OBTENER COMANDAS ACTIVAS
// -----------------------------------------------------
export async function obtenerComandasActivasDB() {
  const [rows] = await pool.query(
    `
      SELECT c.*, m.number AS numero_mesa, mz.nombre AS mozo
      FROM comandas c
      JOIN mesas m ON c.mesa_id = m.id
      JOIN mozos mz ON c.mozo_id = mz.id
      WHERE c.estado = 'abierta'
      ORDER BY c.fecha DESC
    `
  );

  return rows;
}

// -----------------------------------------------------
// OBTENER DETALLE DE UNA COMANDA
// -----------------------------------------------------
export async function obtenerItemsDeComandaDB(idComanda) {
  const [rows] = await pool.query(
    `
      SELECT cd.*, p.name AS producto_nombre
      FROM comanda_detalle cd
      JOIN productos p ON cd.producto_id = p.id
      WHERE cd.comanda_id = ?
    `,
    [idComanda]
  );

  return rows;
}

// -----------------------------------------------------
// MARCAR COMANDA COMO CERRADA
// -----------------------------------------------------
export async function cerrarComandaDB(idComanda) {
  await pool.query(
    `
      UPDATE comandas
      SET estado = 'cerrada', fecha = fecha
      WHERE id = ?
    `,
    [idComanda]
  );
}

// -----------------------------------------------------
// OBTENER HISTORIAL DEL DÍA
// -----------------------------------------------------
export async function obtenerHistorialDB() {
  const [rows] = await pool.query(
    `
      SELECT c.*, m.number AS numero_mesa, mz.nombre AS mozo
      FROM comandas c
      JOIN mesas m ON c.mesa_id = m.id
      JOIN mozos mz ON c.mozo_id = mz.id
      WHERE c.estado = 'cerrada'
        AND DATE(c.fecha) = CURDATE()
      ORDER BY c.fecha DESC
    `
  );
  return rows;
}