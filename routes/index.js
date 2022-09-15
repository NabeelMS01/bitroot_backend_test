var express = require('express');
var router = express.Router();
const {getAllContacts,createContact,updateContact,deleteContact,searchContact}=require('../controllers/userController');
const { update } = require('../models/contactModel');
const upload = require('../utils/cloudinary');
 
router.get('/', getAllContacts );

router.post('/create-contact',upload.single("image"), createContact );
router.patch('/update-contact',upload.single("image"),updateContact );
router.delete('/delete',deleteContact);
router.get("/search",searchContact)



 
module.exports = router;
