import { Fragment, FC } from 'react';
import { IColumn, IDatePickerProps } from '../helpers/types'
import useCalendar from '../hooks/useCalendar'

export const Calendar: FC<IDatePickerProps> = ({dateClickHandler}) => {
  const { calendarRows, selectedDate, todayFormatted, daysShort, monthNames, getNextMonth, getPrevMonth } = useCalendar();

  return(
    <Fragment>
      <p>Месяц: {`${monthNames[selectedDate.getMonth()]}, год - ${selectedDate.getFullYear()}`}</p>
      <table className="table">
        <thead>
          <tr>
            {daysShort.map(day => (
              <th key={day}>{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {
            Object.values(calendarRows).map((cols: IColumn[]) => {
              return <tr key={cols[0].date}>
                {cols.map(col => (
                  col.date === todayFormatted
                    ? <td key={col.date} className={`${col.classes} today`} onClick={() => dateClickHandler(col.date)}>
                      {col.value}
                    </td>
                    : <td key={col.date} className={col.classes} onClick={() => dateClickHandler(col.date)}>{col.value}</td>
                ))}
              </tr>
            })
          }
        </tbody>
      </table>

      <button className="button" onClick={getPrevMonth}>Назад</button>
      <button className="button" onClick={getNextMonth}>Вперед</button>
    </Fragment>
  );
}