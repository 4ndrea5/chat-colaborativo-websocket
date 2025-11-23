import express from "express";
import { Chat } from "../models/Chat.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const chats = await Chat.findAll();
  res.json(chats);
});

router.post("/", async (req, res) => {
  const { name } = req.body;
  const chat = await Chat.create({ name });
  res.json(chat);
});

export default router;
