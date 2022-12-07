import { FC, SetStateAction, useState } from 'react'
import Select from 'react-select'
import { ISelectProps, IOptions } from '../helpers/types'

// const options = [
// 	{ value: 'chocolate', label: 'Chocolate' },
// 	{ value: 'strawberry', label: 'Strawberry' },
// 	{ value: 'vanilla', label: 'Vanilla' },
// ]

export const SelectTime: FC<ISelectProps> = ({ times }) => {
	const options = times?.map(time => {
		return {
			value: time,
			label: time,
		}
	})

	const [currentTime, setCurrentTime] = useState()

	const getValue = () =>
		currentTime ? options?.find(t => t.value === currentTime) : ''
	const onChange = (newValue: any) => {
		setCurrentTime(newValue.value)
	}

	return (
		<div>
			<Select
				options={options}
				placeholder='Выберите время'
				value={getValue()}
				onChange={onChange}
			/>
		</div>
	)
}
