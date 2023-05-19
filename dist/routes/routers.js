"use strict";
/** @format */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var userController_1 = __importDefault(require("../controllers/userController"));
var preferencesController_1 = __importDefault(require("../controllers/preferencesController"));
var messagesController_1 = __importDefault(require("../controllers/messagesController"));
var authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
var router = (0, express_1.Router)();
router.post("/registration", userController_1.default.registration);
router.post("/login", userController_1.default.login);
router.put("/userupdate", authMiddleware_1.default, userController_1.default.update);
router.get("/check", authMiddleware_1.default, userController_1.default.check);
router.post("/createPreferences", preferencesController_1.default.create);
router.get("/getAllPreferences", preferencesController_1.default.getAll);
router.get("/geOnePreferences", preferencesController_1.default.getOne);
router.delete("/deletePreferences", preferencesController_1.default.delete);
router.post("/createMessages", authMiddleware_1.default, messagesController_1.default.create);
router.get("/getAllMessages", messagesController_1.default.getAll);
router.get("/geOneMessages", messagesController_1.default.getOne);
router.delete("/deleteMessages", messagesController_1.default.delete);
exports.default = router;
