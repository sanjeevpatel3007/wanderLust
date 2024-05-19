const Listing=require("../models/listing")





module.exports.index= async (req, res) => {
    try {
      const allListings = await Listing.find();
      res.render("listings/index.ejs", { allListings });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  
  }

  module.exports.newRoute=(req, res) => {
    try {
    
      res.render("listings/new.ejs");
    } catch (error) {
      res.status(500).json({ message: err.message });
  
    }
  }

  module.exports.show=async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id)
    .populate({path:'reviews',populate:{
      path:"author"},
    })
    .populate("owner");
    console.log(listing);
    if (!listing) {
      req.flash("error", "Listing you requested for does not exist")
      res.redirect("/listings");
    }
  
    res.render("listings/show.ejs", { listing } );
  }


  module.exports.create=async (req, res, next) => {
  let url=req.file.path;
  let filename= req.file.filename;

    const newListing = new Listing(req.body.listing);
   newListing.owner= req.user._id;
   newListing.image={url, filename}
    await newListing.save();
    req.flash("success", "new list is created")
    res.redirect("/listings");

  }


  module.exports.edit=async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id)

    res.render("listings/edit", { listing });

let orignalImageUrl=listing.image.url;
console.log(orignalImageUrl)
orignalImageUrl= orignalImageUrl.replace("/upload","/upload/h_200/w_250")
console.log(orignalImageUrl)

res.render("listings/edit", { listing ,orignalImageUrl});

  }
  


  module.exports.updateRoute=async (req, res) => {
    const { id } = req.params;
  
//middleware
    const updatedListing = await Listing.findByIdAndUpdate(id, req.body.listing, { new: true });

    if(typeof  req.file !=="undefined"){
    let url=req.file.path;
    let filename= req.file.filename;
    updatedListing.image={url, filename}
    await updatedListing.save()
  }
    res.redirect(`/listings/${updatedListing._id}`);
  }
 

  module.exports.deleteRoute=
  async (req, res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    req.flash("success", " list is deleted..")
  
    res.redirect("/listings");
  }