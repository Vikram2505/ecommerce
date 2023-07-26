const express = require('express');
const { SignUp } = require('../controller/User');

const router = express.Router();
router.post("/sign-up", SignUp);
exports.router = router;