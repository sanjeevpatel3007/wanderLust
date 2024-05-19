const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
// const multer = require('multer');


if(process.env.NODE_ENV !="production"){
    require("dotenv").config();
  }
 
   

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
}) 


  
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'wanderlust_DEV',
    //   allowedFormats:["png","jpg","jpeg"],
      allowedFormats: ["png", "jpg", "jpeg"]
    // format: async (req, file) => 'png',
    },
  });



  module.exports={cloudinary, storage}
