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
											<BtnTd>{col.value}</BtnTd>
										</Td>
									) : (
										<Td
											key={col.date}
											className={col.classes}
											onClick={() => dateClickHandler(col.date)}
										>
											<BtnTd>{col.value}</BtnTd>
										</Td>
									)
								)}
							</Tr>
						)
					})}
				</TBody>
			</Table>

			<BtnBlock>
				<BtnPrev className='button' onClick={getPrevMonth}>
					Назад
				</BtnPrev>
				<BtnNext className='button' onClick={getNextMonth}>
					Вперед
				</BtnNext>
			</BtnBlock>
		</>
	)
}

const P = styled.p`
	font-weight: 500;
	font-style: italic;
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
	padding: 18px;
	padding-top: 12px;
	padding-bottom: 12px;
	text-align: left;
	background-color: #77a6ca;
	color: white;
`
const TBody = styled.tbody``
const Td = styled.td`
	border: 1px solid #ddd;
	cursor: pointer;
	height: 30px;
`
const Tr = styled.tr``

const BtnBlock = styled.div`
	margin-top: 5px;
	width: 100%;
	padding: 0 110px;
	display: flex;
	justify-content: space-between;
	align-items: center;
`
const BtnTd = styled.button`
	width: 100%;
	height: 100%;
	cursor: pointer;
	background: inherit;
	border: none;
	color: inherit;
	font-size: 15px;
	font-weight: 500;
	&:hover {
		background: #77a6ca;
		color: #fff;
	}
`
const BtnPrev = styled.button`
	width: 70px;
	height: 30px;
	border: 2px solid #77a6ca;
	border-radius: 4px;
	color: #000;
	font-weight: 500;
	cursor: pointer;
	&:hover {
		color: #fff;
		background: #77a6ca;
	}
`
const BtnNext = styled.button`
	width: 70px;
	height: 30px;
	border: 2px solid #77a6ca;
	border-radius: 4px;
	color: #000;
	font-weight: 500;
	cursor: pointer;
	&:hover {
		color: #fff;
		background: #77a6ca;
	}
`
