import { FC, useEffect } from 'react'
import styled from 'styled-components'
import { DatePicker } from './DatePicker'
import { Preview } from './Preview'
import { Footer } from './Footer'
import { ILayout } from '../helpers/types'

export const Layout: FC<ILayout> = ({ dateClickHandler, sucMes, resData }) => {
	useEffect(() => {
		window.scrollTo(0, 0)
	}, [])
	return (
		<Main>
			<Preview message={sucMes} data={resData} />
			<DatePicker dateClickHandler={dateClickHandler} />
			<Footer />
		</Main>
	)
}

const Main = styled.main``
