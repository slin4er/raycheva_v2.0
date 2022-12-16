import { FC, useEffect, useState } from 'react'
import axios from "axios";

export const AdminPanel: FC = () => {
    const [patient, setPatient]=useState()

    useEffect(() => {
        const getData = async () => {
            const result = await axios.get(`http://localhost:3000/api/v1/`)
            return result
        }
        getData()
            .then(res => {
                console.log(res.data)
                setPatient(res.data)
            })
    }, [])


    useEffect(() => {
        const getToken = async () => {
            const result = await axios.post(`http://localhost:3000/api/v1/login`)
        }
        getToken()
            .then(res => {

            })
    }, []);

    return (
        <div>
            <div>ADMIN panel</div>
        </div>
    )
}