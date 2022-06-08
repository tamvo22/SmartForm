import { styled } from '@mui/material/styles';
import InputLabel from '@mui/material/InputLabel';

export const MuiInputLabel = styled(InputLabel)`
  
	& .css-wgai2y-MuiFormLabel-asterisk {
		color: ${({ theme, required }) => required && theme.palette.error.main};
	}
`;
