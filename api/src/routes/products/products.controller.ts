import { Request, Response } from 'express';

export function getAllProducts(req: Request, res: Response) {
	res.send('List of products');
}

export function getProductById(req: Request, res: Response) {
	res.send(`Product with id ${req.params.id}`);
}

export function createProduct(req: Request, res: Response) {
	console.log(req.body);
	res.send('Product created successfully!');
}

export function updateProduct(req: Request, res: Response) {
	res.send('update product');
}

export function deleteProduct(req: Request, res: Response) {
	res.send('delete product');
}
