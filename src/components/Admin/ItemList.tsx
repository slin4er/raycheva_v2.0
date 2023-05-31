import { FC } from 'react'
import { IItemProps } from '../../helpers/types'
import styled from 'styled-components'

export const ItemList: FC<IItemProps> = ({
	appointment,
	name,
	time,
	_id,
	handleDetail,
	handleDelete,
}) => {
	return (
		<Patients>
			<Name>{name}</Name>
			<div>{appointment}</div>
			<div> {time}</div>
			<ButtonDel onClick={() => handleDetail(_id)}>Детально</ButtonDel>
			<ButtonDel onClick={() => handleDelete(_id)}>Удалить</ButtonDel>
		</Patients>
	)
}

const Patients = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	border: 1px solid #77a6ca;
	border-radius: 13px;
	position: relative;
	padding: 15px;
	box-shadow: 0 0 0 1px rgba(53, 72, 91, 0.07), 0 2px 2px rgba(0, 0, 0, 0.01),
		0 4px 4px rgba(0, 0, 0, 0.02), 0 10px 8px rgba(0, 0, 0, 0.03),
		0 15px 15px rgba(0, 0, 0, 0.03), 0 30px 30px rgba(0, 0, 0, 0.04),
		0 70px 65px rgba(0, 0, 0, 0.05);
`
const Name = styled.div`
	font-size: 20px;
	font-weight: 500;
`
const ButtonDel = styled.button`
	font-size: 13px;
	width: 70px;
	height: 25px;
	border: none;
	padding: 0;
	outline: none;
	border-radius: 6px;
	font-weight: 500;
	color: #fff;
	cursor: pointer;
	background: #77a6ca;
	&:hover {
		background: #77a6ca;
	}
`
