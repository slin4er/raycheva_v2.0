import { FC, forwardRef } from 'react'
import { UseFormRegister } from 'react-hook-form'
import { IFormInputs } from '../helpers/types'
import styled from 'styled-components'

//@ts-ignore
export const Select: FC = forwardRef<
	HTMLSelectElement,
	{ label: string } & ReturnType<UseFormRegister<IFormInputs>>
>(({ onChange, onBlur, name, label }, ref) => (
	<>
		<label>{label}</label>
		<select name={name} ref={ref} onChange={onChange} onBlur={onBlur}>
			<option value='20'>9:00</option>
			<option value='30'>10:00</option>
		</select>
	</>
))

const Label = styled.label`
	font-weight: 500;
	font-size: 14px;
	color: #707070;
`
