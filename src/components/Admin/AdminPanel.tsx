import { FC, useEffect, useState } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { ItemList } from './ItemList'
import { IItem, IItemProp } from '../../helpers/types'

export const AdminPanel: FC = () => {
	const [patient, setPatient] = useState<IItem[] | undefined>()
	const [refreshPatients, setRefreshPatient] = useState(true)
	const [patchStatus, setPatchStatus] = useState<boolean>(false)
	const [deleteStatus, setDeleteStatus] = useState<boolean>(false)
	const [patchId, setPatchId] = useState<string>()
	const [deleteId, setDeleteId] = useState<string>()
	const [editData, setEditData] = useState({})

	useEffect(() => {
		if (refreshPatients) {
			const getData = async () => {
				const config = {
					headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
				}
				const result = await axios.get(`http://localhost:3000/api/v1/`, config)
				return result
			}
			getData()
				.then(res => {
					setPatient(res.data.patients)
					setRefreshPatient(false)
				})
				.catch(e => console.log(e.message))
		}
	}, [refreshPatients])

	useEffect(() => {
		if (patchStatus) {
			const patchData = async () => {
				const config = {
					headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
				}
				const result = await axios.patch(
					`http://localhost:3000/api/v1/${patchId}`,
					editData,
					config
				)
				return result
			}
			patchData()
				.then(res => {
					console.log('Patch item', res.data)
				})
				.catch(e => console.log(e.message))
			setPatchStatus(false)
		}
	}, [patchStatus, editData, patchId])

	useEffect(() => {
		if (deleteStatus) {
			const deleteData = async () => {
				const config = {
					headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
				}
				const result = await axios.delete(
					`http://localhost:3000/api/v1/${deleteId}`,
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
	}, [deleteStatus, deleteId])

	const handlerDelete = (id: string) => {
		setDeleteId(id)
		setDeleteStatus(true)
	}
	const handlerEdit = (id: string) => {
		setPatchId(id)
		setPatchStatus(true)
	}

	return (
		<ItemBlock>
			{patient?.map((item: IItem) => {
				return (
					<ItemList
						key={item._id}
						{...item}
						editItem={handlerEdit}
						deleteItem={handlerDelete}
					/>
				)
			})}
		</ItemBlock>
	)
}

const ItemBlock = styled.div`
	display: grid;
	grid-template-columns: repeat(4, 200px);
	grid-template-rows: repeat(4, 200px);
	grid-auto-rows: 200px;
	gap: 10px;
	box-sizing: border-box;
`
