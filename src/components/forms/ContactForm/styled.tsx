import { styled } from '@mui/material/styles';
import MuiContainer from '@mui/material/Container';
import MuiPaper from '@mui/material/Paper';

export const Container = styled(MuiContainer)`
	margin-bottom: 50px;
	max-width: 900px;
`;

export const Title = styled('div')`
	margin: 20px auto;
	width: 100%;
	text-align: center;
`;

export const Paper = styled(MuiPaper)`
	padding: 40px;
	border: 1px solid #d1d1d1;
`;
