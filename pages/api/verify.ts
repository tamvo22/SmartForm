import type { NextApiRequest, NextApiResponse } from 'next';

const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY;

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const { token } = req.headers;

	// type guard recaptcha_token must be a string and not string[]
	if (token && typeof token === 'string') {
		try {
			const isValidToken = await verifyRecaptchaToken(token);
			if (isValidToken) {
				res.status(200).json({ verified: true });
			} else {
				res.status(200).json({ verified: false });
			}
		} catch (error: any) {
			res.status(200).json({ verified: false });
		}
	} else {
		res.status(200).json({ verified: false });
	}
};

const verifyRecaptchaToken = async (token: string) => {
	// Google reCAPTCHA fetch options
	const fetchOptions = {
		method: 'POST',
		body: `secret=${RECAPTCHA_SECRET_KEY}&response=${token}`,
		headers: { 'Content-type': 'application/x-www-form-urlencoded' },
	};

	try {
		const resp = await fetch('https://www.google.com/recaptcha/api/siteverify', fetchOptions);
		const respJson = await resp.json();
		const { success, score } = respJson;

		// return if successfuly validated and score of 0.5 or above
		return success && score > 0.5;
	} catch (e) {
		return false;
	}
};
