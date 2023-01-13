import { FC } from 'react'
import styled from 'styled-components'
import { IColumn, IDatePickerProps } from '../helpers/types'
import useCalendar from '../hooks/useCalendar'
import './Calendar.css'

export const Calendar: FC<IDatePickerProps> = ({ dateClickHandler }) => {
	const {
		calendarRows,
		selectedDate,
		todayFormatted,
		daysShort,
		monthNames,
		getNextMonth,
		getPrevMonth,
	} = useCalendar()

	return (
		<>
			<P>
				Месяц:{' '}
				{`${
					monthNames[selectedDate.getMonth()]
				}, год - ${selectedDate.getFullYear()}`}
			</P>
			<Table className='table'>
				<THead>
					<Tr>
						{daysShort.map(day => (
							<Th key={day}>{day}</Th>
						))}
					</Tr>
				</THead>
				<TBody>
					{Object.values(calendarRows).map((cols: IColumn[]) => {
						return (
							<Tr key={cols[0].date}>
								{cols.map(col =>
									col.date === todayFormatted ? (
										<Td
											key={col.date}
											className={`${col.classes} today`}
											onClick={() => dateClickHandler(col.date)}
										>
											<button>{col.value}</button>
										</Td>
									) : (
										<Td
											key={col.date}
											className={col.classes}
											onClick={() => dateClickHandler(col.date)}
										>
											<button>{col.value}</button>
										</Td>
									)
								)}
							</Tr>
						)
					})}
				</TBody>
			</Table>

			<BtnPrev className='button' onClick={getPrevMonth}>
				Назад
			</BtnPrev>
			<BtnNext className='button' onClick={getNextMonth}>
				Вперед
			</BtnNext>
		</>
	)
}

const P = styled.p`
	font-weight: 500;
	font-size: 20px;
	line-height: 40px;
	letter-spacing: 0.03em;
	color: #000000;
`
const Table = styled.table`
	border-collapse: collapse;
	width: 100%;
`
const THead = styled.thead``
const Th = styled.th`
	border: 1px solid #ddd;
	padding: 8px;
	padding-top: 12px;
	padding-bottom: 12px;
	text-align: left;
	background-color: #04aa6d;
	color: white;
`
const TBody = styled.tbody``
const Td = styled.td`
	border: 1px solid #ddd;
	padding: 8px;
`
const Tr = styled.tr`
	cursor: pointer;
	:nth-child(even) {
		background-color: #f2f2f2;
	}
	:hover {
		background-color: #ddd;
	}
`
const BtnPrev = styled.button``
const BtnNext = styled.button``
