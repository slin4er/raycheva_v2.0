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
			<Form onSubmit={handlerSubmit}>
				<Title>Админ панель</Title>
				{errorSign ? <Error>Не удалось войти в Админ панель</Error> : null}
				<Block>
					<Label>Логин:</Label>
					<Input
						name={'login'}
						type={'text'}
						value={inputs.login || ''}
						onChange={handlerChange}
					/>
				</Block>

				<Block>
					<Label>Пароль:</Label>
					<Input
						name={'password'}
						type={'password'}
						value={inputs.password || ''}
						onChange={handlerChange}
					/>
				</Block>
				<Button type={'submit'}>Войти</Button>
			</Form>
		</Container>
	)
}

const Container = styled.section`
	background: #cfd7dd;
	min-height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
`
const Form = styled.form`
	background: #fff;
	border-radius: 13px;
	width: 380px;
	height: 420px;
	padding: 50px 40px 80px 40px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	box-shadow: 0 0 0 1px rgba(53, 72, 91, 0.07), 0 2px 2px rgba(0, 0, 0, 0.01),
		0 4px 4px rgba(0, 0, 0, 0.02), 0 10px 8px rgba(0, 0, 0, 0.03),
		0 15px 15px rgba(0, 0, 0, 0.03), 0 30px 30px rgba(0, 0, 0, 0.04),
		0 70px 65px rgba(0, 0, 0, 0.05);
`
const Title = styled.h2`
	color: #000;
	font-weight: 500;
	text-align: center;
	letter-spacing: 0.1em;
`
const Block = styled.div`
	position: relative;
	width: 300px;
`
const Label = styled.label`
	font-size: 1em;
	letter-spacing: 0.05em;
	color: #8f8f8f;
`
const Input = styled.input`
	background: #f6f6f6;
	border-radius: 4px;
	width: 100%;
	height: 40px;
	padding: 8px 12px;
	font-weight: 500;
	font-size: 14px;
	color: #303030;
	border: none;
	outline: none;
	&:focus {
		box-shadow: 0 0 2px 2px #77a6ca;
	}
`
const Error = styled.div``
const Button = styled.button`
	height: 45px;
	width: 100%;
	padding: 7px 20px;
	border-radius: 6px;
	font-size: 21px;
	border: none;
	text-decoration: none;
	letter-spacing: 2px;
	font-weight: 500;
	color: #fff;
	cursor: pointer;
	background: #77a6ca;
	&:hover {
		background: #77a6ca;
	}
`
