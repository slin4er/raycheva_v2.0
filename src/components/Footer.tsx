import { FC } from 'react'
import styled from 'styled-components'

export const Footer: FC = () => {
	return <Container>Footer</Container>
}

const Container = styled.footer`
	width: 100%;
	height: 100px;
	background: #fff;
	box-shadow: 0 0 0 1px rgba(53, 72, 91, 0.07), 0 2px 2px rgba(0, 0, 0, 0.01),
		0 4px 4px rgba(0, 0, 0, 0.02), 0 10px 8px rgba(0, 0, 0, 0.03),
		0 15px 15px rgba(0, 0, 0, 0.03), 0 30px 30px rgba(0, 0, 0, 0.04),
		0 70px 65px rgba(0, 0, 0, 0.05);
	border-radius: 13px;
	display: flex;
	justify-content: center;
	align-items: center;
`
