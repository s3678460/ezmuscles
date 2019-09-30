const express = require('express');
const router = express.Router();


// Load Product Model
const Product = require('../../models/Product');

// @route  GET api/products/test
// @desc   Tests products route
// @access Public
router.get('/test', (req,res) => res.json({msg: "Products Works"}));

module.exports = router;