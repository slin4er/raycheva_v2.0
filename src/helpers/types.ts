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
	responseData: (data: IResData) => void
}

export interface IDisDateMassive {
	date: string
}

export interface IDatePickerProps {
	dateClickHandler: (date: string) => void
	disabledDatesMassive: IDisDateMassive[] | string
}
export interface ICalendarProps {
	dateClickHandler: (date: string) => void
	dates: IDisDateMassive[] | string
}

export interface ISelectProps {
	options: any
}

export interface IOptions {
	freeHours: string[]
}

export type IItem = {
	appointment: string
	email?: string
	name: string
	phone: string
	time: string
	_id: string
}

export type IItemProps = {
	appointment: string
	email?: string
	name: string
	phone: string
	time: string
	_id: string
	handleDetail: (id: string) => void
	handleDelete: (id: string) => void
}

export interface ILayout {
	dateClickHandler: (date: string) => void
	sucMes?: boolean
	resData?: IResData
}
export interface IDash {
	dateClickHandler: (date: string) => void
	sucMes?: boolean
	resData?: IResData
}

export interface IPropPreview {
	message?: boolean
	data?: IResData
}
export interface IPropMessage {
	message?: boolean
	data?: IResData
}
