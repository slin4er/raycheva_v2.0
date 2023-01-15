import { FC, useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

export const SingIn: FC = () => {
	const redirect = useNavigate()
	const [inputs, setInputs] = useState({
		login: '',
		password: '',
	})
	const [postData, setPostData] = useState({
		login: '',
		password: '',
	})
	const [postStatus, setPostStatus] = useState(false)
	const [errorSign, setErrorSign] = useState(false)
	useEffect(() => {
		if (postStatus) {
			const postFormData = async () => {
				const result = await axios.post(
					`http://localhost:3000/api/v1/admin/login`,
					postData
				)
				return result
			}
			postFormData()
				.then(res => {
					const { token } = res.data
					localStorage.setItem('token', token)
					redirect('/admin')
				})
				.catch(e => {
					if (
						e.response.status === 400 ||
						e.response.status === 401 ||
						e.response.status === 404 ||
						e.response.status === 500
					) {
						setErrorSign(true)
					} else {
						setErrorSign(false)
					}
				})
			setPostStatus(false)
		}
	}, [postData, postStatus, redirect])
	const handlerChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		const name = e.target.name
		const value = e.target.value
		setInputs(values => ({ ...values, [name]: value }))
	}
	const handlerSubmit = (e: React.SyntheticEvent): void => {
		e.preventDefault()
		setPostData(values => ({
			...values,
			login: inputs.login,
			password: inputs.password,
		}))
		setPostStatus(true)
	}
	return (
		<Container>
			<Center>
				<Title>Админ панель</Title>
				<Form onSubmit={handlerSubmit}>
					{errorSign ? <Error>Не удалось войти в Админ панель</Error> : null}
					<Block>
						<Input
							name={'login'}
							type={'text'}
							value={inputs.login || ''}
							onChange={handlerChange}
						/>
						<Span></Span>
						<Label>Логин:</Label>
					</Block>

					<Block>
						<Input
							name={'password'}
							type={'password'}
							value={inputs.password || ''}
							onChange={handlerChange}
						/>
						<Span></Span>
						<Label>Пароль:</Label>
					</Block>
					<Button type={'submit'}>Войти</Button>
				</Form>
			</Center>
		</Container>
	)
}

const Container = styled.section`
	background: linear-gradient(120deg, #2980b9, #8e44ad);
	height: 100vh;
	overflow: hidden;
	display: flex;
	justify-content: center;
	align-items: center;
`
const Center = styled.div`
	width: 400px;
	height: 380px;
	background: white;
	border-radius: 10px;
	box-shadow: 10px 10px 15px rgba(0, 0, 0, 0.05);
`
const Title = styled.h2`
	text-align: center;
	padding: 20px 0;
	border-bottom: 1px solid silver;
`
const Form = styled.form`
	padding: 0 40px;
`
const Label = styled.label`
	position: absolute;
	top: 50%;
	left: 5px;
	color: #adadad;
	transform: translateY(-50%);
	font-size: 16px;
	pointer-events: none;
	transition: 0.5s;
`
const Span = styled.span`
	::before {
		content: '';
		position: absolute;
		top: 40px;
		left: 0;
		width: 0%;
		height: 2px;
		background: #2691d9;
		transition: 0.5s;
	}
`
const Input = styled.input`
	width: 100%;
	padding: 0 5px;
	height: 40px;
	font-size: 16px;
	border: none;
	background: none;
	outline: none;
	&:focus ~ ${Label} {
		top: -5px;
		color: #2691d9;
	}
	&:focus ~ ${Span}::before {
		width: 100%;
	}
`
const Block = styled.div`
	position: relative;
	border-bottom: 2px solid #adadad;
	margin: 30px 0;
`
const Error = styled.div``
const Button = styled.button`
	width: 100%;
	height: 50px;
	border: 1px solid;
	background: #2691d9;
	border-radius: 25px;
	font-size: 18px;
	color: #e9f4fb;
	font-weight: 700;
	cursor: pointer;
	outline: none;
	:hover {
		border-color: #2691d9;
		transition: 0.5s;
	}
`
