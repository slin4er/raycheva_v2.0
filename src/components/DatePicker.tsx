import { FC, Fragment } from 'react';
import { IDatePickerProps } from '../helpers/types';
import '../App.css';

import { Calendar } from './Calendar';

export const DatePicker: FC<IDatePickerProps> = ({dateClickHandler}) => {
  return (
    <Fragment>
      <section className="hero is-primary">
        <div className="hero-body">
          <div className="container">
            <h1 className="title has-text-centered">Выберите дату</h1>
          </div>
        </div>
      </section>
      <div className="container has-text-centered">
        <Calendar dateClickHandler={dateClickHandler}/>
      </div>
    </Fragment>
  );
}
