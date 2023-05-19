"use strict";
/** @format */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var models_1 = require("../models/models");
var bcrypt_1 = __importDefault(require("bcrypt"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var generateJwt = function (id, email, role) {
    return jsonwebtoken_1.default.sign({ id: id, email: email, role: role }, process.env.SECRET_KEY, {
        expiresIn: "4h",
    });
};
var UserController = /** @class */ (function () {
    function UserController() {
    }
    UserController.prototype.registration = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, email, password, role, candidate, hashPassword, user, token;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, email = _a.email, password = _a.password, role = _a.role;
                        if (!email || !password) {
                            return [2 /*return*/, res
                                    .status(400)
                                    .json({ message: "Некорректный email или password" })];
                        }
                        return [4 /*yield*/, models_1.User.findOne({ where: { email: email } })];
                    case 1:
                        candidate = _b.sent();
                        if (candidate) {
                            return [2 /*return*/, res
                                    .status(400)
                                    .json({ message: "Пользователь c таким email уже существует" })];
                        }
                        return [4 /*yield*/, bcrypt_1.default.hash(password, 5)];
                    case 2:
                        hashPassword = _b.sent();
                        return [4 /*yield*/, models_1.User.create({ email: email, role: role, password: hashPassword })];
                    case 3:
                        user = _b.sent();
                        return [4 /*yield*/, models_1.Basket.create({ userId: user.dataValues.id })];
                    case 4:
                        _b.sent();
                        token = generateJwt(user.dataValues.id, email, role);
                        return [2 /*return*/, res.status(200).json({ token: token })];
                }
            });
        });
    };
    UserController.prototype.login = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, email, password, user, comparePassword, token;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, email = _a.email, password = _a.password;
                        return [4 /*yield*/, models_1.User.findOne({ where: { email: email } })];
                    case 1:
                        user = _b.sent();
                        if (!user) {
                            res.status(403).json({ message: "Пользователь не найден" });
                        }
                        comparePassword = bcrypt_1.default.compareSync(password, user.dataValues.password);
                        if (!comparePassword) {
                            res.status(403).json({ message: "Указан неверный пароль" });
                        }
                        token = generateJwt(user.dataValues.id, email, user.dataValues.role);
                        return [2 /*return*/, res.json({ token: token })];
                }
            });
        });
    };
    UserController.prototype.update = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, _a, fullname, DateofBirth, mail, interests, updateUser, e_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        id = req.query.id;
                        _a = req.body, fullname = _a.fullname, DateofBirth = _a.DateofBirth, mail = _a.mail, interests = _a.interests;
                        return [4 /*yield*/, models_1.User.update({
                                fullname: fullname,
                                DateofBirth: DateofBirth,
                                mail: mail,
                                interests: interests,
                            }, { where: { id: id } })];
                    case 1:
                        updateUser = _b.sent();
                        res.status(200).json(updateUser);
                        return [3 /*break*/, 3];
                    case 2:
                        e_1 = _b.sent();
                        res.status(400).json(e_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.check = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                res.json({ message: "authorized" });
                return [2 /*return*/];
            });
        });
    };
    return UserController;
}());
exports.default = new UserController();