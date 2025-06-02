import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router";
import { submitTestimonial } from "../features/testimonials/testimonialSlice";

export default function SubmitTestimonial() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { submissionStatus } = useSelector((state) => state.testimonials);
  const [formData, setFormData] = useState({
    name: "",
    feedback: "",
    rating: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await dispatch(submitTestimonial(formData)).unwrap(); 
      setFormData({ name: "", feedback: "", rating: "" });
      navigate("/testimonials");
    } catch (err) {
      console.error("Submission failed", err);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Submit a Testimonial</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          required
          type="text"
          name="name"
          placeholder="Your Name"
          className="w-full p-2 border rounded"
          value={formData.name.trim()}
          onChange={handleChange}
        />
        <textarea
          required
          name="feedback"
          placeholder="Your Feedback"
          className="w-full p-2 border rounded"
          rows="4"
          value={formData.feedback.trim()}
          onChange={handleChange}
        />
        <input
          required
          type="number"
          name="rating"
          placeholder="Rating (1-5)"
          className="w-full p-2 border rounded"
          value={formData.rating.trim()}
          onChange={handleChange}
          min={1}
          max={5}
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
        {submissionStatus === "failed" && (
          <p className="text-red-600">Submission failed. Try again.</p>
        )}
      </form>
    </div>
  );
}
