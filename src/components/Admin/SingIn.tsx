import { FC, useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

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
				.catch(e => console.log(e.message))
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
		<form onSubmit={handlerSubmit}>
			<label>
				Логин:
				<input
					name={'login'}
					type={'text'}
					value={inputs.login || ''}
					onChange={handlerChange}
				/>
			</label>

			<label>
				Пароль:
				<input
					name={'password'}
					type={'password'}
					value={inputs.password || ''}
					onChange={handlerChange}
				/>
			</label>
			<button type={'submit'}>Войти</button>
		</form>
	)
}
