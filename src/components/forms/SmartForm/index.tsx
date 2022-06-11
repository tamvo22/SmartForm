import { useCallback } from 'react';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
import Link from '@/com/ui/Link';
import toast, { Toaster } from 'react-hot-toast';
import useCallbackOnce, { Data as CallbackData } from '@/utils/hooks/useCallbackOnce';
import { useRecaptchaValidate } from '@/utils/hooks/useRecaptchaValidate';
import { StyledSmartForm, GoogleDisclosure } from './styled';
import ProcessButton from '@/com/ui/ProcessButton';
import Grid from '@mui/material/Grid';

// https://github.com/react-hook-form/react-hook-form/tree/master/examples

const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
const RECAPTCHA_VERIFY_URL = '/api/verify';
const timeout = 1000;

export type SmartFormProps = {
	submitLabel?: string;
	submitAlign?: 'left' | 'center' | 'right';
	onSubmit: SubmitHandler<any>;
	defaultValues?: any;
	reset?: boolean;
	children: React.ReactElement | React.ReactElement[];
};

export type Data = CallbackData;

function SmartForm(props: SmartFormProps) {
	const { submitLabel, submitAlign = 'center', onSubmit, defaultValues = {}, reset = true, children } = props;

	const reCaptchaError = 'Request denied. Your reCaptcha score is too high.';

	const methods = useForm({
		defaultValues: defaultValues,
		mode: 'onBlur',
	});

	const { status, submitOnce } = useCallbackOnce();
	const recaptchaResult = useRecaptchaValidate(RECAPTCHA_SITE_KEY!, RECAPTCHA_VERIFY_URL);

	// trim all data strings before send to callbacks
	const trimData = useCallback((data: any) => {
		if (typeof data === 'object') {
			for (let x in data) {
				if (data[x]) data[x] = data[x].trim();
			}
		}

		reset && methods.reset();
		return data;
	}, []);

	return (
		<FormProvider {...methods}>
			<Toaster position='top-center' reverseOrder={false} />
			<StyledSmartForm
				onSubmit={methods.handleSubmit((data) => (recaptchaResult ? submitOnce(trimData(data), onSubmit, timeout) : toast.error(reCaptchaError)))}>
				<Grid container justifyContent='center' alignItems='flex-start'>
					<Grid xs={12} sm={12} md={12} item>
						{children}
					</Grid>
					<GoogleDisclosure>
						This site is protected by reCAPTCHA and the Google{' '}
						<Link href='https://policies.google.com/privacy' fontSize={12}>
							Privacy Policy
						</Link>{' '}
						and{' '}
						<Link href='https://policies.google.com/terms' fontSize={12}>
							Terms of Service
						</Link>{' '}
						apply.
					</GoogleDisclosure>
					<Grid xs={12} sm={12} md={12} item sx={{ textAlign: submitAlign }}>
						<ProcessButton type='submit' disabled={status}>
							{submitLabel}
						</ProcessButton>
					</Grid>
				</Grid>
			</StyledSmartForm>
		</FormProvider>
	);
}

export default SmartForm;
