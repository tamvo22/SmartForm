import * as React from 'react';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import { Container, Main } from './styled';

interface LayoutDefault {
	children: React.ReactNode;
}

export default function Layout({ children }: LayoutDefault) {
	return (
		<>
			<Container maxWidth={false} disableGutters>
				<Header />
				<Main id='main' role='main'>
					{children}
				</Main>
				<Footer />
			</Container>
		</>
	);
}
