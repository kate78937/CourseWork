/** @format */

import { Request, Response } from "express";
import { Messages } from "../models/models";
import jwt from "jsonwebtoken";

class MessagesCreate {
  async create(req: Request, res: Response) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      const id = decoded["id"];
      const { userId, messages } = req.body;
      const create = await Messages.create({
        userIdsend: id,
        userId,
        messages,
      });
      res.status(200).json(create);
    } catch (e) {
      res.status(400).json(e);
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const all = await Messages.findAll();
      res.status(200).json(all);
    } catch (e) {
      res.status(400).json(e);
    }
  }

  async getOne(req: Request, res: Response) {
    try {
      const id = req.query.id;
      const one = await Messages.findAll({ where: { userId: id } });
      res.status(200).json(one);
    } catch (e) {
      res.status(400).json(e);
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const id = req.query.id;
      await Messages.destroy({ where: { id: id } });
      res.status(200).json({ messege: "Модель удалена" });
    } catch (e) {
      res.status(400).json(e);
    }
  }
}

export default new MessagesCreate();
