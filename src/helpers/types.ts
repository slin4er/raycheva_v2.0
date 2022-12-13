export interface IColumn {
	classes: string
	date: string
	value: number
}

export interface ICalendarRows {
	[id: number]: IColumn[]
}

export interface ITime {
	value: string
	label: string
}
export interface IFormInputs {
	name: string
	phone: string
	email?: string
	appointment: string
	time: ITime
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
	successRegistration: (massage: boolean) => void
}

export interface IDatePickerProps {
	dateClickHandler: (date: string) => void
}

export interface ISelectProps {
	options: any
}

export interface IOptions {
	freeHours: string[]
}
