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
			<Text show={show}>{text}</Text>
			<HOC
				{...rest}
				onMouseEnter={() => setShow(true)}
				onMouseLeave={() => setShow(false)}
			>
				{children}
			</HOC>
		</>
	)
}

const Text = styled.div.attrs((props: { show: boolean }) => props)`
	visibility: ${props => (props.show ? 'visible' : 'hidden')};
`
const HOC = styled.div``
