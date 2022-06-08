import { styled } from '@mui/material/styles';
import TextField, { TextFieldProps } from '@mui/material/TextField';

export type MuiTextFieldProps = TextFieldProps;

export const MuiTextField = styled(TextField)`
	& .MuiFormHelperText-root {
		font-size: 16px;
		margin-top: 8px;
		margin-bottom: 8px;
	}
	.MuiOutlinedInput-root {
		:hover {
			.MuiOutlinedInput-notchedOutline {
				border: 3px solid ${({ theme }) => theme.palette.primary.main};
			}
		}
	}
	.Mui-error.MuiOutlinedInput-root {
		:hover {
			.MuiOutlinedInput-notchedOutline {
				border: 3px solid ${({ theme }) => theme.palette.error.main};
			}
		}
	}
`;
