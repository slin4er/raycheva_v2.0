import { FC } from 'react'
import styled from 'styled-components'
import { IPropMessage } from '../helpers/types'

export const Message: FC<IPropMessage> = ({ data }) => {
	return (
		<SuccesMessage>
			<SuccesMessageTitle>Запись прошла успешно!</SuccesMessageTitle>
			<SuccesMessageDate>
				Ваша запись была оформлена на
				<SuccesMessageTime>{data?.appointment}</SuccesMessageTime> число!
			</SuccesMessageDate>
			<SuccesMessageRequire>При себе обязательно иметь:</SuccesMessageRequire>
			<Ol>
				<Li>Пеленку</Li>
				<Li>Перчатки</Li>
			</Ol>
		</SuccesMessage>
	)
}

const SuccesMessage = styled.div`
	width: 40%;
	padding: 15px;
`
const SuccesMessageTitle = styled.div``
const SuccesMessageDate = styled.div``
const SuccesMessageTime = styled.span``
const SuccesMessageRequire = styled.div``
const Ol = styled.ol`
	padding-left: 15px;
`
const Li = styled.li``
