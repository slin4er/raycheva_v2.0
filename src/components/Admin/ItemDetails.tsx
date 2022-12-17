import { FC, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import axios from 'axios'
import { IItem } from '../../helpers/types'

export const ItemDetails: FC = () => {
	const [patientName, setPatientName] = useState('')
	const [patientPhone, setPatientPhone] = useState('')
	const [patientEmail, setPatientEmail] = useState('')
	const [patientTime, setPatientTime] = useState('')
	const [patientAppointment, setPatientAppointment] = useState('')
	const [refreshPatient, setRefreshPatient] = useState<boolean>(true)
	const [patchStatus, setPatchStatus] = useState<boolean>(false)
	const [deleteStatus, setDeleteStatus] = useState<boolean>(false)
	const [editStatus, setEditStatus] = useState<boolean>(false)
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
		if (refreshPatient) {
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
					setPatientName(res.data.patient?.name)
					setPatientPhone(res.data.patient?.phone)
					setPatientEmail(res.data.patient?.email)
					setPatientAppointment(res.data.patient?.appointment)
					setPatientTime(res.data.patient?.time)
					setRefreshPatient(false)
				})
				.catch(e => console.log(e.message))
		}
	}, [_id, refreshPatient])
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
					console.log('Patch item', res.data)
					setEditStatus(false)
				})
				.catch(e => console.log(e.message))
			setPatchStatus(false)
		}
	}, [patchStatus, editData, _id])

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
				})
				.catch(e => console.log(e.message))
			setDeleteStatus(false)
		}
	}, [deleteStatus, _id])

	const handlerDelete = () => {
		setDeleteStatus(state => !state)
	}
	const handlerEdit = () => {
		setEditStatus(true)
		setPatchStatus(state => !state)
	}
	const handlerChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		const name = e.target.name
		const value = e.target.name
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
	}
	return (
		<div>
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
			) : (
				<Patients>
					<div>{patientName}</div>
					<div>{patientPhone}</div>
					<div>{patientEmail}</div>
					<div>{patientAppointment}</div>
					<div>{patientTime}</div>
					<button onClick={handlerEdit}>редактировать</button>
					<button onClick={handlerDelete}>удалить</button>
				</Patients>
			)}
		</div>
	)
}

const Patients = styled.div`
	border: 2px solid black;
	padding: 10px;
`
