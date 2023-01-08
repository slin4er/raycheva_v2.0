import { FC, useEffect } from 'react'
import styled from 'styled-components'
import { DatePicker } from './DatePicker'
import { Header } from './Header'
import { Message } from './Message'
import { Preview } from './Preview'
import { ILayout } from '../helpers/types'
import { Outlet } from 'react-router-dom'

export const Layout: FC<ILayout> = ({ dateClickHandler, sucMes, resData }) => {
	return (
		<Container>
			<Header />
			<Wrapper>
				<Preview message={sucMes} data={resData} />
				<Main>
					{/* <Message data={resData} /> 
				<DatePicker dateClickHandler={dateClickHandler} />*/}
					<Outlet />
				</Main>
			</Wrapper>
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
	width: 1300px;
`
const Wrapper = styled.div`
	display: flex;
`
