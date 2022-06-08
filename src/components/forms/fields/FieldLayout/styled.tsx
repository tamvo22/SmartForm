import { styled } from '@mui/material/styles';
import MuiGrid, { GridProps } from '@mui/material/Grid';

export const Container = styled(MuiGrid)<GridProps>`
	margin: 15px auto;
`;

export const Grid = styled(MuiGrid)`
	margin-top: 16px;
	padding: 0 16px;
	display: block;
`;
