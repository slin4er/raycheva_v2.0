export interface IColumn {
    classes: string;
    date: string;
    value: number;
}

export interface ICalendarRows {
    [id: number]: IColumn[]
}

export interface IFormInputs {
	name: string,
	surname: string,
    phone: string,
	email: string,
    time: string,
	checkbox?: boolean
}

export interface IFormRegistrationProps {
    date?: string
}

export interface IDatePickerProps {
    dateClickHandler: (date: string) => void
}