// const express = require('express');
const express = require('express');
const Listing = require("../models/listing.js");
// const router=express.Router({mergeParams:true})
// const app = express();
const wrapAsync= require("../utils/wrapAsyc.js")
const ExpressError= require("../utils/ExpressError.js")
const Review = require("../models/review.js");
const {reviewSchema}=require("../schema.js");
const {validateReview, isLoggedIn, isReviewAuthor}=require("../middleware.js")
const reviewController=require("../controllers/review.js")

const router = express.Router({ mergeParams: true });

//post route
router.post("/", 
// validateReview,
isLoggedIn,
 wrapAsync( reviewController.reviewPostRoute ));  
   
// delete review route
router.delete("/:reviewId", isLoggedIn,isReviewAuthor,
(
  reviewController.reviewDelete
))




module.exports=router;