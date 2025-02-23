import express, { Router } from 'express';
import productsRouter from './routes/products';

const PORT = 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
	res.send('Hello World!');
});

app.use('/products', productsRouter);

app.listen(PORT, () => {
	console.log(`Server started on port ${PORT}`);
});
