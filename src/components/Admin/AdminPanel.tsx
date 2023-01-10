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
	const [inputSearch, setInputSearch] = useState('')
	const [emptyPatient, setEmptyPatient] = useState<boolean>(false)
	const [logoutStatus, setLogoutStatus] = useState<boolean>(false)
	const [errorMessage, setErrorMessage] = useState<boolean>(false)
	const [loading, setLoading] = useState(false)

	const [currentItems, setCurrentItems] = useState(null)
	const [pageCount, setPageCount] = useState(1)
	const [itemOffset, setItemOffset] = useState(0)

	useEffect(() => {
		const getData = async () => {
			setLoading(true)
			const config = {
				headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
			}

			await axios
				.get(
					`http://localhost:3000/api/v1?page=${pageCount}&limit=${itemsPerPage}`,
					config
				)
				.then(res => {
					setPatient(res.data.patients)
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
		const endOffset = itemOffset + itemsPerPage
		console.log(`Loading items from ${itemOffset} to ${endOffset}`)
		//@ts-ignore
		setCurrentItems(patient.slice(itemOffset, endOffset))
		//@ts-ignore
		setPageCount(Math.ceil(patient.length / itemsPerPage))
	}, [])

	const handlePageClick = (event: any) => {
		//@ts-ignore
		const newOffset = (event.selected * itemsPerPage) % patient.length
		console.log(
			`User requested page number ${event.selected}, which is offset ${newOffset}`
		)
		setItemOffset(newOffset)
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
							{currentItems
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
							pageCount={pageCount}
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
