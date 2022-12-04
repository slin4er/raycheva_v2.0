import { FC, useState } from "react";
import { Routes, Route, useNavigate } from 'react-router-dom'
import { FormRegistration } from './components/FormRegistration'
import { Layout } from "./components/Layout";
import { NotFound } from "./components/NotFound";

export const App:FC = () => {
  const redirect = useNavigate()
  const [datePick, setDatePick] = useState<string>()

  const dateClickHandler = (date: string) => {
    console.log('App',date)
    setDatePick(date)
    redirect('/registration')
  }

  return (
    <Routes>
      <Route path="/" element={<Layout dateClickHandler={dateClickHandler} />} />
      <Route path="/registration" element={<FormRegistration date={datePick} />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}

