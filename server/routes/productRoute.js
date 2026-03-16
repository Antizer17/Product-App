import express from 'express'
import {getAllProducts, getProduct, postProduct, putProduct, deleteProduct } from '../controllers/productControllers.js';

const router = express.Router();

router.post('/', postProduct)

router.get('/:id',getProduct)

router.get("/", getAllProducts)

router.put('/:id',putProduct)

router.delete('/:id',deleteProduct)

export default router;