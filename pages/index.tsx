import Layout from '@/com/layout';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ContactForm from '@/com/forms/ContactForm';

function Home() {
	return (
		<Container maxWidth='lg'>
			<Box
				sx={{
					my: 4,
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'center',
				}}>
				<Typography variant='h3' component='h1' gutterBottom>
					Smart Form Example
				</Typography>
				<Typography variant='h4' component='h2' gutterBottom>
					Next.js + React Hook Form + Google reCaptcha
				</Typography>
			</Box>
			<ContactForm title='Contact Form' />
		</Container>
	);
}

export default Home;

Home.getLayout = (page: React.ReactElement) => {
	return <Layout>{page}</Layout>;
};
