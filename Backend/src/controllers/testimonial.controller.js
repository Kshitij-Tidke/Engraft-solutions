import { Testimonial } from "../models/testimonial.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const submitTestimonial = async (req, res) => {
  try {
    const { name, feedback, rating } = req.body;

    if (!name?.trim() || !feedback?.trim()) {
      return res.status(400).json(new ApiError(400, "Name and feedback are required."));
    }

    const testimonial = await Testimonial.create({ name, feedback, rating });

    return res
      .status(200)
      .json(new ApiResponse(200, testimonial, "Testimonial submitted successfully"));
  } catch (err) {
    return res
      .status(500)
      .json(new ApiError(500, "Failed to submit testimonial", [], err.stack));
  }
};

export const getAllTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });

    return res
      .status(200)
      .json(new ApiResponse(200, testimonials, "Testimonials fetched successfully"));
  } catch (err) {
    return res
      .status(500)
      .json(new ApiError(500, "Failed to fetch testimonials", [], err.stack));
  }
};
