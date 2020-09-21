import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Row, Col, Input,  Table, Button, Icon, Tag } from 'antd';
import Highlighter from 'react-highlight-words';

import delay from 'utils/delay';

import Plot from 'react-plotly.js';

import Loader from 'components/ui/Loader';
import SectionType from 'utils/SectionType';

import s from './Settings.scss';



export default class Settings extends Component {

 


  render() {
   
    return (
      <>
        <div className={s.container}>
          <h1>Настройки</h1>
          <div className={s.flexcont}>
            <div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
