import { FC, useEffect, useState } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { ItemList } from './ItemList'
import { IItem } from '../../helpers/types'
import { useNavigate } from 'react-router-dom'

export const AdminPanel: FC = () => {
	const [patient, setPatient] = useState<IItem[] | []>()
	const [inputSearch, setInputSearch] = useState('')
	const [emptyPatient, setEmptyPatient] = useState<boolean>(false)
	const [logoutStatus, setLogoutStatus] = useState<boolean>(false)
	const [errorMessage, setErrorMessage] = useState<boolean>(false)
	const redirect = useNavigate()

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
			})
			.catch(e => {
				if (
					e.response.status === 400 ||
					e.response.status === 401 ||
					e.response.status === 404 ||
					e.response.status === 500
				) {
					setEmptyPatient(true)
				} else {
					setEmptyPatient(false)
				}
			})
	}, [])

	useEffect(() => {
		if (logoutStatus) {
			const logOut = async () => {
				const config = {
					headers: {
						Authorization: `Bearer ${localStorage.getItem('token')}`,
					},
				}
				const result = await axios.post(
					`http://localhost:3000/api/v1/admin/logout`,
					null,
					config
				)
				return result
			}
			logOut()
				.then(res => {
					sessionStorage.removeItem('token')
					setLogoutStatus(false)
					redirect('/')
				})
				.catch(e => {
					if (
						e.response.status === 400 ||
						e.response.status === 401 ||
						e.response.status === 404 ||
						e.response.status === 500
					) {
						setErrorMessage(true)
					} else {
						setErrorMessage(false)
					}
				})
		}
	}, [logoutStatus])

	const handleDetailPatient = (id: string): void => redirect(`${id}`)

	return (
		<div>
			{emptyPatient ? (
				<div>Что-то пошло не так... (список пациентов не пришел)</div>
			) : (
				<div>
					<div>
						<label>поиск пациента</label>
						<input
							value={inputSearch}
							onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
								setInputSearch(e.target.value)
							}
						/>
						<button onClick={() => setLogoutStatus(true)}>выйти!</button>
						{errorMessage ? (
							<div>Что-то пошло не так...(Не удалось выйти с админ панели)</div>
						) : null}
					</div>
					{patient?.length === 0 ? (
						<div>Никто еще не записался</div>
					) : (
						<ItemBlock>
							{patient
								?.filter(elem => {
									if (inputSearch === '') {
										return elem
									} else if (
										elem.name
											.toLowerCase()
											.trim()
											.includes(inputSearch.toLowerCase().trim())
									) {
										return elem
									}
								})
								.map((item: IItem) => {
									return (
										<ItemList
											handleDetail={handleDetailPatient}
											key={item._id}
											{...item}
										/>
									)
								})}
						</ItemBlock>
					)}
				</div>
			)}
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
