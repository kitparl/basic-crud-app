import { Router } from "express";
import {
  createPerson,
  deletePerson,
  getPersons,
  updatePerson,
} from "../controllers/personController.js";
const router = Router();

router.get("/person", getPersons);
router.post("/person", createPerson);
router.put("/person/:id", updatePerson);
router.delete("/person/:id", deletePerson);

export default router;