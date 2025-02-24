import { Request, Response } from 'express';
import { db } from '../../db';
import { productsTable } from '../../db/schema';
import { eq } from 'drizzle-orm';

export async function getAllProducts(req: Request, res: Response) {
	try {
		const products = await db.select().from(productsTable);
		res.status(200).json(products);
	} catch (error) {
		res.status(500).json({ error });
	}
}

export async function getProductById(req: Request, res: Response) {
	try {
		const [product] = await db
			.select()
			.from(productsTable)
			.where(eq(productsTable.id, Number(req.params.id)));

		if (!product) {
			res.status(404).json({ error: 'Product not found' });
		}

		res.status(200).json(product);
	} catch (error) {
		res.status(500).json({ error });
	}
}

export async function createProduct(req: Request, res: Response) {
	try {
		const [product] = await db
			.insert(productsTable)
			.values(req.body)
			.returning();

		res.status(201).json(product);
	} catch (error) {
		res.status(500).json({ error });
	}
}

export async function updateProduct(req: Request, res: Response) {
	try {
		const [product] = await db
			.update(productsTable)
			.set(req.body)
			.where(eq(productsTable.id, Number(req.params.id)))
			.returning();

		if (!product) {
			res.status(404).json({ error: 'Product not found' });
		}

		res.status(200).json(product);
	} catch (error) {
		res.status(500).json({ error });
	}
}

export async function deleteProduct(req: Request, res: Response) {
	try {
		const [deletedProduct] = await db
			.delete(productsTable)
			.where(eq(productsTable.id, Number(req.params.id)))
			.returning();

		if (!deletedProduct) {
			res.status(404).json({ error: 'Product not found' });
		}

		res.status(200).json(deletedProduct);
	} catch (error) {
		res.status(500).json({ error });
	}
}
