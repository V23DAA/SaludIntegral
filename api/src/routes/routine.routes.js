import { Router } from "express";
import * as routineCtrl from "../controllers/routine.controller.js";
import { verifyToken } from "../middleware/token.middleware.js";
import { userFromToken } from "../middleware/getUserFromToken.js";

const router = Router();

router.use(verifyToken, userFromToken);

router.post("/create", routineCtrl.createRoutine);
router.get("/grouped", routineCtrl.getGroupedByDificultad);
router.get("/projected", routineCtrl.getProjectedRutinas);
router.get("/sorted", routineCtrl.getSortedRutinas);
router.get("/filter", routineCtrl.getMatchedByDificultad);
router.get("/limit", routineCtrl.getLimitedRutinas);
router.get("/skip", routineCtrl.getSkippedRutinas);
router.get("/unwind", routineCtrl.getUnwindEjercicios);
router.get("/lookup", routineCtrl.getRutinasWithUserInfo);

export default router;
