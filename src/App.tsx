import { FC, useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { FormRegistration } from './components/FormRegistration'
import { Layout } from './components/Layout'
import { NotFound } from './components/NotFound'
import { AdminPanel } from './components/Admin/AdminPanel'
import { ItemDetails } from './components/Admin/ItemDetails'
import { SingIn } from './components/Admin/SingIn'
import { IResData } from './helpers/types'
import { Dash } from './components/Dashboard'
import { Policy } from './components/Policy'

export const App: FC = () => {
	const redirect = useNavigate()
	const [succesMessage, showSuccesMessage] = useState<boolean>()
	const [resData, setResData] = useState<IResData>()

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
						<Dash
							dateClickHandler={dateClickHandler}
							sucMes={succesMessage}
							resData={resData}
						/>
					}
				/>
				<Route
					path='dashboard'
					element={
						<Dash
							dateClickHandler={dateClickHandler}
							sucMes={succesMessage}
							resData={resData}
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
