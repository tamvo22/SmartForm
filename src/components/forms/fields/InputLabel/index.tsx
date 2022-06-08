import { MuiInputLabel } from './styled';

export type InputLabelProps = {
	name: string;
	required?: boolean;
	children: string;
};

const InputLabel = (props: InputLabelProps) => {
	const { name, required, children } = props;

	return (
		<MuiInputLabel htmlFor={name} required={required}>
			{children}
		</MuiInputLabel>
	);
};

export default InputLabel;
