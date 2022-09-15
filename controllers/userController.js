const asyncHandler = require("express-async-handler");

const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const {
  findByPhone,
  findByid,
  findByName,
} = require("../services/services.js");
const contactsDB = require("../models/contactModel");
const { default: mongoose } = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const getAllContacts = asyncHandler(async (req, res) => {
  try {
    await contactsDB.find().then(async(response) => {
      if (response) {
        const csvWriter = createCsvWriter({
          path: 'contacts.csv',
          header: [
              { id: 'name', title: 'NAME' },
              { id: 'phone', title: 'PHONE NO.' },
              { id: 'image', title: 'IMAGE LINK' }
          ]
      });

      await csvWriter.writeRecords(response)


        res.status(200).json(response);
 

      } else {
        res.status(404).json("no contacts found");
      }
    });
  } catch (error) {
 
    res.status(404).json("something went wrong");
  }
});

const createContact = asyncHandler(async (req, res) => {
  try {
    const { name, phone } = req.body;
    const image = req.file ? req.file.path : null;

    const contactData = {
      name,
      phone,
      image,
    };

    const nameExist = await findByName(name);

    const phoneExist = await findByPhone(parseInt(phone));

    if (phoneExist) {
      res.status(400);
      throw new Error("Phone Exist");
    }
    if (nameExist) {
      res.status(400);
      throw new Error("Name Exist");
    }

    if (!phoneExist && !nameExist) {
      await contactsDB
        .create(contactData)
        .then((response) => {
          if (response) {
            res.status(200).json("contact created");
          }
        })
        .catch((error) => {
          if (error) {
            res.status(400).json("something went wrong");
          }
        });
    }
  } catch (error) {
    if (error.message == "Phone Exist") {
      res.status(400).json("phone number already exist");
    }
    if (error.message == "Name Exist") {
      res.status(400).json("contact name already exist");
    }
  }
});

const updateContact = asyncHandler(async (req, res) => {
  try {
    const image = req.file ? req.file.path : null;

    const { _id } = req.query;
    const { name, phone } = req.body;

    const contactExist = await findByid(_id);

    if (!contactExist) {
      res.status(400);
      throw new Error("no contact");
    }
    if (contactExist) {
      await contactsDB
        .updateOne(
          { _id: ObjectId(_id) },
          {
            name,
            phone,
            image,
          }
        )
        .then((response) => {
          if (response) {
            res.status(200).json("contact updated");
          }
        })
        .catch((error) => {
          if (error) {
            res.status(400).json("something went wrong");
          }
        });
    }
  } catch (error) {
    if (error.message == "no contact") {
      res.status(404).json("this contact is unavailable");
    }

    res.json(error.message);
  }
});

const deleteContact = asyncHandler(async (req, res) => {
  try {
    const { id } = req.query;
    await contactsDB.findByIdAndDelete(id).then((response) => {
      if (response) {
        res.status(200).json("contact deleted");
      } else {
        res.status(400);
        throw new Error();
      }
    });
  } catch (error) {
    res.json(error.message);
  }
});

const searchContact = asyncHandler(async (req, res) => {
  try {
    const { value } = req.query;
    await contactsDB
      .find({
        $or: [
          {
            name: new RegExp(value, "i"),
          },
          {
            phone: new RegExp(value, "i"),
          },
        ],
      })
      .then((response) => {
       
        if (response[0]) {
          res.status(200).json(response);
        } else {
          res.status(400).json("no contact found");
        }
      })
      .catch((error) => {
        if (error) {
          res.status(400);
          throw new Error("something went wrong");
        }
      });
  } catch (error) {
    res.json(error.response.message);
  }
});

module.exports = {
  getAllContacts,
  createContact,
  updateContact,
  deleteContact,
  searchContact,
};
