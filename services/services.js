const { default: mongoose } = require("mongoose");
const contactsDB = require("../models/contactModel");
const ObjectId = mongoose.Types.ObjectId;
const findByPhone = async (phone) => {
  const contacts = await contactsDB.find({ phone: phone });

  return contacts.length;
};

const findByName = async (name) => {
  const names = await contactsDB.find({ name });
  return names.length;
};

const findByid =async(_id)=>{
    const contact = await contactsDB.find({_id:ObjectId(_id)})
    return contact.length
}

module.exports = {
  findByPhone,
  findByName,
  findByid
};
