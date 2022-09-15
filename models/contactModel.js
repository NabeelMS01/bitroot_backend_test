const mongoose = require("mongoose");

const ObjectId = mongoose.Schema.Types.ObjectId;

const contactSchema = mongoose.Schema({
  name: { type: String, unique: true },
  phone: { type: [String], unique: true },
  image: { type: Object },
});

const Contact = mongoose.model("contacts", contactSchema);
module.exports = Contact;
