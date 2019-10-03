const express = require('express');
const router = express.Router();


// Load Product Model
const Product = require('../../models/Product');

// @route  GET api/products/test
// @desc   Tests products route
// @access Public
router.get('/test', (req, res) => res.json({ msg: "Products Works" }));

//@route GET api/products
//@route GET All PRODUCTS
//@route Public
router.get(`/`, (req, res) => {
    Product.find()
        .then(projects => res.json(projects))
        .catch(err => res.status(404).json({ GetAll: "Fail" }))
})

//@route POST api/products
//@route CREATE A PRODUCTS
//@route Public
router.post(`/`, (req, res) => {
    const newProduct = new Product({
        name: req.body.name,
        price: req.body.price,
        category: req.body.category,
        description: req.body.description,
        imageURL: req.body.imageURL
    })
    Product.save().then(project => res.json(project))
})

//@route DELETE api/products
//@route DELETE A PRODUCTS
//@route Public
router.delete(`/:id`, (req, res) => {
    Product.findByIdAndRemove(req.params.id)
        .then(deletedPro => res.json(deletedPro))
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
        .then(product => res.json(product))
        .catch(err => res.status(404).json({ Get: "Fail" }))
})

module.exports = router;