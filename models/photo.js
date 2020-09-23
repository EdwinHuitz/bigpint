const mongoose = require("mongoose");
const Schema = mongoose.Schema

const photoSchema = new Schema({
  gId: String,
  filename: String,
  baseUrl: String,
  mediaMetadata: Object,
})

 module.exports = mongoose.model('Photo', photoSchema)