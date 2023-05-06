import { FC } from 'react'
import { IDatePickerProps } from '../helpers/types'
import styled from 'styled-components'

import { Calendar } from './Calendar'

export const MyDatePicker: FC<IDatePickerProps> = ({ dateClickHandler }) => {
	return (
		<Container>
			<H2>Выберите дату</H2>
			<Div>
				<Calendar dateClickHandler={dateClickHandler} />
			</Div>
		</Container>
	)
}

const Container = styled.div`
	width: 700px;
	height: 460px;
	background: white;
	border-radius: 13px;
	box-shadow: 0 0 0 1px rgba(53, 72, 91, 0.07), 0 2px 2px rgba(0, 0, 0, 0.01),
		0 4px 4px rgba(0, 0, 0, 0.02), 0 10px 8px rgba(0, 0, 0, 0.03),
		0 15px 15px rgba(0, 0, 0, 0.03), 0 30px 30px rgba(0, 0, 0, 0.04),
		0 70px 65px rgba(0, 0, 0, 0.05);
`
const H2 = styled.h2`
	text-align: center;
	font-weight: 700;
	font-size: 30px;
	color: #000000;
	margin-top: 20px;
	margin-bottom: 5px;
`
const Div = styled.div`
	display: flex;
	width: 100%;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	padding: 10px;
`
