import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export function verifyToken(req: Request, res: Response, next: NextFunction) {
	const token = req.header('Authorization');

	if (!token) {
		res.status(401).json({ error: 'Unauthorized' });
		return;
	}

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
		if (typeof decoded !== 'object' || !decoded?.userId) {
			res.status(401).json({ error: 'Unauthorized' });
			return;
		}

		req.userId = decoded.userId;
		req.role = decoded.role;

		next();
	} catch (error) {
		res.status(401).json({ error: 'Unauthorized' });
	}
}

export function verifySeller(req: Request, res: Response, next: NextFunction) {
	const role = req.role;

	if (role !== 'seller') {
		res.status(401).json({ error: "You don't have permission" });
		return;
	}

	next();
}
