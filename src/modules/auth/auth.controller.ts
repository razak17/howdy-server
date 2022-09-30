import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import argon2 from 'argon2';

import { LoginBody } from './auth.schema';
import { createUser, findUserByEmail } from '../user/user.service';
import omit from '../../utils/omit';
import { signJwt } from './auth.utils';
import { RegisterBody } from '../user/user.schema';

const COOKIE_NAME = 'accessToken';

export async function registerHandler(
	req: Request<Record<string, unknown>, Record<string, unknown>, RegisterBody>,
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

export async function loginHandler(
	req: Request<Record<string, unknown>, Record<string, unknown>, LoginBody>,
	res: Response
) {
	const { email, password } = req.body;

	// find user by email
	const user = await findUserByEmail(email);
	const isValid = await argon2.verify(user?.password as string, password);

	if (!user || !isValid) {
		return res.status(StatusCodes.UNAUTHORIZED).send('Invalid email or password');
	}

	const payload = omit(user.toJSON(), ['password']);
	const jwt = signJwt(payload);

	res.cookie(COOKIE_NAME, jwt, {
		maxAge: 3.154e10, // 1 year
		httpOnly: true,
		domain: process.env.DOMAIN as string,
		sameSite: 'none',
		secure: true
	});

	return res.status(StatusCodes.OK).send(jwt);
}
