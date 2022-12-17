import { FC } from 'react'
import { IItemProps } from '../../helpers/types'
import styled from 'styled-components'

export const ItemList: FC<IItemProps> = ({
	appointment,
	email,
	name,
	phone,
	time,
	_id,
	handleDetail,
}) => {
	return (
		<Patients onClick={() => handleDetail(_id)}>
			<div>{name}</div>
			<div>{phone}</div>
			<div>{email}</div>
			<div>{appointment}</div>
			<div>{time}</div>
		</Patients>
	)
}

const Patients = styled.div`
	border: 2px solid black;
	padding: 10px;
`
