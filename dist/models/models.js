"use strict";
/** @format */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Likes = exports.Preferences = exports.Messages = exports.Basket = exports.User = void 0;
var database_1 = __importDefault(require("../database/database"));
var sequelize_1 = __importDefault(require("sequelize"));
var User = database_1.default.define("user", {
    id: { type: sequelize_1.default.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: sequelize_1.default.STRING, unique: true },
    password: { type: sequelize_1.default.STRING },
    role: { type: sequelize_1.default.STRING, defaultValue: "USER" },
    fullname: { type: sequelize_1.default.STRING },
    DateofBirth: { type: sequelize_1.default.STRING },
    mail: { type: sequelize_1.default.STRING },
    interests: { type: sequelize_1.default.STRING },
});
exports.User = User;
var Basket = database_1.default.define("basket", {
    id: { type: sequelize_1.default.INTEGER, primaryKey: true, autoIncrement: true },
});
exports.Basket = Basket;
var Messages = database_1.default.define("messages", {
    id: { type: sequelize_1.default.INTEGER, primaryKey: true, autoIncrement: true },
    userIdsend: { type: sequelize_1.default.INTEGER },
    messages: { type: sequelize_1.default.STRING },
});
exports.Messages = Messages;
var Preferences = database_1.default.define("preferences", {
    id: { type: sequelize_1.default.INTEGER, primaryKey: true, autoIncrement: true },
    Agefrom: { type: sequelize_1.default.STRING },
    Ageupto: { type: sequelize_1.default.STRING },
    mail: { type: sequelize_1.default.STRING },
    distance: { type: sequelize_1.default.FLOAT },
});
exports.Preferences = Preferences;
var Likes = database_1.default.define("likes", {
    id: { type: sequelize_1.default.INTEGER, primaryKey: true, autoIncrement: true },
});
exports.Likes = Likes;
User.hasOne(Basket);
Basket.belongsTo(User);
User.hasMany(Messages);
Messages.belongsTo(User);
User.hasMany(Preferences);
Preferences.belongsTo(User);
User.hasMany(Likes);
Likes.belongsTo(User);
