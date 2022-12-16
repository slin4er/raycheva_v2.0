import { FC, useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { FormRegistration } from './components/FormRegistration'
import { Layout } from './components/Layout'
import { NotFound } from './components/NotFound'
import { AdminPanel } from './components/Admin/AdminPanel'
import { SingIn } from './components/Admin/SingIn'

export const App: FC = () => {
	const redirect = useNavigate()
	const [datePick, setDatePick] = useState<string>()

	const dateClickHandler = (date: string) => {
		setDatePick(date)
		redirect('/registration')
	}

	const successRegistration = (massage: boolean) => {}

	return (
		<Routes>
			<Route
				path='/'
				element={<Layout dateClickHandler={dateClickHandler} />}
			/>
			<Route
				path='/registration'
				element={
					<FormRegistration
						date={datePick}
						successRegistration={successRegistration}
					/>
				}
			/>
			<Route path='/admin' element={<AdminPanel />} />
			<Route path='/login' element={<SingIn />} />
			<Route path='*' element={<NotFound />} />
		</Routes>
	)
}
