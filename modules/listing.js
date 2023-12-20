const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const listingSchema = new Schema
({
    title: {
      type: String,
      required: true,
    },
    description: String,
    image: {
      type: String,
      default:'https://images.unsplash.com/photo-1625505826533-5c80aca7d157?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGdvYXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60'
        
        
      // set: (v) => {
      //   if (typeof v === "object" && v.url) {
      //     return v.url;
      //   } else if (typeof v === "string") {
      //     return v;
      //   } else {
      //     // If it's neither an object nor a string, use the default value
      //     return "https://images.unsplash.com/photo-1625505826533-5c80aca7d157?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGdvYXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60";
      //   }
      // },
    },
    
    
    price: Number,
    location: String,
    country: String,
  });
  
  

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;