import express from "express";
import { Configuration, OpenAIApi } from "openai";
const router = express.Router();
const configuration = new Configuration({
  apiKey: "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",
});
const openAi = new OpenAIApi(configuration);
router.get("/", (req, res) => {
  res.send("hey fro ai");
});
router.post("/", async (req, res) => {
  try {
    const { prompt } = req.body;
    const response = await openAi.createImage({
      prompt: prompt,
      n: 1,
      size: "1024x1024",
      response_format: "b64_json",
    });
    const image = response.data.data[0].b64_json;
    res.status(200).json({ photo: image });
  } catch (err) {
    console.log(err);
    res.status(500).send(err?.response.error.data);
  }
});

export default router;
