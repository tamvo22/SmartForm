import { StyledButton, CircularProgress } from './styled';
import { ButtonProps } from '@mui/material/Button';

const ProcessButton = (props: ButtonProps) => {
	const { disabled = false, children, ...rest } = props;

	return (
		<StyledButton variant='contained' disabled={disabled} {...rest}>
			{disabled ? <CircularProgress size={24} /> : children}
		</StyledButton>
	);
};

export default ProcessButton;
