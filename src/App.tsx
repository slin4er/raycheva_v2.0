import { FC, useEffect, useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { FormRegistration } from './components/FormRegistration'
import { Layout } from './components/Layout'
import { NotFound } from './components/NotFound'
import { AdminPanel } from './components/Admin/AdminPanel'
import { ItemDetails } from './components/Admin/ItemDetails'
import { SingIn } from './components/Admin/SingIn'
import { IResData, IDisDateMassive } from './helpers/types'
import { MyDatePicker } from './components/MyDatePicker'
import { Policy } from './components/Policy'
import axios from 'axios'

export const App: FC = () => {
	const redirect = useNavigate()
	const [succesMessage, showSuccesMessage] = useState<boolean>()
	const [resData, setResData] = useState<IResData>()
	const [disabledDate, setDisabledDate] = useState<IDisDateMassive[] | string>()

	useEffect(() => {
		const getMassive = async () => {
			const result = await axios.get(
				`http://localhost:3000/api/v1/disabled/dates`
			)
			return result
		}
		getMassive()
			.then(res => {
				setDisabledDate(res.data.dates)
			})
			.catch(e => console.log(e))
	}, [])

	const dateClickHandler = (date: string) => {
		localStorage.setItem('nowDate', date)
		redirect('/registration')
	}

	const successRegistration = (message: boolean): void =>
		showSuccesMessage(message)
	const responseData = (data: IResData): void => setResData(data)

	return (
		<Routes>
			<Route
				path='/'
				element={
					<Layout
						dateClickHandler={dateClickHandler}
						sucMes={succesMessage}
						resData={resData}
					/>
				}
			>
				<Route
					index
					element={
						<MyDatePicker
							dateClickHandler={dateClickHandler}
							disabledDatesMassive={disabledDate!}
						/>
					}
				/>
				<Route
					path='dashboard'
					element={
						<MyDatePicker
							dateClickHandler={dateClickHandler}
							disabledDatesMassive={disabledDate!}
						/>
					}
				/>
				<Route
					path='registration'
					element={
						<FormRegistration
							successRegistration={successRegistration}
							responseData={responseData}
						/>
					}
				/>
			</Route>

			<Route path='/admin' element={<AdminPanel />} />

			<Route path='admin/:_id' element={<ItemDetails />} />

			<Route path='/login' element={<SingIn />} />
			<Route path='/policy' element={<Policy />} />
			<Route path='*' element={<NotFound />} />
		</Routes>
	)
}
