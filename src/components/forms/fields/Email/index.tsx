import TextField, { TextFieldProps } from '@/com/forms/fields/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import EmailIcon from '@mui/icons-material/Email';

const EmailRegEx =
	/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

type EmailProps = TextFieldProps & {
	startIcon?: boolean;
	endIcon?: boolean;
};

const Email = (props: EmailProps) => {
	const { name, variant, label, defaultValue, rules, startIcon, endIcon, ...rest } = props;

	const InputIcon = (
		<InputAdornment position='end'>
			<EmailIcon color='inherit' />
		</InputAdornment>
	);

	return (
		<TextField
			type='email'
			variant={variant}
			name={name}
			label={label}
			defaultValue={defaultValue}
			rules={{
				pattern: {
					value: EmailRegEx,
					message: 'Incorrect email format',
				},
				...rules,
			}}
			startAdornment={startIcon && InputIcon}
			endAdornment={endIcon && InputIcon}
			{...rest}
		/>
	);
};

export default Email;
