import React, { Component } from 'react';
import axios from 'axios';


import s from './Dtp.scss';

export default class SideDtp extends Component {

    state = {
        data: {}
    }

    componentWillReceiveProps(nextProps) {
        // console.log('componentWillReceiveProps', nextProps, this.props);
        if(nextProps.data.id !== this.props.data.id) {
            axios.get(`http://34.71.1.184/api/dtp/${nextProps.data.id}`).then(resp => {
                // console.log('data', resp.data);
                this.setState({ data: resp.data });
            })
        }
    }

    render() {
        const data = this.props.data;
        return ( <div className = { s.sider }>
            <h2 style={{ textDecoration: 'underline' }}> { data.id ? <a href={`/dashboard/dtp/${data.id}`}> { `ДТП ${data.id}` }</a> : '' }</h2>
                { this.state.data.id ? 
                    <p>
                        <b>Дата и время:  </b>{this.state.data.date} {this.state.data.time}<br/>
                        <b>Местоположение:  </b>{this.state.data.place} {this.state.data.street} {this.state.data.house}<br/>
                        <b>Тип ДТП:  </b>{this.state.data.type_dtp}<br/>
                        <b>Широта:  </b>{this.state.data.longitude}<br/>
                        <b>Долгота:  </b>{this.state.data.latitude}<br/>
                    </p> : null 
                }
            </div>
        );
    }
}