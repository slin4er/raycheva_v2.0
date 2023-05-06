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
	const [searchStatus, setSearchStatus] = useState<boolean>(false)
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
		console.log(myDate)
		if (myDate) {
			setDateDoc(state => ({
				...state,
				date: myDate,
			}))
			setPostDoc(state => !state)
		}
	}

	useEffect(() => {
		if (searchStatus) {
			const searchGet = async () => {
				const config = {
					headers: {
						Authorization: `Bearer ${localStorage.getItem('token')}`,
					},
				}

				const result = await axios.get(
					`http://localhost:3000/api/v1/patient/data?name=${inputSearch}`,
					config
				)
				return result
			}
			searchGet()
				.then(res => {
					setPatient(res.data.patient)
					setSearchStatus(false)
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
	}, [searchStatus])

	const handleSearchBar = (e: React.SyntheticEvent): void => {
		e.preventDefault()
		setSearchStatus(state => !state)
	}

	return (
		<Container>
			{emptyPatient ? (
				<div>Что-то пошло не так... (список пациентов не пришел)</div>
			) : (
				<div>
					<Header>
						<SearchBlock>
							<form onSubmit={handleSearchBar}>
								<label>поиск пациента:</label>
								<Input
									value={inputSearch}
									onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
										setInputSearch(e.target.value)
									}
								/>
								<button type={'submit'}>поиск</button>
							</form>
						</SearchBlock>
						<TakenDoc>
							<Form onSubmit={handleTakenByDoc}>
								<label>занять врачом</label>
								<DatePicker
									dateFormat='yyyy-MM-dd'
									selected={startDate}
									onSelect={date => {
										const rightFormatDate = date
											.toLocaleDateString()
											.split('/')
											.map(eachDateElement =>
												eachDateElement.length < 2
													? '0' + eachDateElement
													: eachDateElement
											)
											.join('-')
										setMyDate(rightFormatDate)
									}}
									onChange={date => setStartDate(date)}
								/>
								<button type={'submit'}>занять врачом</button>
							</Form>
						</TakenDoc>

						<ButtonOut onClick={() => setLogoutStatus(true)}>выйти!</ButtonOut>
						{errorMessage ? (
							<div>Что-то пошло не так...(Не удалось выйти с админ панели)</div>
						) : null}
					</Header>
					{patient?.length === 0 ? (
						<div>Никто еще не записался</div>
					) : (
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
					)}
					<Paginate>
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
					</Paginate>
				</div>
			)}
		</Container>
	)
}

const ItemBlock = styled.div`
	display: grid;
	grid-template-columns: repeat(5, 200px);
	grid-template-rows: repeat(2, 200px);
	grid-auto-rows: 200px;
	gap: 35px;
	box-sizing: border-box;
`
const Header = styled.header`
	display: flex;
	justify-content: space-between;
	height: 72px;
	margin-bottom: 20px;
`
const Container = styled.div`
	width: 1140px;
	margin: 0 auto;
`
const Paginate = styled.div`
	margin: 20px auto 0 auto;
	width: 700px;
	height: 45px;
`
const ButtonOut = styled.button`
	width: 200px;
	height: 72px;
`
const TakenDoc = styled.div`
	width: 300px;
	height: 72px;
`
const SearchBlock = styled.div`
	margin-top: 20px;
`
const Input = styled.input`
	margin-top: 5px;
	margin-left: 5px;
	background: #f6f6f6;
	border-radius: 4px;
	width: 280px;
	height: 40px;
	padding: 8px 12px;
	font-weight: 500;
	font-size: 14px;
	color: #303030;
	border: none;
	outline: none;
	&:focus {
		box-shadow: 0 0 2px 2px #77a7ca;
	}
`
const Form = styled.form`
	padding: 0 10px;
`
