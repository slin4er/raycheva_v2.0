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
				<Dash>
					<Outlet />
				</Dash>
			</Main>
		</Container>
	)
}

const Container = styled.div`
	height: 100vh;
	width: 100vw;
	padding: 30px;
	background: #cfd7dd;
`
const Main = styled.main`
	display: flex;
	height: 500px;
	width: 100%;
	justify-content: space-around;
`
const Dash = styled.section`
	display: flex;
	align-items: center;
`
