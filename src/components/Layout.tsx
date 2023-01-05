import { FC, useEffect } from 'react'
import styled from 'styled-components'
import { DatePicker } from './DatePicker'
import { Header } from './Header'
import { Message } from './Message'
import { Preview } from './Preview'
import { ILayout } from '../helpers/types'

export const Layout: FC<ILayout> = ({ dateClickHandler, sucMes, resData }) => {
	useEffect(() => {
		window.scrollTo(0, 0)
	}, [])
	return (
		<Container>
			<Header />
			<Main>
				<Preview message={sucMes} data={resData} />
				{/* <Message data={resData} /> */}
				<DatePicker dateClickHandler={dateClickHandler} />
			</Main>
		</Container>
	)
}

const Container = styled.div`
	height: 100vh;
	width: 100vw;
	padding: 50px 80px 75px 80px;
	background: linear-gradient(#e7ebee, #77a6ca);
`
const Main = styled.main`
	display: grid;
	grid-template-columns: 1fr 1fr;
`
