import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchTestimonials, postTestimonial } from "./testimonialAPI";

export const getTestimonials = createAsyncThunk(
  "testimonials/fetch",
  async () => await fetchTestimonials()
);

export const submitTestimonial = createAsyncThunk(
  "testimonials/submit",
  async (formData) => await postTestimonial(formData)
);

const testimonialSlice = createSlice({
  name: "testimonials",
  initialState: {
    data: [],
    status: "idle",
    submissionStatus: "idle", 
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTestimonials.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getTestimonials.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(getTestimonials.rejected, (state) => {
        state.status = "failed";
      })

      .addCase(submitTestimonial.pending, (state) => {
        state.submissionStatus = "loading";
      })
      .addCase(submitTestimonial.fulfilled, (state, action) => {
        state.submissionStatus = "succeeded";
        state.data.unshift(action.payload); 
      })
      .addCase(submitTestimonial.rejected, (state) => {
        state.submissionStatus = "failed";
      });
  },
});

export default testimonialSlice.reducer;
