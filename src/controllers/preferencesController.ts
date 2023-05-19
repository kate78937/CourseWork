/** @format */

import { Request, Response } from "express";
import { Preferences } from "../models/models";

class PreferencesCreate {
  async create(req: Request, res: Response) {
    try {
      const { userId, Agefrom, Ageupto, mail, distance } = req.body;
      const create = await Preferences.create({
        userId,
        Agefrom,
        Ageupto,
        mail,
        distance,
      });
      res.status(200).json(create);
    } catch (e) {
      res.status(400).json(e);
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const all = await Preferences.findAll();
      res.status(200).json(all);
    } catch (e) {
      res.status(400).json(e);
    }
  }

  async getOne(req: Request, res: Response) {
    try {
      const id = req.query.id;
      const one = await Preferences.findOne({ where: { id: id } });
      res.status(200).json(one);
    } catch (e) {
      res.status(400).json(e);
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const id = req.query.id;
      await Preferences.destroy({ where: { id: id } });
      res.status(200).json({ messege: "Модель удалена" });
    } catch (e) {
      res.status(400).json(e);
    }
  }
}

export default new PreferencesCreate();
