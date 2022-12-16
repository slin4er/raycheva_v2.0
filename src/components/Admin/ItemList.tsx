import { FC } from 'react'
import { IItemProp } from '../../helpers/types'
import styled from 'styled-components'

export const ItemList: FC<IItemProp> = ({
	appointment,
	email,
	name,
	phone,
	time,
	_id,
	editItem,
	deleteItem,
}) => {
	return (
		<Patients>
			<div>{name}</div>
			<div>{phone}</div>
			<div>{email}</div>
			<div>{appointment}</div>
			<div>{time}</div>
			<button onClick={() => editItem(_id)}>редактировать</button>
			<button onClick={() => deleteItem(_id)}>удалить</button>
		</Patients>
	)
}

const Patients = styled.div`
	border: 2px solid black;
	padding: 10px;
`
