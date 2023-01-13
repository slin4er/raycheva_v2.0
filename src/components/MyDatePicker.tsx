import { FC } from 'react'
import { IDatePickerProps } from '../helpers/types'
import styled from 'styled-components'

import { Calendar } from './Calendar'

export const MyDatePicker: FC<IDatePickerProps> = ({ dateClickHandler }) => {
	return (
		<Section>
			<H2>Выберите дату</H2>
			<Div>
				<Calendar dateClickHandler={dateClickHandler} />
			</Div>
		</Section>
	)
}

const Section = styled.section`
	width: 400px;
	height: 400px;
	padding: 10px;
`
const H2 = styled.h2`
	text-align: center;
	font-weight: 700;
	font-size: 30px;
	color: #000000;
	margin-bottom: 5px;
`
const Div = styled.div`
	display: flex;
	width: 100%;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
`
