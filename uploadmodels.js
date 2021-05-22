const mongoose = require("mongoose");
const uploadbook = new mongoose.Schema({
  bookToUpload: {
    type: String,
    required: true
  }
 });
 module.exports = mongoose.model("Books", uploadbook);