const express = require("express");
const router = express.Router();

const Purchase = require("../../models/Purchase");

router.get("/", (req, res) => {
    Purchase.find().then(purchases => res.json(purchases));
  });


router.post("/postPurchase", (req, res) => {

    const newPurchase = new Purchase ({
        clientName: req.body.clientName,
        clientPhone: req.body.clientPhone,
        clientAddress: req.body.clientAddress,
        productName: req.body.productName,
        productPrice: req.body.productPrice
    });
     newPurchase.save()
        .then(purchase => res.json(purchase))
        .catch(err => console.log(err))


} )

module.exports = router;
