import { Enquiry } from "../models/enquiry.model.js";
import nodemailer from "nodemailer";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import validator from "validator";

export const submitEnquiry = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if ([name, email, subject, message].some((field) => !field?.trim())) {
      return res.status(400).json(new ApiError(400, "All fields are required"));
    }
    
    if (validator.isEmail(email)) {
      return res.status(400).json(new ApiError(400, "Invalid email"));
    }
    
    const enquiry = await Enquiry.create({ name, email, subject, message });

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.MAIL_USER, // safer than user-provided email
      to: process.env.MAIL_RECEIVER,
      subject: `New Enquiry: ${subject}`,
      html: `
        <h3>New Enquiry</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
      replyTo: email, // allow replying to user’s email
    };

    await transporter.sendMail(mailOptions);

    return res
      .status(200)
      .json(new ApiResponse(200, enquiry, "Enquiry submitted successfully"));
  } catch (err) {
    return res
      .status(500)
      .json(new ApiError(500, "Failed to submit enquiry", [], err.stack));
  }
};
