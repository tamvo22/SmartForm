import { useState, useEffect } from 'react';
import useIsMounted from '@/utils/hooks/useIsMounted';
import axios from 'axios';

const axiosClient = axios.create();

export const useRecaptchaValidate = (recaptchaSiteKey: string, apiRoute: string): boolean => {
	const [recaptchaResult, setRecaptchaResult] = useState(false);

	const isMounted = useIsMounted();

	useEffect(() => {
		const { grecaptcha } = window as any;

		// exit if recaptchaResult is true;
		if (recaptchaResult) return;

		grecaptcha?.ready(async () => {
			const recaptchaToken = await grecaptcha?.execute(recaptchaSiteKey, { action: 'submit' });

			// exit is recaptchaToken is undefined
			if (!recaptchaToken) return;

			const requestHeaders = { token: recaptchaToken };
			const result = await axiosClient(apiRoute, { headers: requestHeaders });

			if (result.data.verified) {
				isMounted && setRecaptchaResult(true);
			}
		});
	}, [recaptchaSiteKey, apiRoute]);

	return recaptchaResult;
};
