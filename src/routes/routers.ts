/** @format */

import { Router } from "express";
import UserController from "../controllers/userController";
import PreferencesCreate from "../controllers/preferencesController";
import MessagesCreate from "../controllers/messagesController";
import auth from "../middleware/authMiddleware";

const router = Router();

router.post("/registration", UserController.registration);
router.post("/login", UserController.login);
router.put("/userupdate", auth, UserController.update);
router.get("/check", auth, UserController.check);

router.post("/createPreferences", PreferencesCreate.create);
router.get("/getAllPreferences", PreferencesCreate.getAll);
router.get("/geOnePreferences", PreferencesCreate.getOne);
router.delete("/deletePreferences", PreferencesCreate.delete);

router.post("/createMessages", auth, MessagesCreate.create);
router.get("/getAllMessages", MessagesCreate.getAll);
router.get("/geOneMessages", MessagesCreate.getOne);
router.delete("/deleteMessages", MessagesCreate.delete);

export default router;
