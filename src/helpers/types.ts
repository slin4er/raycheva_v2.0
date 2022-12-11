export interface IColumn {
	classes: string
	date: string
	value: number
}

export interface ICalendarRows {
	[id: number]: IColumn[]
}

interface ITime {
	value: string
	label: string
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

export interface ISelectProps {
	options: any
}

export type IOptions = {
	value: string
	label: string
}
