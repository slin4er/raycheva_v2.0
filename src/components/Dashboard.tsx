import { FC, useEffect } from 'react'
import styled from 'styled-components'
import { DatePicker } from './DatePicker'
import { Message } from './Message'
import { IDash } from '../helpers/types'

export const Dash: FC<IDash> = ({ dateClickHandler, sucMes, resData }) => {
	return (
		<Container>
			<Body>
				{/* <Message data={resData} /> */}
				<DatePicker dateClickHandler={dateClickHandler} />
			</Body>
		</Container>
	)
}

const Container = styled.div``
const Body = styled.div``
