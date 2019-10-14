const express = require('express');
const router = express.Router();
const AWS = require("aws-sdk")
const multer = require("multer");
const upload = multer({ dest: "upload/" })
const fs = require("fs")
const axios = require("axios")

//connect s3 bucket
const ID = 'AKIAJ2YUN7DMX4WYKKZA';
const SECRET = `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`;
const s3 = new AWS.S3({
    accessKeyId: ID,
    secretAccessKey: SECRET
})

// Load Product Model
const Product = require('../../models/Product');

// @route  GET api/products/test
// @desc   Tests products route
// @access Public
router.get('/test', (req, res) => res.json({ msg: "Products Works" }));

//@route GET api/products
//@route GET All PRODUCTS
//@route Public
router.get(`/all`, (req, res) => {
    Product.find()
        .then(projects => res.json(projects))
        .catch(err => res.status(404).json({ GetAll: "Fail" }))
})
//@route POST api/products/image
//@route GET A IAMGE'S CONTENT
//@route Public
router.post(`/image`, upload.single("image"), (req, res) => {
    const file = req.file
    res.json(file)
})

//@route POST api/products
//@route CREATE A PRODUCTS
//@route Public
router.post(`/`, (req, res) => {
    const imageContent = fs.readFileSync(`./upload/${req.body.filename}`)
    //setting up S3 upload parameters
    const params = {
        Bucket: "ezmuscles",
        Key: req.body.filename + req.body.originalname,
        Body: imageContent
    }
    // // Uploading files to the bucket
    s3.upload(params, (err, data) => {
        if (err) {
            console.log(err)
        }
        fs.unlinkSync(`./upload/${req.body.filename}`)
    })
    const newProduct = new Product({
        name: req.body.name,
        price: req.body.price,
        category: req.body.category,
        description: req.body.description,
        quantity: req.body.quantity,
        imageURL: req.body.filename + req.body.originalname
    })
    newProduct.save().then(project => res.json(project))
})

//@route DELETE api/products
//@route DELETE A PRODUCTS
//@route Public
router.delete(`/:id`, (req, res) => {
    //setting up S3 upload parameters
    Product.findByIdAndRemove(req.params.id)
        .then(deletedPro => {
            const params = {
                Bucket: "ezmuscles",
                Key: deletedPro.imageURL
            }
            s3.deleteObject(params, (err, data) => {
                if (err) {
                    console.log(err)
                }
                console.log(data)
                res.json(deletedPro)
            })
        })
        .catch(err => res.status(404).json({ delete: "false" }))
})

//@route UPDATE api/products
//@route UPDATE A PRODUCTS
//@route Public
router.put("/:id", (req, res) => {
    var updatedPro = req.body
    Product.findByIdAndUpdate(req.params.id, updatedPro)
        .then(() => res.json({ update: "Success" }))
        .catch(err => res.status(404).json({ update: "Fail" }))
})

//@route GET api/products
//@route GET A PRODUCTS
//@route Public
router.get(`/:id`, (req, res) => {
    Product.findById(req.params.id)
        .then(product => {
            res.json(product)
        })
        .catch(err => res.status(404).json({ Get: "Fail" }))
})

module.exports = router;