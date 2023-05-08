import { FC } from 'react'
import styled from 'styled-components'

export const Header: FC = () => {
	return (
		<HeaderBlock>
			<div>
				<Label>Райчева Эвелина Николаевна</Label>
				<HR />
			</div>
		</HeaderBlock>
	)
}

const HeaderBlock = styled.header`
	display: flex;
	align-items: center;
	position: relative;
	width: 100%;
	height: 60px;
	padding-left: 21px;
`
const Label = styled.span`
	font-style: italic;
	font-weight: 500;
	font-size: 25px;
	line-height: 25px;
	letter-spacing: 0.02em;
	color: #000000;
	position: relative;
	z-index: 1;
	&:before {
		content: '';
		width: 50px;
		height: 50px;
		border-radius: 100%;
		position: absolute;
		top: -12px;
		left: -21px;
		background: white;
		z-index: -1;
		box-shadow: 0 0 0 1px rgba(53, 72, 91, 0.07), 0 2px 2px rgba(0, 0, 0, 0.01),
			0 4px 4px rgba(0, 0, 0, 0.02), 0 10px 8px rgba(0, 0, 0, 0.03),
			0 15px 15px rgba(0, 0, 0, 0.03), 0 30px 30px rgba(0, 0, 0, 0.04),
			0 70px 65px rgba(0, 0, 0, 0.05);
	}
`
const HR = styled.hr`
	width: 365px;
	height: 3px;
	background: white;
	border: none;
	box-shadow: 0 0 0 1px rgba(53, 72, 91, 0.07), 0 2px 2px rgba(0, 0, 0, 0.01),
		0 4px 4px rgba(0, 0, 0, 0.02), 0 10px 8px rgba(0, 0, 0, 0.03),
		0 15px 15px rgba(0, 0, 0, 0.03), 0 30px 30px rgba(0, 0, 0, 0.04),
		0 70px 65px rgba(0, 0, 0, 0.05);
`
