import { styled } from '@mui/material/styles';
import MuiButton from '@mui/material/Button';
import MuiCircularProgress from '@mui/material/CircularProgress';

export const StyledButton = styled(MuiButton)`
	margin-top: 20px;
	padding: 20px 100px !important;
	.Mui-disabled {
		padding: 24px 84px;
	}
	${({ theme }) => ({
		[theme.breakpoints.down('md')]: {
			width: '100%',
		},
		[theme.breakpoints.up('md')]: {
			width: 'auto',
		},
	})};
`;

export const CircularProgress = styled(MuiCircularProgress)`
	margin-top: 4px;
	margin-bottom: 4px;
	color: #fff;
`;
