import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { RegisterUserBody } from './auth.schema';
import { createUser } from './auth.service';

export async function registerHandler(
	req: Request<Record<string, unknown>, Record<string, unknown>, RegisterUserBody>,
	res: Response
) {
	try {
		await createUser({ ...req.body });
		return res.status(StatusCodes.CREATED).send('user created successfully');
	} catch (err) {
		console.log(err);
		if (err.code === 11000) {
			return res.status(StatusCodes.CONFLICT).send('User already exists');
		}
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err.message);
	}
}
