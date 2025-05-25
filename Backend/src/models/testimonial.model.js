import mongoose, { Schema } from "mongoose";

const testimonialSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    feedback: {
      type: String,
      required: true,
      trim: true
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      default: null 
    }
  },
  {
    timestamps: true
  }
);

export const Testimonial = mongoose.model("Testimonial", testimonialSchema);
