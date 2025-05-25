import express from "express";
import {
  submitTestimonial,
  getAllTestimonials
} from "../controllers/testimonial.controller.js";

const router = express.Router();

router.post("/submit", submitTestimonial);

router.get("/", getAllTestimonials);

export default router;
