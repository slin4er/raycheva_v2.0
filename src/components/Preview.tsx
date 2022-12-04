import { FC } from 'react'
import styled from 'styled-components'
import { ChristmasTree } from './ChristmasTree'

export const Preview: FC = () => {
	return (
		<PreviewBlock>
			<ChristmasTree />
		</PreviewBlock>
	)
}

const PreviewBlock = styled.div`
	display: flex;
	height: 100vh;
	align-items: center;
	justify-content: center;
	background-color: #16323d;
`
