import express from "express"
import cors from 'cors'
import enquiryRoutes from "./routes/enquiry.routes.js"
import testimonialRoutes from "./routes/testimonial.routes.js"


const app = express()
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}))

app.use(express.json({
    limit: "16kb",
}))

app.use("/api/enquiries", enquiryRoutes);
app.use("/api/testimonials", testimonialRoutes);



export { app }