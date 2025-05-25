import { useState } from "react";
import { API_BASE_URL } from "../constants.js";
import axios from "axios";

export default function EnquiryForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValidEmail(formData.email)) {
      setStatus("invalid_email");
      return;
    }

    try {
      await axios.post(`${API_BASE_URL}/enquiries/submit`, formData);
      setStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Enquiry Form</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {["name", "email", "subject", "message"].map((field) => (
          field === "message" ? (
            <textarea
              key={field}
              name={field}
              required
              rows={4}
              value={formData[field]}
              onChange={handleChange}
              placeholder="Message"
              className="w-full p-2 border rounded"
            />
          ) : (
            <input
              key={field}
              type={field === "email" ? "email" : "text"}
              name={field}
              required
              value={formData[field]}
              onChange={handleChange}
              placeholder={field[0].toUpperCase() + field.slice(1)}
              className="w-full p-2 border rounded"
            />
          )
        ))}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>

        {status === "invalid_email" && (
          <p className="text-red-600">Please enter a valid email address.</p>
        )}
        {status === "success" && (
          <p className="text-green-600">Enquiry submitted!</p>
        )}
        {status === "error" && (
          <p className="text-red-600">Submission failed. Try again later.</p>
        )}
      </form>
    </div>
  );
}
