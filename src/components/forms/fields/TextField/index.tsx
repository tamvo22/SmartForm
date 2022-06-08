import { useFormContext, useController, RegisterOptions } from 'react-hook-form';
import { MuiTextField, MuiTextFieldProps } from './styled';
import { DistributiveOmit } from '@mui/types';

export type TextFieldProps = DistributiveOmit<MuiTextFieldProps, 'name'> & {
	name: string;
	label?: string;
	rules?: RegisterOptions;
	readOnly?: boolean;
	disabled?: boolean;
	startAdornment?: React.ReactNode;
	endAdornment?: React.ReactNode;
};

export const TextField = (props: TextFieldProps) => {
	const {
		name,
		variant = 'outlined',
		label,
		defaultValue = '',
		rules,
		size = 'small',
		autoComplete = 'off',
		fullWidth = false,
		required,
		readOnly,
		disabled,
		startAdornment,
		endAdornment,
		...rest
	} = props;

	const { control } = useFormContext(); // retrieve all hook methods

	const {
		field, // { onChange, onBlur, name, value, ref },
		fieldState, //: { invalid, isTouched, isDirty, error },
	} = useController({
		name: name,
		defaultValue: defaultValue,
		control: control,
		rules: {
			required: required && { value: true, message: 'Field is required' },
			...rules,
		},
	});

	const error = fieldState.error;

	return (
		<MuiTextField
			variant={variant}
			id={name}
			aria-describedby={'input' + name}
			aria-invalid={error ? 'true' : 'false'}
			error={Boolean(error)}
			helperText={error?.message}
			size={size}
			autoComplete={autoComplete}
			fullWidth={fullWidth}
			InputProps={{
				readOnly: readOnly,
				disabled: disabled,
				startAdornment: startAdornment,
				endAdornment: endAdornment,
			}}
			{...rest}
			{...field}
		/>
	);
};

export default TextField;
