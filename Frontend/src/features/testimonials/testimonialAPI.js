import axios from "axios";
import { API_BASE_URL } from "../../constants";
export const fetchTestimonials = async () => {
  const res = await axios.get(`${API_BASE_URL}/testimonials`);
  return res.data?.data;
};

export const postTestimonial = async (formData) => {
  const res = await axios.post(`${API_BASE_URL}/testimonials/submit`, formData);
  return res.data?.data;
};
