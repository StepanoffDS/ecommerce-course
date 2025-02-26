import { Router } from 'express';
import { createUserSchema, loginSchema, usersTable } from '../../db/schema';
import { validateData } from '../../middlewares/validation.middleware';
import bcrypt from 'bcryptjs';
import { db } from '../../db';
import { eq } from 'drizzle-orm';
import jwt from 'jsonwebtoken';

const router = Router();

router.post('/register', validateData(createUserSchema), async (req, res) => {
	const { password, ...data } = req.body;
	const hashedPassword = await bcrypt.hash(password, 10);

	try {
		const [user] = await db
			.insert(usersTable)
			.values({
				...data,
				password: hashedPassword,
			})
			.returning();

		res.status(200).json({ user });
	} catch (error) {
		res.status(500).json({ error });
	}
});

router.post('/login', validateData(loginSchema), async (req, res) => {
	const { email, password } = req.body;

	try {
		const [user] = await db
			.select()
			.from(usersTable)
			.where(eq(usersTable.email, req.body.email));

		if (!user) {
			res.status(401).json({ error: 'Authentication failed' });
		}

		const matched = await bcrypt.compare(password, user.password);

		if (!matched) {
			res.status(401).json({ error: 'Authentication failed' });
		}

		const token = jwt.sign(
			{
				userId: user.id,
				role: user.role,
			},
			process.env.JWT_SECRET as string,
			{ expiresIn: '30d' },
		);

		res.status(200).json({ token, user });
	} catch (error) {}
});

export default router;
