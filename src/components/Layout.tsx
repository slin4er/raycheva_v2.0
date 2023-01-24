import { FC, useEffect } from 'react'
import styled from 'styled-components'
import { MyDatePicker } from './MyDatePicker'
import { Header } from './Header'
import { Message } from './Message'
import { Preview } from './Preview'
import { ILayout } from '../helpers/types'
import { Outlet } from 'react-router-dom'

export const Layout: FC<ILayout> = ({ dateClickHandler, sucMes, resData }) => {
	return (
		<Container>
			<Header />
			<Main>
				<Preview message={sucMes} data={resData} />
				{/* <Message data={resData} /> 
				<MyDatePicker dateClickHandler={dateClickHandler} />*/}
				<Outlet />
			</Main>
		</Container>
	)
}

const Container = styled.div`
	height: 100vh;
	width: 100vw;
	padding: 30px;
	background: linear-gradient(#e7ebee, #77a6ca);
`
const Main = styled.main`
	display: flex;
	width: 1500px;
	height: 500px;
`
