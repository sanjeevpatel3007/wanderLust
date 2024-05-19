const mongoose =require('mongoose')
const Review=require("./review.js")
const listingSchema= new mongoose.Schema({
    title:{
       type: String,
       required:true
       },
    description:String,
    image:{
      url:String,
      filename:String
    },
    price:Number,
    location:String,
    country:String,
    reviews:[
      {
         type:mongoose.Schema.Types.ObjectId,
         ref:"Review",
      }
    ],
    owner:{
      type: mongoose.Schema.Types.ObjectId,
      ref:"User",
    }
   
})

listingSchema.post("findOneAndDelete",async(listing)=>{
  if(listing) {
   await Review.deleteMany({_id : {$in: listing.reviews}});
  };
});

const Listing =mongoose.model('Listing',listingSchema)

module.exports=Listing;   




// type: String,
// default:"https://images.unsplash.com/photo-1585020430145-2a6b034f7729?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGZyZWUlMjBpbWFnZXN8ZW58MHx8MHx8fDA%3D",
// set:(v)=>
// v===""
// ? "https://images.unsplash.com/photo-1585020430145-2a6b034f7729?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGZyZWUlMjBpbWFnZXN8ZW58MHx8MHx8fDA%3D"
// :v,