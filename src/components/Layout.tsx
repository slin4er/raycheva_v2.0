import { FC } from "react";
import styled from "styled-components";
import { DatePicker } from './DatePicker'
import { Preview } from "./Preview";
import { Footer } from "./Footer";
import { IDatePickerProps } from '../helpers/types';

export const Layout: FC<IDatePickerProps> = ({dateClickHandler}) => {
    return (
        <Main>
            <Preview />
            <DatePicker dateClickHandler={dateClickHandler}/>
            <Footer />
        </Main>
    )
}

const Main = styled.main`
    
`