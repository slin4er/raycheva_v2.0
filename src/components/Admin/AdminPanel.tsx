import { FC, useEffect, useState } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { ItemList } from './ItemList'
import { IItem } from '../../helpers/types'
import { useNavigate } from 'react-router-dom'
import ReactPaginate from 'react-paginate'
import './AdminPanel.css'

const itemsPerPage = 10

export const AdminPanel: FC = () => {
	const redirect = useNavigate()
	const [patient, setPatient] = useState<IItem[] | []>()
	const [page, setPage] = useState(1)
	const [patientCount, setPatientCount] = useState(0)
	const [inputSearch, setInputSearch] = useState('')
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

	const handleDetailPatient = (id: string): void => redirect(`${id}`)

	return (
		<div>
			{emptyPatient ? (
				<div>??????-???? ?????????? ???? ??????... (???????????? ?????????????????? ???? ????????????)</div>
			) : (
				<div>
					<div>
						<label>?????????? ????????????????</label>
						<input
							value={inputSearch}
							onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
								setInputSearch(e.target.value)
							}
						/>
						<button onClick={() => setLogoutStatus(true)}>??????????!</button>
						{errorMessage ? (
							<div>??????-???? ?????????? ???? ??????...(???? ?????????????? ?????????? ?? ?????????? ????????????)</div>
						) : null}
					</div>
					{patient?.length === 0 ? (
						<div>?????????? ?????? ???? ??????????????????</div>
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
							previousLabel={'??? Previous'}
							nextLabel={'Next ???'}
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
