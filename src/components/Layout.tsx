import { FC, useEffect } from 'react'
import styled from 'styled-components'
import { Header } from './Header'
import { Message } from './Message'
import { Preview } from './Preview'
import { ILayout } from '../helpers/types'
import { Outlet } from 'react-router-dom'
import { Footer } from './Footer'

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
			<Footer />
		</Container>
	)
}

const Container = styled.div`
	min-height: 100vh;
	width: 100vw;
	padding: 30px;
	background: #cfd7dd;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
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
