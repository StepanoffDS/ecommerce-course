import { Router } from 'express';
import {
	createProduct,
	deleteProduct,
	getAllProducts,
	getProductById,
	updateProduct,
} from './products.controller';

const router = Router();

router.get('/', getAllProducts);

router.get('/:id', getProductById);

router.post('/', createProduct);

router.put('/:id', updateProduct);

router.delete('/:id', deleteProduct);

export default router;
