import { FC, useState, useEffect } from 'react'
import styled from 'styled-components'
import { ReactComponent as LockSVG } from '../assets/loc.svg'
import { ReactComponent as TelSVG } from '../assets/viber.svg'
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
			<Info>
				Я специалист в области гинекологии, здесь Вы можете записаться ко мне на
				прием.
			</Info>
			<Contact>
				<Title>Дополнительная информация</Title>
				<Block>
					<Flex>
						<LockBlock>
							<LockSVG />
						</LockBlock>
						<Location>г.Бендеры, ул. Протягайловская 4</Location>
					</Flex>
					<Flex>
						<TelBlock>
							<TelSVG />
						</TelBlock>
						<Tel>+373(777)24-634</Tel>
					</Flex>
				</Block>
			</Contact>
		</PreviewBlock>
	)
}

const PreviewBlock = styled.section`
	width: 700px;
	height: 500px;
	padding: 50px 20px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
`
const Info = styled.div`
	font-style: italic;
	padding: 40px 15px;
	font-size: 23px;
	line-height: 33px;
	color: #000000;
	font-weight: 300;
	background: white;
	border-radius: 13px;
	width: 100%;
	height: 150px;
	box-shadow: 0 0 0 1px rgba(53, 72, 91, 0.07), 0 2px 2px rgba(0, 0, 0, 0.01),
		0 4px 4px rgba(0, 0, 0, 0.02), 0 10px 8px rgba(0, 0, 0, 0.03),
		0 15px 15px rgba(0, 0, 0, 0.03), 0 30px 30px rgba(0, 0, 0, 0.04),
		0 70px 65px rgba(0, 0, 0, 0.05);
`
const Contact = styled.div``

const Title = styled.h2`
	font-style: italic;
	font-weight: 700;
	font-size: 28px;
	letter-spacing: 0.03em;
	color: #000000;
`
const Block = styled.div`
	margin-top: 10px;
	padding: 15px;
	height: 150px;
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: flex-start;
	background: white;
	border-radius: 13px;
	box-shadow: 0 0 0 1px rgba(53, 72, 91, 0.07), 0 2px 2px rgba(0, 0, 0, 0.01),
		0 4px 4px rgba(0, 0, 0, 0.02), 0 10px 8px rgba(0, 0, 0, 0.03),
		0 15px 15px rgba(0, 0, 0, 0.03), 0 30px 30px rgba(0, 0, 0, 0.04),
		0 70px 65px rgba(0, 0, 0, 0.05);
`

const LockBlock = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 40px;
	height: 40px;
	background: #77a6ca;
	border-radius: 6px;
`
const Flex = styled.div`
	display: flex;
`
const TelBlock = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 40px;
	height: 40px;
	background: #77a6ca;
	border-radius: 6px;
`
const Location = styled.div`
	font-style: italic;
	padding-left: 10px;
	font-weight: 500;
	font-size: 20px;
	line-height: 40px;
	letter-spacing: 0.03em;
	color: #000000;
`
const Tel = styled.span`
	font-style: italic;
	padding-left: 10px;
	font-weight: 500;
	font-size: 20px;
	line-height: 40px;
	letter-spacing: 0.03em;
	color: #000000;
`
