import {
  crearComandaDB,
  agregarItemDB,
  obtenerComandasActivasDB,
  obtenerItemsDeComandaDB,
  cerrarComandaDB,
  obtenerHistorialDB
} from "../models/comandasModel.js";

// -------------------------------------------------------------
// CREAR COMANDA
// -------------------------------------------------------------
export async function crearComanda(req, res) {
  try {
    const { mesa_id, mozo_id, items } = req.body;

    if (!mesa_id || !mozo_id) {
      return res.status(400).json({ error: "Mesa y mozo son obligatorios" });
    }

    const idComanda = await crearComandaDB({ mesa_id, mozo_id });

    for (const item of items) {
      await agregarItemDB(idComanda, item);
    }

    res.json({ ok: true, idComanda });

  } catch (err) {
    console.error("❌ Error creando comanda:", err);
    res.status(500).json({ error: "Error al crear la comanda" });
  }
}

// -------------------------------------------------------------
// LISTAR COMANDAS ACTIVAS
// -------------------------------------------------------------
export async function listarComandasActivas(req, res) {
  try {
    const datos = await obtenerComandasActivasDB();

    // Agregar items a cada comanda
    for (let comanda of datos) {
      const items = await obtenerItemsDeComandaDB(comanda.id);
      comanda.items = items;
    }

    res.json(datos);

  } catch (err) {
    console.error("❌ Error obteniendo comandas activas:", err);
    res.status(500).json({ error: "Error al obtener comandas activas" });
  }
}

// -------------------------------------------------------------
// CERRAR COMANDA
// -------------------------------------------------------------
export async function cerrarComanda(req, res) {
  try {
    const { id } = req.params;

    await cerrarComandaDB(id);

    res.json({ ok: true });

  } catch (err) {
    console.error("❌ Error cerrando comanda:", err);
    res.status(500).json({ error: "Error al cerrar comanda" });
  }
}

// -------------------------------------------------------------
// HISTORIAL (SOLO DEL DÍA)
// -------------------------------------------------------------
export async function historialDelDia(req, res) {
  try {
    const datos = await obtenerHistorialDB();

    // Agregar items detallados
    for (let comanda of datos) {
      const items = await obtenerItemsDeComandaDB(comanda.id);
      comanda.items = items;
    }

    res.json(datos);

  } catch (err) {
    console.error("❌ Error consultando historial:", err);
    res.status(500).json({ error: "Error obteniendo historial" });
  }
}
