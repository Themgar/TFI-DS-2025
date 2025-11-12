import { Router } from "express";
import { getMozos, addMozo, updateMozo, deleteMozo } from "../controllers/mozos.controller.js";

const router = Router();

router.get("/", getMozos);
router.post("/", addMozo);
router.put("/:id", updateMozo);
router.delete("/:id", deleteMozo);

export default router;