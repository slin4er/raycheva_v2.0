import { FC } from 'react'
import styled from 'styled-components'

export const Header: FC = () => {
	return (
		<HeaderBlock>
			<Label>Райчева Эвелина Николаевна</Label>
		</HeaderBlock>
	)
}

const HeaderBlock = styled.header`
	display: flex;
	position: relative;
	width: 100%;
	height: 60px;
	padding-left: 21px;
`
const Label = styled.span`
	font-weight: 500;
	font-size: 25px;
	line-height: 25px;
	letter-spacing: 0.02em;
	color: #000000;
	position: relative;
	z-index: 1;
	:before {
		content: '';
		width: 50px;
		height: 50px;
		border-radius: 100%;
		position: absolute;
		top: -12px;
		left: -21px;
		background: #77a6ca;
		z-index: -1;
	}
`
