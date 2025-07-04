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
		return res.status(StatusCodes.CREATED).json({
      message: 'user created successfully'
    });
	} catch (err) {
		console.log(err);
		if (err.code === 11000) {
			return res.status(StatusCodes.CONFLICT).json({
        error: 'username or email is already taken'
      });
		}
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: err.message
    });
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
		return res.status(StatusCodes.UNAUTHORIZED).json({
      error: 'Invalid email or password'
    });
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

	return res.status(StatusCodes.OK).json({
    token: jwt
  });
}

export async function logoutHandler(_: Request, res: Response) {
	const user = res.locals.user;

	if (!user) {
		return res.status(StatusCodes.UNAUTHORIZED).json({
      error: 'You are not logged in'
    });
	}
	res.clearCookie(COOKIE_NAME);
	res.end();
}
