import express from "express";
import postModel from "../mongoDB/models.js";
import { v2 as cloudinary } from "cloudinary";
import * as dotenv from "dotenv";
dotenv.config();
const router = express.Router();
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API,
  api_secret: process.env.CLOUDAPI_SECRET,
});
router.get("/", async (req, res) => {
  try {
    const allPosts = await postModel.find({});
    res.status(200).json({ data: allPosts });
  } catch (error) {
    res.status(500).json({ success: false, message: error });
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, prompt, photo } = req.body;
    console.log(name);
    const photoUrl = await cloudinary.uploader.upload(photo, {
      timeout: 120000,
    });
    const newPost = await postModel.create({
      name,
      prompt,
      photo: photoUrl.url,
    });
    res.status(200).json({ success: true, data: newPost });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error });
  }
});
export default router;
