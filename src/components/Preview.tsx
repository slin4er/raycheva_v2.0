import { FC } from 'react'
import styled from 'styled-components'
import { ChristmasTree } from './ChristmasTree'

export const Preview: FC = () => {
	return (
		<PreviewBlock>
			{/* {succesMessage ? (
				<SuccessRegistration>
					<h2>Запись прошла успешно!</h2>
					<div>Ваша запись была оформлена на {resData?.appointment} число!</div>
					<div>При себе обязательно иметь:</div>
					<ol>
						<li>Пеленку</li>
						<li>Перчатки</li>
					</ol>
				</SuccessRegistration>
			) : null} */}
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
