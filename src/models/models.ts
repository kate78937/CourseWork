/** @format */

import DataBase from "../database/database";
import DataTypes from "sequelize";

const User = DataBase.define("user", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING },
  role: { type: DataTypes.STRING, defaultValue: "USER" },
  fullname: { type: DataTypes.STRING },
  DateofBirth: { type: DataTypes.STRING },
  mail: { type: DataTypes.STRING },
  interests: { type: DataTypes.STRING },
});

const Basket = DataBase.define("basket", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const Messages = DataBase.define("messages", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  userIdsend: { type: DataTypes.INTEGER },
  messages: { type: DataTypes.STRING },
});

const Preferences = DataBase.define("preferences", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  Agefrom: { type: DataTypes.STRING },
  Ageupto: { type: DataTypes.STRING },
  mail: { type: DataTypes.STRING },
  distance: { type: DataTypes.FLOAT },
});

const News = DataBase.define("news", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING },
  description: { type: DataTypes.STRING },
});

User.hasOne(Basket);
Basket.belongsTo(User);

User.hasMany(Messages);
Messages.belongsTo(User);

User.hasMany(Preferences);
Preferences.belongsTo(User);

export { User, Basket, Messages, Preferences, News };
