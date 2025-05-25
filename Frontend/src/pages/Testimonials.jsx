import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTestimonials } from "../features/testimonials/testimonialSlice";

export default function Testimonials() {
  const dispatch = useDispatch();
  const { data: testimonials, status } = useSelector((state) => state.testimonials);

  useEffect(() => {
    dispatch(getTestimonials());
  }, [dispatch]);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Testimonials</h2>
      {status === "loading" && <p>Loading...</p>}
      {status === "succeeded" && testimonials.length > 0 ? (
        <div className="grid md:grid-cols-2 gap-4">
          {testimonials.map((t) => (
            <div key={t._id} className="border rounded p-4 shadow max-h-52 overflow-y-auto">
              <h3 className="font-semibold">{t.name}</h3>
              <p className="text-gray-600 whitespace-pre-line">{t.feedback}</p>
              {t.rating && <p className="text-yellow-500 mt-2">⭐ {t.rating}/5</p>}
            </div>
          ))}
        </div>
      ) : (
        <p>No testimonials yet.</p>
      )}
    </div>
  );
}
