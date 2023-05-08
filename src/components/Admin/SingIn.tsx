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
			<Box>
				<Form onSubmit={handlerSubmit}>
					<Title>Админ панель</Title>
					{errorSign ? <Error>Не удалось войти в Админ панель</Error> : null}
					<Block>
						<Input
							name={'login'}
							type={'text'}
							value={inputs.login || ''}
							onChange={handlerChange}
						/>
						<Span>Логин:</Span>
						<I></I>
					</Block>

					<Block>
						<Input
							name={'password'}
							type={'password'}
							value={inputs.password || ''}
							onChange={handlerChange}
						/>
						<Span>Пароль:</Span>
						<I></I>
					</Block>
					<Button type={'submit'}>Войти</Button>
				</Form>
			</Box>
		</Container>
	)
}

const Container = styled.section`
	background: #23242a;
	min-height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
`
const Box = styled.div`
	width: 380px;
	height: 420px;
	background: #1c1c1c;
	border-radius: 8px;
	position: relative;
`
const Form = styled.form`
	background: #222;
	border-radius: 8px;
	inset: 4px;
	z-index: 2;
	position: absolute;
	padding: 50px 40px;
	display: flex;
	flex-direction: column;
`
const Title = styled.h2`
	color: #fff;
	font-weight: 500;
	text-align: center;
	letter-spacing: 0.1em;
`
const Block = styled.div`
	position: relative;
	width: 300px;
	margin-top: 35px;
`
const Span = styled.span`
	position: absolute;
	left: 0;
	padding: 20px 10px 10px;
	pointer-events: none;
	font-size: 1em;
	letter-spacing: 0.05em;
	transition: 0.5s;
	color: #8f8f8f;
`
const Input = styled.input`
	position: relative;
	width: 100%;
	padding: 20px 10px 10px;
	background: transparent;
	box-shadow: none;
	outline: none;
	font-size: 1em;
	letter-spacing: 0.05em;
	color: #23242a;
	transition: 0.5s;
	z-index: 10;
	border: none;
	&:valid {
		background: red;
	}
	&:focus ~ ${Span} {
		color: #fff;
		font-size: 0.75em;
		transform: translateY(-34px);
	}
`
const I = styled.i``
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
	&:hover {
		border-color: #2691d9;
		transition: 0.5s;
	}
`
