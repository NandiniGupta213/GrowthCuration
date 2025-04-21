import {Router} from "express"
import { Review } from "../models/review.model.js";
import {addReview,editReview,deleteReview} from "../controllers/review.controller.js"

const router=Router();

router.route("/").get(async (req, res) => {
    console.log("GET /Review route hit");
    try {
      const reviews = await Review.find();
      console.log("Reviews fetched:", reviews);
      res.json(reviews);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      res.status(500).json({ error: "Failed to fetch reviews" });
    }
  });
  

  router.route("/edit/:reviewId").get(async (req, res) => {
    try {
      const review = await Review.findById(req.params.reviewId);
      if (!review) {
        return res.status(404).json({ message: "Review not found" });
      }
      res.status(200).json({ data: review });
    } catch (err) {
      res.status(500).json({ message: "Server error", error: err.message });
    }
  });

router.route("/add").post(addReview)

router.route("/edit/:reviewId").put(editReview)

router.route("/delete/:reviewId").delete(deleteReview)

export default router
