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
				Здравствуйте, меня зовут <br />
				<Name>Райчева Эвелина Николаевна.</Name> <br />Я специалист в области
				гинекологии, здесь вы можете записаться ко мне на прием.
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
	height: 100%;
	width: 80%;
	/* height: 575px; */
	padding: 20px;
	border-radius: 13px;
	border: 2px solid #77a7ca;
	background: #77a7ca;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
`

const Name = styled.span`
	margin-top: 10px;
	margin-bottom: 10px;
	font-weight: 300;
	font-size: 60px;
	line-height: 70px;
	color: #000000;
`

const Info = styled.div`
	font-size: 26px;
	line-height: 33px;
	color: #000000;
	font-weight: 300;
`
const Contact = styled.div`
	margin-top: 33px;
`

const Title = styled.h2`
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
	background: #cfd7dd;
	border-radius: 13px;
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
	padding-left: 10px;
	font-weight: 500;
	font-size: 20px;
	line-height: 40px;
	letter-spacing: 0.03em;
	color: #000000;
`
const Tel = styled.span`
	padding-left: 10px;
	font-weight: 500;
	font-size: 20px;
	line-height: 40px;
	letter-spacing: 0.03em;
	color: #000000;
`
