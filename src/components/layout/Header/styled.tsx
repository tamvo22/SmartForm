import { styled } from '@mui/material/styles';
import MuiToolbar from '@mui/material/Toolbar';
import MuiAppBar from '@mui/material/AppBar';

export const AppBar = styled(MuiAppBar)`
	display: flex;
	align-content: space-between;
	flex-direction: row;
	${(props) => ({ ...props.theme.mixins.toolbar })}
`;

export const Toolbar = styled(MuiToolbar)`
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
` as typeof MuiToolbar;

export const Logo = styled('div')`
	font-size: 23px;
	width: 200px;
`;

export const HeaderOffset = styled('div')`
	${(props) => ({
		padding: props.theme.spacing(0, 1),
		...props.theme.mixins.toolbar,
	})};
`;
