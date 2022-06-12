"use strict";
var mongoose = require("mongoose");
var { Schema } = mongoose;
let productSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  img: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  availableQty: {
    type: Number,
    required: true,
  },
});
mongoose.models = {};
export default mongoose.model("Product", productSchema);
