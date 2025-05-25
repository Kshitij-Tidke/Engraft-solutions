import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import EnquiryForm from "./pages/EnquiryForm";
import Testimonials from "./pages/Testimonials";
import SubmitTestimonial from "./pages/SubmitTestimonial";

export default function App() {
  return (
    <BrowserRouter>
      <nav className="bg-gray-100 p-4 flex gap-4">
        <Link to="/" className="text-blue-600 font-semibold">Enquiry</Link>
        <Link to="/testimonials" className="text-blue-600 font-semibold">Testimonials</Link>
        <Link to="/submit-testimonial" className="text-blue-600 font-semibold">Submit Feedback</Link>
      </nav>
      <Routes>
        <Route path="/" element={<EnquiryForm />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/submit-testimonial" element={<SubmitTestimonial />} />
      </Routes>
    </BrowserRouter>
  );
}
