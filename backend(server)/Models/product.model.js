const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    img: String,
    name: String,
    price: Number,
    quantity: Number,
    description: String,
  },

  { versionKey: false }
);
 
const ProductList = mongoose.model("products", productSchema);


module.exports = {ProductList};