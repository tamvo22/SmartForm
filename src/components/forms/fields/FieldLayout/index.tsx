import { Container, Grid } from './styled';
import { GridProps } from '@mui/material/Grid';

export const GridContainer = (props: GridProps) => {
	const { spacing = 0, children } = props;
	return (
		<Container container spacing={spacing}>
			{children}
		</Container>
	);
};

export const GridItem = (props: GridProps) => {
	const { xs = 12, sm = 12, md = 12, children, ...rest } = props;

	return (
		<Grid xs={xs} sm={sm} md={md} item {...rest}>
			{children}
		</Grid>
	);
};
