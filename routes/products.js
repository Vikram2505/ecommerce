import express from 'express';
import { createProduct } from '../controller/Product.js';

const router = express.Router();
// const auth = "../middleware/auth";

router.post('/create', createProduct);

export default router;