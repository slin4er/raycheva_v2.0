import { FC, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import Creatable from 'react-select/creatable'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { IFormInputs, IFormRegistrationProps, IResData } from '../helpers/types'
import styled from 'styled-components'
import axios from 'axios'

import InputMask from 'react-input-mask'

export const FormRegistration: FC<IFormRegistrationProps> = ({
	date,
	successRegistration,
	responseData,
}) => {
	const redirect = useNavigate()
	const redirectOnLayout = () => redirect('/')

	const [selectDate, postSelectDate] = useState<string | undefined>(date)
	const [postFormData, setPostFormData] = useState<boolean>(false)
	const [errorGetData, setErrorGetData] = useState<boolean>(false)
	const [errorPostData, setErrorPostData] = useState<boolean>(false)
	const [noteAboutEmail, askNoteAboutEmail] = useState<boolean>(true)
	const [formData, setFormData] = useState({})
	const [optionsObj, setOptionsObj] = useState()

	const formShema = Yup.object().shape({
		name: Yup.string().required('Введите имя и фамилию!'),
		phone: Yup.string().required('Вы не ввели телефон!'),
		email: Yup.string(),
		time: Yup.object()
			.shape({
				label: Yup.string().required('Вы не выбрали время!'),
				value: Yup.string().required('Вы не выбрали время!'),
			})
			.nullable()
			.required('Вы не выбрали время!'),
		checkbox: Yup.bool().oneOf([true], 'Вы не согласились!'),
	})

	const {
		register,
		handleSubmit,
		formState: { errors },
		control,
	} = useForm<IFormInputs>({ resolver: yupResolver(formShema) })

	// нажал на дату и сделать запрос http://localhost:3000/api/v1/date/available
	// придет массив свободный часов
	useEffect(() => {
		const getData = async () => {
			//@ts-ignore
			const arr = []
			await axios
				.get(`http://localhost:3000/api/v1/date/available?date=${selectDate}`)
				.then(res => {
					let result = res.data.freeHours
					result.map((time: string) => {
						return arr.push({ value: time, label: time })
					})
					//@ts-ignore
					setOptionsObj(arr)
				})
				.catch(e => {
					if (
						e.response.status === 400 ||
						e.response.status === 401 ||
						e.response.status === 404 ||
						e.response.status === 500
					) {
						setErrorGetData(true)
					} else {
						setErrorGetData(false)
					}
				})
		}
		getData()
	}, [selectDate])

	// пост запрос с данными из формы
	useEffect(() => {
		if (postFormData) {
			const fetchData = async () => {
				const result = await axios.post(
					'http://localhost:3000/api/v1/',
					formData
				)
				return result
			}
			fetchData()
				.then(res => {
					responseData(res.data.patient)
					successRegistration(true)
					redirect('/')
				})
				.catch(e => {
					if (
						e.response.status === 400 ||
						e.response.status === 401 ||
						e.response.status === 404 ||
						e.response.status === 500
					) {
						setErrorPostData(true)
					} else {
						setErrorPostData(false)
					}
				})
		}
	}, [formData, postFormData])

	const handlerSubmitDataForm: SubmitHandler<IFormInputs> = data => {
		console.log(data)
		const fullData = {
			name: data.name,
			phone: data.phone,
			email: data.email,
			appointment: date,
			time: data.time.value,
		}
		setFormData(fullData)
		setPostFormData(true)
	}

	return (
		<Container>
			<Title>Form Registration</Title>

			{errorGetData || errorPostData ? <div>Не удалось записаться</div> : null}

			{noteAboutEmail ? (
				<EmailNote>
					<h2>
						Запись на прием придет на указанный вами почтовый адрес (если
						имеется)
					</h2>
					<button onClick={() => askNoteAboutEmail(false)}>X</button>
				</EmailNote>
			) : null}

			<Form onSubmit={handleSubmit(handlerSubmitDataForm)}>
				<Label>
					Имя и Фамилия:
					<Input
						type={'text'}
						placeholder={'Ваше Имя и Фамилия'}
						{...register('name')}
					/>
				</Label>
				<Error>{errors.name?.message}</Error>

				<Label>
					Телефон:
					<Input
						type={'string'}
						placeholder={'Ваш телефон'}
						{...register('phone')}
					/>
				</Label>
				<Error>{errors.phone?.message}</Error>

				<Label>
					Почта (рекомендуется):
					<Input
						type={'string'}
						placeholder={'Ваша почта'}
						{...register('email')}
					/>
				</Label>
				<Error>{errors.email?.message}</Error>

				<Label>
					Время:
					<Controller
						name='time'
						control={control}
						render={({ field }) => {
							return (
								<Creatable
									{...field}
									options={optionsObj}
									placeholder='Выберите время'
									noOptionsMessage={() => 'Все часы заняты'}
									isSearchable={false}
								/>
							)
						}}
					/>
				</Label>
				<Error>{errors.time && <p>{errors.time.label?.message}</p>}</Error>

				<CheckboxContainer>
					Я согласен(а) с политикой конфиденциальности
					<Checkbox {...register('checkbox')} type='checkbox' />
					<CheckMark></CheckMark>
					<CheckErrorMessage>{errors.checkbox?.message}</CheckErrorMessage>
				</CheckboxContainer>

				<ButtonSubmit type={'submit'}>Записаться на приём</ButtonSubmit>
			</Form>

			<ButtonBack onClick={redirectOnLayout}>Назад</ButtonBack>
		</Container>
	)
}

const Container = styled.div``

const Title = styled.h1``

const Form = styled.form`
	display: grid;
	grid-template-rows: 78px 13px 78px 13px 78px 13px 78px 13px 78px 13px 60px 60px 40px;
	align-items: center;
	border: none;
	margin: 0;
	padding: 0;
`

const SuccessRegistration = styled.div`
	margin: 50px;
`
const EmailNote = styled.div`
	margin: 50px;
`
const Label = styled.label`
	font-weight: 500;
	font-size: 14px;
	color: #707070;
`
const Error = styled.span`
	font-weight: 500;
	font-size: 13px;
	color: #ff768e;
`
const Input = styled.input`
	margin-top: 5px;
	background: #f6f6f6;
	border-radius: 4px;
	width: 365px;
	height: 40px;
	box-sizing: border-box;
	padding: 8px 12px;
	font-weight: 500;
	font-size: 14px;
	color: #303030;
`

const Checkbox = styled.input`
	position: absolute;
	opacity: 0;
	cursor: pointer;
	height: 0;
	width: 0;
`
const CheckMark = styled.span`
	position: absolute;
	top: 3px;
	left: 0;
	height: 12px;
	width: 12px;
	background-color: #fff;
	border: solid 2px #9c9c9c;
	border-radius: 3px;
	:after {
		content: '';
		position: absolute;
	}
`
const CheckboxContainer = styled.label`
	position: relative;
	padding-left: 24px;
	cursor: pointer;
	-webkit-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;
	font-weight: 500;
	font-size: 14px;
	line-height: 23px;
	color: #707070;
	${Checkbox}:checked ~ ${CheckMark} {
		background-color: #002569;
		border: solid 2px #002569;
	}
	${Checkbox}:disabled ~ ${CheckMark} {
		background-color: #f6f6f6;
		border: solid 2px #d1d1d1;
	}
	${Checkbox}:disabled:checked ~ ${Checkbox} {
		background-color: #d1d1d1;
		border: solid 2px #d1d1d1;
	}
	:hover ${Checkbox} ~ ${CheckMark} {
		border: solid 2px #002569;
	}
	${CheckMark}:after {
		left: 3.5px;
		top: 0.5px;
		width: 3px;
		height: 7px;
		border: solid white;
		border-width: 0 2px 2px 0;
		-webkit-transform: rotate(45deg);
		-ms-transform: rotate(45deg);
		transform: rotate(45deg);
	}
`
const CheckErrorMessage = styled.span`
	position: absolute;
	bottom: -20px;
	left: 0px;
	font-weight: 500;
	font-size: 12px;
	color: #ff768e;
`

const ButtonSubmit = styled.button``

const ButtonBack = styled.button``
