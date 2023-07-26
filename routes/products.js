const express = require('express');
const { createProduct } = require('../controller/Product');
const router = express.Router();
// const auth = "../middleware/auth";

router.post('/create', createProduct);

exports.router = router;