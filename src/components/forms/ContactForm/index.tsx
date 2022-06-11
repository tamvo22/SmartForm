import { useCallback } from 'react';
import SmartForm, { Data } from '@/com/forms/SmartForm';
import toast from 'react-hot-toast';
import { Container, Title, Paper } from './styled';
import { GridContainer, GridItem, InputLabel, TextField, Email } from '@/com/forms/fields';
import InputAdornment from '@mui/material/InputAdornment';
import Typography from '@mui/material/Typography';
import PersonIcon from '@mui/icons-material/Person';

interface ContactFormProps {
	title: string | JSX.Element;
}
function ContactForm(props: ContactFormProps) {
	const { title } = props;

	const handleOnSubmit = useCallback(async (data: Data) => {
		// Send form data to email service such has SendGrid or SendInBlue

		console.log('data: ', data);
		toast.success('Thank you for your email.');
	}, []);

	return (
		<Container maxWidth={false} disableGutters>
			<Paper elevation={4}>
				<Title>
					<Typography variant='h3' component='h2' gutterBottom>
						{title}
					</Typography>
				</Title>
				<SmartForm submitLabel='Send' onSubmit={handleOnSubmit}>
					<GridContainer>
						<GridItem md={6}>
							<InputLabel name='name' required>
								Name
							</InputLabel>
							<TextField
								name='name'
								required
								fullWidth
								placeholder='Your Name'
								startAdornment={
									<InputAdornment position='end'>
										<PersonIcon color={'primary'} />
									</InputAdornment>
								}
							/>
						</GridItem>
						<GridItem md={6}>
							<InputLabel name='email' required>
								Email Address
							</InputLabel>
							<Email name='email' startIcon required fullWidth placeholder='Your Email' />
						</GridItem>
						<GridItem md={12}>
							<InputLabel name='message' required>
								Message
							</InputLabel>
							<TextField name='message' required multiline minRows={6} fullWidth placeholder='Your Message' />
						</GridItem>
					</GridContainer>
				</SmartForm>
			</Paper>
		</Container>
	);
}

export default ContactForm;
