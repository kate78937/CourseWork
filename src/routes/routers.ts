/** @format */

import { Router } from "express";
import UserController from "../controllers/userController";
import auth from "../middleware/authMiddleware";

const router = Router();

router.post("/registration", UserController.registration);
router.post("/login", UserController.login);
router.put("/userupdate", auth, UserController.update);
router.get("/check", auth, UserController.check);

export default router;
