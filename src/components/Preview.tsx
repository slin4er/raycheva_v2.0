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
			<Header>
				<Label>Райчева Эвелина Николаевна</Label>
				<Line></Line>
			</Header>
			<About>
				<AboutBlock>
					<Info>
						Здравствуйте, меня зовут
						<br /> <Name>Райчева Эвелина Николаевна.</Name> <br />Я специалист в
						области гинекологии, <br />
						здесь вы можете записаться ко мне на прием
					</Info>
					<Button>Записаться на прием</Button>
				</AboutBlock>

				<SuccesMessage>
					<SuccesMessageTitle>Запись прошла успешно!</SuccesMessageTitle>
					<SuccesMessageDate>
						Ваша запись была оформлена на
						<SuccesMessageTime>{data?.appointment}</SuccesMessageTime> число!
					</SuccesMessageDate>
					<SuccesMessageRequire>
						При себе обязательно иметь:
					</SuccesMessageRequire>
					<Ol>
						<Li>Пеленку</Li>
						<Li>Перчатки</Li>
					</Ol>
				</SuccesMessage>
			</About>
			<Contact>
				<Title>Дополнительная информация</Title>
				<Block>
					<Location>г.Бендеры, ул. Протягайловская 4</Location>
					<Tel>+373(777)24-634</Tel>
				</Block>
			</Contact>
			{/* <ChristmasTree /> */}
		</PreviewBlock>
	)
}

const PreviewBlock = styled.section`
	height: 100vh;
	width: 100%;
	padding: 50px 80px 75px 80px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: flex-start;
	background: linear-gradient(#e7ebee, #77a6ca);
`
const Header = styled.header`
	display: flex;
	position: relative;
`
const Line = styled.hr`
	position: absolute;
	left: -20px;
	bottom: -32px;
	width: 130px;
	height: 5px;
	border: none;
	border-radius: 3px;
	background: #77a6ca;
`
const Label = styled.span`
	font-weight: 500;
	font-size: 25px;
	line-height: 25px;
	letter-spacing: 0.02em;
	color: #000000;
	position: relative;
	z-index: 1;
	:before {
		content: '';
		width: 50px;
		height: 50px;
		border-radius: 100%;
		position: absolute;
		top: -12px;
		left: -21px;
		background: #77a6ca;
		z-index: -1;
	}
`
const About = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: flex-start;
`
const AboutBlock = styled.div`
	width: 40%;
	padding: 15px;
`
const Name = styled.span`
	margin-top: 10px;
	margin-bottom: 10px;
	font-weight: 300;
	font-size: 60px;
	line-height: 70px;
	color: #000000;
	text-decoration: underline;
`

const Info = styled.div`
	font-size: 24px;
	line-height: 33px;
	color: #000000;
	font-weight: 300;
`
const Contact = styled.div``
const Button = styled.a`
	text-decoration: none;
	display: inline-block;
	padding: 10px 30px;
	margin-top: 15px;
	border: 2px solid #77a7ca;
	border-radius: 6px;
	position: relative;
	overflow: hidden;
	color: #000000;
	cursor: pointer;
	transition: 0.2s ease-in-out;
	:before {
		content: '';
		background: linear-gradient(
			90deg,
			rgba(255, 255, 255, 0.1),
			rgba(255, 255, 255, 0.5)
		);
		height: 60px;
		width: 50px;
		position: absolute;
		top: -8px;
		left: -75px;
		transform: skewX(-45deg);
	}
	:hover {
		background: #77a7ca;
		color: #fff;
		border: 2px solid #fff;
	}
	:hover:before {
		left: 300px;
		transition: 0.9s ease-in-out;
	}
`
const Title = styled.h2``
const Block = styled.div``
const Location = styled.div``
const Tel = styled.span``

const SuccesMessage = styled.div`
	width: 40%;
	padding: 15px;
`
const SuccesMessageTitle = styled.div``
const SuccesMessageDate = styled.div``
const SuccesMessageTime = styled.span``
const SuccesMessageRequire = styled.div``
const Ol = styled.ol`
	padding-left: 15px;
`
const Li = styled.li``
