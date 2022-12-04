import { FC, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import * as Yup from 'yup'
// import "yup-phone";
import { yupResolver } from '@hookform/resolvers/yup'
import { IFormInputs, IFormRegistrationProps } from '../helpers/types'
import styled from 'styled-components'
import axios from "axios";

import InputMask from 'react-input-mask'

export const FormRegistration: FC<IFormRegistrationProps> = ({date}) => {
    const redirect = useNavigate()
    const redirectOnLayout = () => redirect('/')
	
	console.log('Form',date)

	const [postFormData, setPostFormData] = useState<boolean>(false)
	const [succesMessage, showSuccesMessage] = useState<boolean>(false)
	const [formData, setFormData] = useState({})

    const formShema = Yup.object().shape({
		name: Yup.string().required('Введите имя'),
		surname: Yup.string().required('Введите Фамилию'),
		// phone: Yup.string().phone('MD', true, 'no MOLDOVA tel').required(),
		phone: Yup.number().required('TELEFONE'),
		time: Yup.string().required('Введите время'),
		checkbox: Yup.bool().oneOf([true], 'Вы не согласились!')
	})

    const { register, handleSubmit, formState: { errors }, control, reset } = useForm<IFormInputs>({resolver: yupResolver(formShema)})
    
	useEffect(() => {
		if (postFormData) {
			const fetchData = async () => {
				const result = await axios.post('http://localhost:3000/patients/patient/add', formData)
				return result
			}
			fetchData()
				.then((res) => {
					console.log(res.data)
					console.log(`uspex`)
					showSuccesMessage(true)
					// redirect('/')
				})
				.catch((err) => console.log('error'))
		}
	}, [formData, postFormData])


    const handlerSubmitDataForm: SubmitHandler<IFormInputs> = (data) => {
		const fullData = {
			firstName: data.name,
			lastName: data.surname,
			phone: data.phone,
			date,
			time: data.time
		}
		console.log(fullData)
		setFormData(fullData)
		setPostFormData(true)
        // reset()
    }

    return (
        <Container>
            <Title>Form Registration</Title>

            <Form onSubmit={handleSubmit(handlerSubmitDataForm)}>
                {
					succesMessage ? <SuccessRegistration>Вы зарегались! всё збс))))))))</SuccessRegistration> : null
				}

                <Label>
					Имя:
					<Input type={"text"} placeholder={"Ваше Имя"} {...register("name")} />
				</Label>
				<Error>{errors.name?.message}</Error>

                <Label>
					Фамилия:
					<Input type={"text"} placeholder={"Ваша Фамилия"} {...register("surname")} />
				</Label>
				<Error>{errors.surname?.message}</Error>

                <Label>
					Телефон:
					<Input type={"string"} placeholder={"Telefon"} {...register("phone")} />
                    {/* <InputMask
                        mask="(999)99-999"
                        value={tel} 
                        alwaysShowMask
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTel(e.target.value)}
                        >
                        {() => <Input type={"string"} placeholder={"Ваш Телефон"} {...register("phone")} />}
                    </InputMask> */}
                    
				</Label>
                <Error>{errors.phone?.message}</Error>

				<Label>
					Время:
					<Input type={"string"} placeholder={"Время записи"} {...register("time")} />
				</Label>
				<Error>{errors.time?.message}</Error>

                <CheckboxContainer>
                    Я согласен(а) с политикой конфиденциальности
                    <Checkbox {...register("checkbox")} type="checkbox" />
                    <CheckMark></CheckMark>
                    <CheckErrorMessage>{errors.checkbox?.message}</CheckErrorMessage>
                </CheckboxContainer>

                <ButtonSubmit type={"submit"}>Записаться на приём</ButtonSubmit>
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
    
`
const Label = styled.label`
    font-weight: 500;
    font-size: 14px;
    color: #707070;
`
const Error = styled.span`
	font-weight: 500;
	font-size: 13px;
	color: #FF768E;
`
const Input = styled.input`
	margin-top: 5px;
	background: #F6F6F6;
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
	border: solid 2px #9C9C9C;
	border-radius: 3px;
	:after {
		content: "";
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
		background-color: #F6F6F6;
		border: solid 2px #D1D1D1;
   	}
	${Checkbox}:disabled:checked ~ ${Checkbox} {
    	background-color: #D1D1D1;
    	border: solid 2px #D1D1D1;
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
	color: #FF768E;
`


const ButtonSubmit = styled.button``

const ButtonBack = styled.button``