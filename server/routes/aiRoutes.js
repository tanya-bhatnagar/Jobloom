import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);


router.post("/ask", async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is missing" });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" }); // ✅ ye model use karo

    const result = await model.generateContent(prompt);
    const text = await result.response.text();


    res.json({ reply: text });
  } catch (error) {
    console.error("Gemini API Error:", error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
