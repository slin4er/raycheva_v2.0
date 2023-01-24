import { FC } from 'react'
import styled from 'styled-components'
import { IFlex } from '../helpers/styleTypes'

export const Flex: FC = props => {
	return <StyledFlex {...props} />
}

const StyledFlex = styled.div<IFlex>`
	display: flex;
	justify-content: ${({ justify }) => justify || 'flex-start'};
	flex-direction: ${({ direction }) => direction || 'rows'};
	align-items: ${({ align }) => align || 'stretch'};
	padding: ${({ padding }) => padding || '0'};
	width: ${({ width }) => width || ''};
	height: ${({ height }) => height || ''};
	background: ${({ bg }) => bg || ''};
	position: ${({ position }) => position || 'relative'};
`
