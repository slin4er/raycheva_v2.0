import { FC, useEffect, useState } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { ItemList } from './ItemList'
import { IItem } from '../../helpers/types'
import { useNavigate } from 'react-router-dom'
import ReactPaginate from 'react-paginate'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import './AdminPanel.css'

const itemsPerPage = 10

export const AdminPanel: FC = () => {
	const redirect = useNavigate()
	const [patient, setPatient] = useState<IItem[] | []>()
	const [page, setPage] = useState(1)
	const [patientCount, setPatientCount] = useState(0)
	const [inputSearch, setInputSearch] = useState('')

	const [startDate, setStartDate] = useState<Date | null>(new Date())
	const [myDate, setMyDate] = useState<string>()

	const [dateDoc, setDateDoc] = useState({
		date: '',
	})
	const [postDoc, setPostDoc] = useState(false)

	const [emptyPatient, setEmptyPatient] = useState<boolean>(false)
	const [logoutStatus, setLogoutStatus] = useState<boolean>(false)
	const [errorMessage, setErrorMessage] = useState<boolean>(false)
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		const getData = async () => {
			setLoading(true)
			const config = {
				headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
			}

			await axios
				.get(
					`http://localhost:3000/api/v1?page=${page}&limit=${itemsPerPage}`,
					config
				)
				.then(res => {
					setPatient(res.data.patients)
					setPatientCount(res.data.patientCount)
					setLoading(false)
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
		}
		getData()
	}, [page])

	const handlePageClick = (event: any) => {
		setPage(event.selected + 1)
	}

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

	useEffect(() => {
		if (postDoc) {
			const postDocDate = async () => {
				const config = {
					headers: {
						Authorization: `Bearer ${localStorage.getItem('token')}`,
					},
				}
				const result = await axios.post(
					'http://localhost:3000/api/v1/insert/patients',
					dateDoc,
					config
				)
				return result
			}
			postDocDate().then(res => console.log(res))
		}
	}, [postDoc])

	const handleDetailPatient = (id: string): void => redirect(`${id}`)

	const handleTakenByDoc = (e: React.SyntheticEvent): void => {
		e.preventDefault()
		if (myDate) {
			setDateDoc(state => ({
				...state,
				date: myDate,
			}))
			setPostDoc(state => !state)
		}
	}

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
						<div>
							<form onSubmit={handleTakenByDoc}>
								<label>занять врачом</label>
								<DatePicker
									dateFormat='yyyy-MM-dd'
									selected={startDate}
									onSelect={date =>
										setMyDate(date.toLocaleDateString().split('.').join('-'))
									}
									onChange={date => setStartDate(date)}
								/>
								<button type={'submit'}>занять врачом</button>
							</form>
						</div>

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
					<div>
						<ReactPaginate
							previousLabel={'← Previous'}
							nextLabel={'Next →'}
							pageCount={Math.ceil(patientCount / itemsPerPage)}
							onPageChange={handlePageClick}
							containerClassName={'pagination'}
							previousLinkClassName={'pagination__link'}
							nextLinkClassName={'pagination__link'}
							disabledClassName={'pagination__link--disabled'}
							activeClassName={'pagination__link--active'}
						/>
					</div>
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
