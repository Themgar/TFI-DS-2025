import { db } from "../config/db.js";

export const getMesasDB = async () => {
  const [rows] = await db.execute("SELECT * FROM mesas ORDER BY number ASC");
  return rows;
};

export const addMesaDB = async (number) => {
  await db.execute("INSERT INTO mesas (number) VALUES (?)", [number]);
};

export const updateMesaDB = async (id, number) => {
  await db.execute("UPDATE mesas SET number = ? WHERE id = ?", [number, id]);
};

export const deleteMesaDB = async (id) => {
  await db.execute("DELETE FROM mesas WHERE id = ?", [id]);
};