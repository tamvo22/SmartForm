import { PaletteMode } from '@mui/material';

export default function MuiButton(mode: PaletteMode) {
	return {
		variants: [],
		defaultProps: {
			variant: 'contained',
		},
		styleOverrides: {
			contained: {
				padding: '20px 100px !important',
			},
		},
	};
}
