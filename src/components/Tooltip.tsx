import { FC, useState } from 'react'
import styled from 'styled-components'

interface ITooltip {
	children: JSX.Element
	text: string
}
export const Tooltip: FC<ITooltip> = ({ children, text, ...rest }) => {
	const [show, setShow] = useState(false)

	return (
		<>
			<HOC
				{...rest}
				onMouseEnter={() => setShow(true)}
				onMouseLeave={() => setShow(false)}
			>
				{children} <Text show={show}>{text}</Text>
			</HOC>
		</>
	)
}

const Text = styled.div.attrs((props: { show: boolean }) => props)`
	visibility: ${props => (props.show ? 'visible' : 'hidden')};
	font-weight: 500;
	font-size: 13px;
	color: #707070;
`
const HOC = styled.div`
	display: flex;
`
