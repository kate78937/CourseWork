/** @format */

import { Router } from "express";
import UserController from "../controllers/userController";
import PreferencesCreate from "../controllers/preferencesController";
import MessagesCreate from "../controllers/messagesController";
import NewsCreate from "../controllers/newsController";
import auth from "../middleware/auth";
import role from "../middleware/role";

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

router.post("/createNews", role, NewsCreate.create);
router.get("/getAllNews", NewsCreate.getAll);
router.get("/geOneNews", NewsCreate.getOne);
router.delete("/deleteNews", role, NewsCreate.delete);

export default router;
