
if(process.env.NODE_ENV !="production"){
  require("dotenv").config();
}
const { MongoClient } = require('mongodb'); 

const express = require('express');

const app = express();
var cors = require('cors')

app.use(cors())



const mongoose = require('mongoose');
// const app = express();
const path = require("path");
const { request } = require('http');
const methodOverride = require('method-override');
const wrapAsync= require("./utils/wrapAsyc.js");
const ExpressError= require("./utils/ExpressError.js");

const listingRouter= require("./routes/listing.js");
const reviewsRouter=require("./routes/review.js");
const userRouter =require("./routes/user.js")

const ejsMate = require("ejs-mate");

 const session= require("express-session")
//  const MongoStore = require("connect-mongo").default;
 const MongoStore = require("connect-mongo");
 
const flash= require("connect-flash")
const passport= require("passport")
const LocalStrategy= require("passport-local")
const User = require('./models/user.js')
// const path = require('path');



if(process.env.NODE_ENV !="production"){
  require('dotenv').config()
}
console.log(process.env.SECRET)
require('dotenv').config()



const PORT = process.env.PORT || 3000;

// data base connection 
      const MONGO_URL=process.env.ATLASDB_URL
main()
async function main() {
  mongoose.connect(MONGO_URL, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  })
  console.log("database connected")
}


// Middleware
app.use(express.json());
app.set('view engine', 'ejs');
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'))
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, 'public')));


const store =MongoStore.create({
  mongoUrl:MONGO_URL,
  crypto:{
    secret: process.env.SECRET,
  },
  touchAfter:     24*3600
});

store.on("error", ()=>{
  console.log("error in mongo session store")
})

const sessionOptions= {
  store,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie:{
    expires: Date.now()+7*24*60*60*1000,
    maxAge: 7*24*60*60*1000,
    httpOnly: true,
  } ,
};




app.use(session(sessionOptions));
app.use(flash())

app.use(passport.initialize());
app.use(passport.session());
passport.use( new LocalStrategy(User.authenticate()))

passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())



app.use((req,res,next)=>{
  res.locals.success=req.flash("success");
  res.locals.error=req.flash("error")
  res.locals.currUser=req.user;
  next()
})
 

//listing routes
app.use("/listings",listingRouter)
app.use("/listings/:id/reviews",reviewsRouter)
app.use("/", userRouter)



// Error handling middleware
app.all("*", (req,res,next)=>{
  next(new ExpressError(404, "Page a not found"));
})
app.use((err, req, res, next) => {
  let {statusCode=500,message="Something went wrong !"}=err;
  // res.status(statusCode).send(message);
  res.status(statusCode).render("error.ejs" ,{err})
});



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
