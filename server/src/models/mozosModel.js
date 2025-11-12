import { db } from "../config/db.js";

export const getMozosDB = async () => {
  const [rows] = await db.execute("SELECT * FROM mozos");
  return rows;
};

export const addMozoDB = async (mozo) => {
  await db.execute("INSERT INTO mozos (name, username, password) VALUES (?, ?, ?)",
    [mozo.name, mozo.username, mozo.password]);
};

export const updateMozoDB = async (id, mozo) => {
  await db.execute(
    "UPDATE mozos SET name = ?, username = ?, password = ? WHERE id = ?",
    [mozo.name, mozo.username, mozo.password, id]
  );
};

export const deleteMozoDB = async (id) => {
  await db.execute("DELETE FROM mozos WHERE id=?", [id]);
};