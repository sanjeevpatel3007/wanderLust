const Listing =require("../models/listing")
const Review = require("../models/review")

module.exports.reviewPostRoute= async (req, res) => {
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();
  //   console.log("new review Saved");
    // res.send("new review saved");
    req.flash("success", "new review  added...!")
  
    res.redirect(`/listings/${listing._id}`);
   }

   module.exports.reviewDelete=async (req, res) => {
    let { id, reviewId } = req.params;
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId); 
    req.flash("success", " Review deleted..")
  
    res.redirect(`/listings/${id}`);
  }