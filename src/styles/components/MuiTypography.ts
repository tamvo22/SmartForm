import { PaletteMode } from '@mui/material';

export default function MuiTypography(mode: PaletteMode) {
	return {
		variants: [],
		defaultProps: {},
		styleOverrides: {
			root: {
				color: mode === 'dark' ? '#fff' : '#3c3c3c',
			},
		},
	};
}
