import { asynchandler } from "../utils/asynchHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { Review } from "../models/review.model.js";
import crypto from "crypto";


const generateToken = () => crypto.randomBytes(32).toString("hex");

const addReview = asynchandler(async (req, res) => {
  const { name, company, review, rating } = req.body;

  // Generate editKey for the review
  const editKey = generateToken(); 

  try {
    // Create new review object and save it
    const newReview = new Review({
      name,
      company,
      review,
      rating,
      editKey,
    });

    await newReview.save();

    // Return success response with reviewId and editKey
    return res.status(201).json(new ApiResponse(201, { reviewId: newReview._id, editKey }, "Review added successfully!"));
  } catch (error) {
    console.error("Error adding review:", error);
    return res.status(500).json(new ApiResponse(500, null, error.message || "Failed to add review."));
  }
});



const editReview = asynchandler(async (req, res) => {
  const { reviewId } = req.params;
  const { 
    company,
    review,
    rating,
    editKey} = req.body;
  console.log("requsted body",req.body.review)
  

  const reviewC = await Review.findById(reviewId);
  if (!reviewC) {
    return res.status(404).json(new ApiResponse(404, null, "Review not found"));
  }

  // Check if the editKey matches the stored one
  if (reviewC.editKey !== editKey) {
    return res.status(403).json(new ApiResponse(403, null, "Unauthorized: You cannot edit this review"));
  }

  // Update review content
  reviewC.company = company;
  reviewC.rating = rating;
  reviewC.review = review;
  
  await reviewC.save();

  // Return success response
  return res.status(200).json(new ApiResponse(200, { reviewId: review._id }, "Review updated successfully!"));
});

const deleteReview = asynchandler(async (req, res) => {
  const { reviewId } = req.params;
  const { editKey } = req.body;

  // Find the review by ID
  const review = await Review.findById(reviewId);
  
  if (!review) {
    return res.status(404).json({ message: "Review not found" });
  }
  
  console.log("Request body:", req.body);
  console.log("Review ID:", req.params.reviewId);

  // Check if the edit key matches
  if (review.editKey !== editKey) {
    return res.status(403).json({ message: "Unauthorized: You cannot delete this review" });
  }

  // Use findByIdAndDelete or deleteOne to delete the review
  await Review.findByIdAndDelete(reviewId);  // This will delete the review by its ID

  // Send success response
  return res.status(200).json({ message: "Review deleted successfully!" });
});


export { addReview, editReview, deleteReview };


