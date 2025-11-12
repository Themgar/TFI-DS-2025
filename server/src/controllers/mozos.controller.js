import { getMozosDB, addMozoDB, updateMozoDB, deleteMozoDB } from "../models/mozosModel.js";

export const getMozos = async (req, res) => {
  try {
    const data = await getMozosDB();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error al obtener mozos" });
  }
};

export const addMozo = async (req, res) => {
  try {
    const mozo = req.body;
    await addMozoDB(mozo);
    res.status(201).json({ message: "Mozo agregado" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error al agregar mozo" });
  }
};

export const updateMozo = async (req, res) => {
  try {
    const { id } = req.params;

    console.log("ID recibido backend:", id);
    console.log("Body recibido backend:", req.body);

    const mozo = {
      name: req.body.name,
      username: req.body.username,
      password: req.body.password
    };

    await updateMozoDB(id, mozo);

    res.json({ message: "Mozo actualizado correctamente" })
  } catch (error) {
    console.log("ERROR updateMozo:", error.message);
    res.status(500).json({ message: error.message })
  }
};

export const deleteMozo = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteMozoDB(id);
    res.json({ message: "Mozo eliminado" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error al eliminar mozo" });
  }
};