import { Router } from 'express';
import {
	createProduct,
	deleteProduct,
	getAllProducts,
	getProductById,
	updateProduct,
} from './products.controller';
import { validateData } from '../../middlewares/validation.middleware';

import { createProductSchema, updateProductSchema } from '../../db/schema';

const router = Router();

router.get('/', getAllProducts);

router.get('/:id', getProductById);

router.post('/', validateData(createProductSchema), createProduct);

router.patch('/:id', validateData(updateProductSchema), updateProduct);

router.delete('/:id', deleteProduct);

export default router;
