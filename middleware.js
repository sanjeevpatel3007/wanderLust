const Listing=require("./models/listing")
// const session= require("express-session")
const flash= require("connect-flash")
const {listingSchema,reviewSchema}=require("./schema.js")
const ExpressError=require("./utils/ExpressError.js")
const Review=require("./models/review.js")
module.exports.isLoggedIn=(req,res,next)=>{
    if (!req.isAuthenticated()) {
        req.session.redirectUrl=req.originalUrl;
        req.flash("error", "You must be logged first");
       return  res.redirect("/login" )
      }
      next(); 
};

module.exports.saveRedirectUrl=(req,res, next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl=req.session.redirectUrl;
    }
    next()
}

module.exports.isOwner= async(req,res, next)=>{
    let {id}=req.params;
    let listing= await Listing.findById(id);
 if(!listing.owner || !res.locals.currUser || !listing.owner._id.equals(res.locals.currUser._id)) {
    req.flash("error","You are not the owner of this listing")
    return res.redirect(`/listings/${id}`);
   }
next()
}


module.exports.isReviewAuthor= async(req,res, next)=>{
    let {id,reviewId}=req.params;
    let review= await Review.findById(reviewId);
 if(!review.author || !res.locals.currUser || !review.author._id.equals(res.locals.currUser._id)) {
    req.flash("error","You are not the author of this listing")
    return res.redirect(`/listings/${id}`);
   }
next()
}



// validating listimng
module.exports.validateListing = (req, res, next) => {
    let { error } = listingSchema.validate(req.body);
    if (error) {
      const errMsg = error.details.map(el => el.message).join(",")
      throw new ExpressError(400, result.error)
    } else {
      next();
    }
  }


  //validate review 
module.exports.validateReview= (req,res,next)=>{
    let {error}=reviewSchema.validate(req.body);
    // console.log(error.message);
    if(error){
        let errMsg=error.details.map(el=>el.message).join(",")
      throw new ExpressError(400,errMsg)
    }else{
      next();
    }
  }