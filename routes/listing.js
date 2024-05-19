
const express = require("express");
const router = express.Router();  
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsyc.js")
const ExpressError = require("../utils/ExpressError.js")
const { listingSchema } = require("../schema.js");
const { reviewSchema } = require("../schema.js");
const { isLoggedIn , isOwner, validateListing} = require("../middleware.js");
const listingControler= require("../controllers/listing.js")
   
const multer=require("multer");
const {  storage } = require("../cloudConfig.js");
const upload = multer({storage});


router.route("/")
.get( wrapAsync(listingControler.index)) 
.post( isLoggedIn,
upload.single('listing[image]'),
 wrapAsync(   listingControler.create )
);

//  validateListing,
 
// .post(  (req, res ) =>{
//   // console.log("file")
//   res.send(req.file)
  
// })   



// Add new list route
router.get("/new", isLoggedIn,listingControler.newRoute )



router.route("/:id")
.get(wrapAsync(listingControler.show ))

.delete( isLoggedIn, isOwner,
listingControler.deleteRoute
)
.put( isLoggedIn,
  isOwner,
  upload.single('listing[image]'),
  validateListing,
  wrapAsync(listingControler.updateRoute )
);



//  edit route
router.get("/:id/edit",isLoggedIn,isOwner, 
wrapAsync( listingControler.edit  ));




module.exports = router;