export interface IColumn {
	classes: string
	date: string
	value: number
}

export interface ICalendarRows {
	[id: number]: IColumn[]
}

export interface IFormInputs {
	name: string
	phone: string
	email?: string
	appointment: string
	time: string
	checkbox?: boolean
}

export interface IResData {
	name: string
	phone: string
	email?: string
	appointment: string
	time: string
	_id: string
}

export interface IFormRegistrationProps {
	date?: string
}

export interface IDatePickerProps {
	dateClickHandler: (date: string) => void
}
