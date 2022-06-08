import { styled } from '@mui/material/styles';
import MuiStack from '@mui/material/Stack';
import MuitToolbar from '@mui/material/Toolbar';
import NextLink from '@/com/ui/Link';

export const Toolbar = styled(MuitToolbar)`
	width: 100%;
	max-width: 70vw;
	justify-content: flex-end;
	padding-left: 0px !important;
	padding-right: 0px !important;
` as typeof MuitToolbar;

export const Stack = styled(MuiStack)`
	transition: width 4s ease-out;
	overflow: hidden;
	width: 100%;
	max-width: 70vw;
	justify-content: flex-end;
	align-items: center;
`;

export const Link = styled(NextLink)`
	font-size: 18px;
	color: #fff;
	margin-right: 48px;
	text-decoration: none;
	:hover {
		color: ${({ theme }) => theme.palette.secondary.main};
		text-decoration: none;
	}
`;
