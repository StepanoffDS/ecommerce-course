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
import { verifySeller, verifyToken } from '../../middlewares/auth.middleware';

const router = Router();

router.get('/', getAllProducts);

router.get('/:id', getProductById);

router.post(
	'/',
	verifyToken,
	verifySeller,
	validateData(createProductSchema),
	createProduct,
);

router.patch(
	'/:id',
	verifyToken,
	verifySeller,
	validateData(updateProductSchema),
	updateProduct,
);

router.delete('/:id', verifyToken, verifySeller, deleteProduct);

export default router;
