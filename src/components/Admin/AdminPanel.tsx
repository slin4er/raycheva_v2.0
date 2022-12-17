import { FC, useEffect, useState } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { ItemList } from './ItemList'
import { IItem } from '../../helpers/types'
import { useNavigate } from 'react-router-dom'

export const AdminPanel: FC = () => {
	const [patient, setPatient] = useState<IItem[] | undefined>()
	const redirect = useNavigate()
	// const [refreshPatients, setRefreshPatient] = useState(true)

	useEffect(() => {
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
				// setRefreshPatient(false)
			})
			.catch(e => console.log(e.message))
	}, [])

	const handleDetailPatient = (id: string): void => redirect(`admin/${id}`)

	return (
		<div>
			<ItemBlock>
				{patient?.map((item: IItem) => {
					return (
						<ItemList
							handleDetail={handleDetailPatient}
							key={item._id}
							{...item}
						/>
					)
				})}
			</ItemBlock>
		</div>
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
