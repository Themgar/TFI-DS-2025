import { getMesasDB, addMesaDB, updateMesaDB, deleteMesaDB } from "../models/mesasModel.js";

export const getMesas = async (req, res) => {
  try {
    const data = await getMesasDB();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error al obtener mesas" });
  }
};

export const addMesa = async (req, res) => {
  try {
    const { number } = req.body;
    await addMesaDB(number);
    res.status(201).json({ message: "Mesa agregada correctamente" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error al agregar mesa" });
  }
};

export const updateMesa = async (req, res) => {
  try {
    const { id } = req.params;
    const { number } = req.body;
    await updateMesaDB(id, number);
    res.json({ message: "Mesa actualizada correctamente" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error al actualizar mesa" });
  }
};

export const deleteMesa = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteMesaDB(id);
    res.json({ message: "Mesa eliminada correctamente" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error al eliminar mesa" });
  }
};