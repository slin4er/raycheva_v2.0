import { FC } from 'react'
import styled from 'styled-components'
import { IColumn, ICalendarProps } from '../helpers/types'
import useCalendar from '../hooks/useCalendar'
import { ReactComponent as SVGChevronRight } from '../assets/chevron-right.svg'
import { ReactComponent as SVGChevronLeft } from '../assets/chevron-left.svg'
import './Calendar.css'

export const Calendar: FC<ICalendarProps> = ({ dateClickHandler, dates }) => {
	const {
		calendarRows,
		selectedDate,
		todayFormatted,
		daysShort,
		monthNames,
		getNextMonth,
		getPrevMonth,
	} = useCalendar()

	console.log('я дошел', dates)

	console.log('calendarRows', calendarRows)

	return (
		<>
			<Header>
				<BtnPrev className='button' onClick={getPrevMonth}>
					<SVGChevronLeft />
				</BtnPrev>
				<P>
					Месяц:{' '}
					{`${
						monthNames[selectedDate.getMonth()]
					}, год - ${selectedDate.getFullYear()}`}
				</P>
				<BtnNext className='button' onClick={getNextMonth}>
					<SVGChevronRight />
				</BtnNext>
			</Header>

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
						// if (Array.isArray(dates)) {
						// 	const newAr = cols.map(col =>
						// 		dates.map(
						// 			item =>
						// 				new Date(item.date).toString() ===
						// 				new Date(col.date).toString()
						// 		)
						// 	)
						// 	console.log(newAr)
						// }
						return (
							<Tr key={cols[0].date}>
								{cols.map(col =>
									col.date === todayFormatted ? (
										<Td
											key={col.date}
											className={`${col.classes} today`}
											onClick={() => dateClickHandler(col.date)}
										>
											<BtnTd disabled>{col.value}</BtnTd>
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
		</>
	)
}

const P = styled.div`
	font-weight: 500;
	font-style: italic;
	font-size: 20px;
	line-height: 40px;
	letter-spacing: 0.03em;
	color: #000000;
`
const Table = styled.table`
	border-collapse: separate;
	width: 100%;
	border-spacing: 20px 4px;
`
const THead = styled.thead``
const Th = styled.th`
	border-bottom: 1px solid #ddd;
	color: #000000;
	font-weight: 500;
`
const TBody = styled.tbody``
const Td = styled.td`
	border: none;
	cursor: pointer;
	height: 30px;
`
const Tr = styled.tr``

const Header = styled.header`
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	margin: 30px 0;
`
const BtnTd = styled.button`
	width: 100%;
	height: 100%;
	cursor: pointer;
	background: inherit;
	border-radius: 6px;
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
	width: 40px;
	height: 40px;
	font-weight: 500;
	border: none;
	background: none;
	cursor: pointer;
`
const BtnNext = styled.button`
	width: 40px;
	height: 40px;
	font-weight: 500;
	border: none;
	background: none;
	cursor: pointer;
`
