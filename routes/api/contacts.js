const express = require("express");
const router = express.Router();
const fs = require("fs");
const AWS = require("aws-sdk");
const path = require("path");

AWS.config.update({
  accessKeyId: "AKIAJ2YUN7DMX4WYKKZA",
  secretAccessKey: "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"
});

const Contact = require("../../models/Contact");

// @route  GET api/contacts
// @desc   GET ALL contacts
// @access Public
router.get("/", (req, res) => {
  Contact.find().then(contacts => res.json(contacts));
});

router.post("/postContact", (req, res) => {
  const phone = req.body.phone;
  const data = phone + "\n";
  const newContact = new Contact({
    phone: phone
  });
  newContact
    .save()
    .then(contact => res.json(contact))
    .catch(err => console.log(err));
  fs.appendFile(
    "/Users/huynhcongminh/Desktop/CloudComputing/ezmuscles/client/src/components/Chatbot/contact.txt",
    data,
    err => {
      if (err) console.log(err);
      console.log("Write File Succesfull");
      var s3 = new AWS.S3();
      var filePath =
        "/Users/huynhcongminh/Desktop/CloudComputing/ezmuscles/client/src/components/Chatbot/contact.txt";

      var params = {
        Bucket: "ezmusclespt",
        Body: fs.createReadStream(filePath),
        Key: "folder/" + path.basename(filePath)
      };
      s3.upload(params, (err, data) => {
        if (err) {
          console.log(err);
        }
        if (data) {
          console.log("Upload In: ", data.Location);
        }
      });
    }
  );
});
module.exports = router;
