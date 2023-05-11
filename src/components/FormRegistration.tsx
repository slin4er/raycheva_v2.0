import { FC, useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import Creatable from 'react-select/creatable'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { IFormInputs, IFormRegistrationProps, IResData } from '../helpers/types'
import styled from 'styled-components'
import axios from 'axios'

export const FormRegistration: FC<IFormRegistrationProps> = ({
	successRegistration,
	responseData,
}) => {
	const redirect = useNavigate()
	const redirectOnLayout = () => {
		redirect('/')
		localStorage.removeItem('nowDate')
	}

	const [postFormData, setPostFormData] = useState<boolean>(false)
	const [errorGetData, setErrorGetData] = useState<boolean>(false)
	const [errorPostData, setErrorPostData] = useState<boolean>(false)
	const [formData, setFormData] = useState({})
	const [optionsObj, setOptionsObj] = useState()
	const date = localStorage.getItem('nowDate')
	const rightFormatDate = date
		?.split('-')
		.map(element => (element.length < 2 ? '0' + element : element))
		.join('-')

	const formShema = Yup.object().shape({
		name: Yup.string().required('Введите имя и фамилию!'),
		phone: Yup.string().required('Вы не ввели телефон!'),
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
		setFocus,
	} = useForm<IFormInputs>({ resolver: yupResolver(formShema) })

	const selectStyles = {
		control: (styles: any, state: any) => ({
			...styles,
			border: 'none',
			boxShadow: state.isFocused ? '0 0 2px 2px #77a6ca;' : '',
			fontWeight: '500',
			fontSize: '14px',
			color: '#303030',
			width: '365px',
			height: '40px',
			background: '#f6f6f6',
			paddingLeft: '2px',
		}),
	}

	useEffect(() => {
		setFocus('name')
	}, [setFocus])
	// нажал на дату и сделать запрос http://localhost:3000/api/v1/date/available
	// придет массив свободный часов
	useEffect(() => {
		const getData = async () => {
			//@ts-ignore
			const arr = []
			await axios
				.get(
					`http://localhost:3000/api/v1/date/available?date=${rightFormatDate}`
				)
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
	}, [rightFormatDate])

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
		const fullData = {
			name: data.name,
			phone: data.phone,
			email: data.email,
			appointment: rightFormatDate,
			time: data.time.value,
		}
		setFormData(fullData)
		setPostFormData(true)
	}

	return (
		<Container>
			<Flex>
				<ButtonBack onClick={redirectOnLayout}>← Назад</ButtonBack>
			</Flex>

			{errorGetData || errorPostData ? <div>Не удалось записаться</div> : null}

			<Form onSubmit={handleSubmit(handlerSubmitDataForm)}>
				<SpaceBetween>
					<Label htmlFor={'name'}>Имя и Фамилия:</Label>
					<Input
						id={'name'}
						type={'text'}
						placeholder={'Ваше Имя и Фамилия'}
						{...register('name')}
					/>
				</SpaceBetween>
				<Error>{errors.name?.message}</Error>

				<SpaceBetween>
					<Label htmlFor={'phone'}>Телефон:</Label>
					<Input
						id={'phone'}
						type={'text'}
						placeholder={'Ваш телефон'}
						{...register('phone')}
					/>
				</SpaceBetween>
				<Error>{errors.phone?.message}</Error>

				<SpaceBetween>
					<Label htmlFor={'email'}>Почта (рекомендуется):</Label>
					<Input
						id={'email'}
						type={'string'}
						placeholder={'Ваша почта'}
						{...register('email')}
					/>
				</SpaceBetween>

				<SpaceBetween>
					<Label>Время:</Label>
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
									styles={selectStyles}
								/>
							)
						}}
					/>
				</SpaceBetween>
				<Error>{errors.time && <p>{errors.time.label?.message}</p>}</Error>

				<CheckboxContainer>
					Я согласен(а) с {''}
					<Link
						to={'/policy'}
						target={'_blank'}
						style={{ textDecoration: 'none' }}
					>
						<LinkText>политикой конфиденциальности</LinkText>
					</Link>
					<Checkbox {...register('checkbox')} type='checkbox' />
					<CheckMark></CheckMark>
					<CheckErrorMessage>{errors.checkbox?.message}</CheckErrorMessage>
				</CheckboxContainer>

				<ButtonSubmit type={'submit'}>Записаться на приём</ButtonSubmit>
			</Form>
		</Container>
	)
}

const Container = styled.section`
	width: 700px;
	height: 460px;
	background: white;
	border-radius: 13px;
	box-shadow: 0 0 0 1px rgba(53, 72, 91, 0.07), 0 2px 2px rgba(0, 0, 0, 0.01),
		0 4px 4px rgba(0, 0, 0, 0.02), 0 10px 8px rgba(0, 0, 0, 0.03),
		0 15px 15px rgba(0, 0, 0, 0.03), 0 30px 30px rgba(0, 0, 0, 0.04),
		0 70px 65px rgba(0, 0, 0, 0.05);
`
const Flex = styled.div`
	display: flex;
	justify-content: flex-start;
	align-items: center;
	height: 35px;
	padding: 20px;
`
const SpaceBetween = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-top: 15px;
`
const ButtonBack = styled.button`
	width: 75px;
	height: 24px;
	border: none;
	border-radius: 6px;
	color: #303030;
	background: #f6f6f6;
	font-weight: 500;
	cursor: pointer;
	&:hover {
		color: #fff;
		background: #77a6ca;
	}
`

const Form = styled.form`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	border: none;
	margin: 0;
	padding: 10px 50px;
`

const SuccessRegistration = styled.div`
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
	margin-top: 4px;
`
const Input = styled.input`
	background: #f6f6f6;
	border-radius: 4px;
	width: 365px;
	height: 40px;
	padding: 8px 12px;
	font-weight: 500;
	font-size: 14px;
	color: #303030;
	border: none;
	outline: none;
	&:focus {
		box-shadow: 0 0 2px 2px #77a6ca;
	}
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
	top: 3.5px;
	left: 0;
	height: 15px;
	width: 15px;
	background-color: #fff;
	border: solid 2px #9c9c9c;
	border-radius: 3px;
	&:after {
		content: '';
		position: absolute;
	}
`
const CheckboxContainer = styled.label`
	position: relative;
	margin-top: 15px;
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
		background-color: #77a6ca;
		border: solid 2px #77a6ca;
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
		border: solid 2px #77a6ca;
	}
	${CheckMark}:after {
		left: 3.4px;
		top: 0.4px;
		width: 3px;
		height: 6px;
		border: solid white;
		border-width: 0 2px 2px 0;
		-webkit-transform: rotate(45deg);
		-ms-transform: rotate(45deg);
		transform: rotate(45deg);
	}
`
const CheckErrorMessage = styled.span`
	position: absolute;
	bottom: -25px;
	left: 0px;
	font-weight: 500;
	font-size: 12px;
	color: #ff768e;
`

const ButtonSubmit = styled.button`
	margin: 35px auto 0 auto;
	height: 45px;
	width: 365px;
	padding: 7px 20px;
	border-radius: 6px;
	font-size: 21px;
	border: none;
	text-decoration: none;
	letter-spacing: 2px;
	font-weight: 500;
	color: #fff;
	cursor: pointer;
	background: #77a6ca;
	&:hover {
		background: #77a6ca;
	}
`
const LinkText = styled.span`
	color: #000;
	font-style: italic;
	&:hover {
		color: #77a6ca;
	}
`
