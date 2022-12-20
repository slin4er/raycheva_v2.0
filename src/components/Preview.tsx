import { FC, useState, useEffect } from 'react'
import styled from 'styled-components'
import { ChristmasTree } from './ChristmasTree'
import { IPropPreview } from '../helpers/types'

export const Preview: FC<IPropPreview> = ({ message, data }) => {
	const [mes, setMes] = useState<boolean>()
	useEffect(() => {
		if (message) {
			setMes(message)
			const timer = setTimeout(() => {
				setMes(false)
			}, 5000)
			return () => {
				clearTimeout(timer)
			}
		} else {
			setMes(false)
		}
	}, [message])
	return (
		<PreviewBlock>
			{mes ? (
				<div>
					<h2>Запись прошла успешно!</h2>
					<div>Ваша запись была оформлена на {data?.appointment} число!</div>
					<div>При себе обязательно иметь:</div>
					<ol>
						<li>Пеленку</li>
						<li>Перчатки</li>
					</ol>
				</div>
			) : null}
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
