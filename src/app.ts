import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import { connect } from './utils/database';

const main = async () => {
	const port = process.env.PORT;
	const app = express();

	app.use(express.json());
	app.use(
		cors({
			origin: process.env.CORS_ORIGIN,
			credentials: true
		})
	);

	app.get('/api/v1/health', (req, res) => {
		res.send({ status: 'ok' });
	});

	app.listen(port, async () => {
		console.log(`server started on http://localhost:${port}`);
		await connect();
	});
};

main().catch((err) => {
	console.error(err);
});
