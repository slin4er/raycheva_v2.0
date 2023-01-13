import { FC, useEffect } from 'react'
import styled from 'styled-components'
import { MyDatePicker } from './MyDatePicker'
import { Message } from './Message'
import { IDash } from '../helpers/types'

export const Dash: FC<IDash> = ({ dateClickHandler, sucMes, resData }) => {
	return (
		<Container>
			{/* <Message data={resData} /> */}
			<MyDatePicker dateClickHandler={dateClickHandler} />
		</Container>
	)
}

const Container = styled.div`
	width: 100%;
	height: 100%;
	padding: 20px;
	display: flex;
	justify-content: center;
	align-items: center;
`
const Body = styled.div``
