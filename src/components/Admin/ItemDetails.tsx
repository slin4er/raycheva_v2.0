import { FC, useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import axios from 'axios'

export const ItemDetails: FC = () => {
	const redirect = useNavigate()

	const [patchStatus, setPatchStatus] = useState<boolean>(false)
	const [deleteStatus, setDeleteStatus] = useState<boolean>(false)
	const [editStatus, setEditStatus] = useState<boolean>(true)
	const [errorUpData, setErrorUpData] = useState<boolean>(false)
	const [errorDelData, setErrorDelData] = useState<boolean>(false)
	const [errorGetData, setErrorGetData] = useState<boolean>(false)

	const [editData, setEditData] = useState({
		name: '',
		phone: '',
		email: '',
		appointment: '',
		time: '',
	})
	const [inputs, setInputs] = useState({
		name: '',
		phone: '',
		email: '',
		appointment: '',
		time: '',
	})
	let { _id } = useParams()

	useEffect(() => {
		const getData = async () => {
			const config = {
				headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
			}
			const result = await axios.get(
				`http://localhost:3000/api/v1/${_id}`,
				config
			)
			return result
		}
		getData()
			.then(res => {
				setInputs(state => ({
					...state,
					name: res.data.patient.name,
					phone: res.data.patient.phone,
					email: res.data.patient.email,
					appointment: res.data.patient.appointment,
					time: res.data.patient.time,
				}))
			})
			.catch(e => {
				if (
					e.response.status === 400 ||
					e.response.status === 401 ||
					e.response.status === 404 ||
					e.response.status === 500
				) {
					setErrorGetData(true)
				} else {
					setErrorGetData(false)
				}
			})
	}, [])
	useEffect(() => {
		if (patchStatus) {
			const patchData = async () => {
				const config = {
					headers: {
						Authorization: `Bearer ${localStorage.getItem('token')}`,
					},
				}
				const result = await axios.patch(
					`http://localhost:3000/api/v1/${_id}`,
					editData,
					config
				)
				return result
			}
			patchData()
				.then(res => {
					setInputs(state => ({
						...state,
						name: res.data.patient.name,
						phone: res.data.patient.phone,
						email: res.data.patient.email,
						appointment: res.data.patient.appointment,
						time: res.data.patient.time,
					}))
					setEditStatus(false)
				})
				.catch(e => {
					if (
						e.response.status === 400 ||
						e.response.status === 401 ||
						e.response.status === 404 ||
						e.response.status === 500
					) {
						setErrorUpData(true)
					} else {
						setErrorUpData(false)
					}
				})
			setPatchStatus(false)
		}
	}, [patchStatus, editData, _id, inputs])

	useEffect(() => {
		if (deleteStatus) {
			const deleteData = async () => {
				const config = {
					headers: {
						Authorization: `Bearer ${localStorage.getItem('token')}`,
					},
				}
				const result = await axios.delete(
					`http://localhost:3000/api/v1/${_id}`,
					config
				)
				return result
			}
			deleteData()
				.then(res => {
					console.log('Delete item', res.data)
					redirect(`/admin`)
				})
				.catch(e => {
					if (
						e.response.status === 400 ||
						e.response.status === 401 ||
						e.response.status === 404 ||
						e.response.status === 500
					) {
						setErrorDelData(true)
					} else {
						setErrorDelData(false)
					}
				})
			setDeleteStatus(false)
		}
	}, [deleteStatus, _id, redirect])

	const handlerDelete = () => setDeleteStatus(state => !state)
	const handlerEdit = () => setEditStatus(true)

	const handlerChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		const name = e.target.name
		const value = e.target.value
		setInputs(values => ({
			...values,
			[name]: value,
		}))
	}
	const handlerSubmit = (e: React.SyntheticEvent): void => {
		e.preventDefault()
		setEditData(values => ({
			...values,
			name: inputs.name,
			phone: inputs.phone,
			email: inputs.email || '',
			appointment: inputs.appointment,
			time: inputs.time,
		}))
		setPatchStatus(state => !state)
	}
	return (
		<ItemPage>
			{errorGetData ? <div>Не удалось получить данные пациента</div> : null}
			{errorDelData ? <div>Не удалось удалить пациента</div> : null}
			{errorUpData ? <div>Не удалось изменить пациента</div> : null}

			<Patients>
				<ButtonBlock>
					<Button onClick={() => redirect('/admin')}>назад</Button>
					<Button onClick={handlerEdit}>редактировать</Button>
					<Button onClick={handlerDelete}>удалить</Button>
				</ButtonBlock>
				<div> Имя и Фамилия пациента: {inputs.name}</div>
				<div>Номер пациента: {inputs.phone}</div>
				<div>Адрес почты пациента: {inputs.email}</div>
				<div>Дата, на которую записался пациент: {inputs.appointment}</div>
				<div>Время, на кторое записался пациент: {inputs.time}</div>
			</Patients>

			{editStatus ? (
				<form onSubmit={handlerSubmit}>
					<input
						name={'name'}
						type={'text'}
						value={inputs.name}
						onChange={handlerChange}
					/>
					<input
						name={'phone'}
						type={'text'}
						value={inputs.phone}
						onChange={handlerChange}
					/>
					<input
						name={'email'}
						type={'text'}
						value={inputs.email}
						onChange={handlerChange}
					/>
					<input
						name={'appointment'}
						type={'text'}
						value={inputs.appointment}
						onChange={handlerChange}
					/>
					<input
						name={'time'}
						type={'text'}
						value={inputs.time}
						onChange={handlerChange}
					/>
					<button type={'submit'}>Подтвердить</button>
				</form>
			) : null}
		</ItemPage>
	)
}

const ItemPage = styled.div`
	width: 100vw;
	height: 100vh;
	background: #cfd7dd;
`

const Patients = styled.div`
	border: 2px solid black;
	padding: 10px;
	height: 700px;
	width: 700px;
`
const ButtonBlock = styled.div`
	width: 100%;
	height: 80px;
	display: flex;
	justify-content: space-between;
	align-items: center;
`
const Button = styled.button`
	font-size: 13px;
	width: 110px;
	height: 30px;
	border: none;
	padding: 0;
	outline: none;
	border-radius: 6px;
	font-weight: 500;
	color: #fff;
	cursor: pointer;
	background: #77a6ca;
`
