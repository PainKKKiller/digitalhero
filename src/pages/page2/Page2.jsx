import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Map, Marker, Popup, TileLayer, Polyline } from 'react-leaflet';
// import { Row, Col, Upload, Icon, Table, Select, Tag } from 'antd';
import { icon } from 'leaflet';
import axios from 'axios';

import Plot from 'react-plotly.js';

import s from './Page2.scss';


// https://github.com/pointhi/leaflet-color-markers
const redIcon = icon({
  iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const orangeIcon = icon({
  iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});



class Page2 extends Component {

  state = {
    lat: 55.795181,
    lng: 49.119280,
    zoom: 14,
    data: { }
  }

  componentWillMount() {
    axios.get(`http://65.227.132.216:8080/api/dtp/${this.props.match.params.id}`).then(resp => {
        console.log('data', resp.data);
        this.setState({ lat: resp.data.longitude, lng: resp.data.latitude, data: resp.data })
    })
  }
  

  getType(data) {
    return (data.deaths || data.child_deaths) ? 1 : 0;
  }


  render() {
    const position = [this.state.lat, this.state.lng];
    return (
      <>
        <div className={s.container}>
        <h1>{`Дорожно-транспортное проишествие ${this.props.match.params.id}`}</h1>
          <div className={s.flex_cont}>
            <div className={s.card}>
            <Map className={s.leaflet} center={position} zoom={this.state.zoom}>
                  <TileLayer
                      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                      url='https://{s}.tile.osm.org/{z}/{x}/{y}.png'
                  />
                  <Marker icon={this.getType(this.state.data) === 1 ? redIcon : orangeIcon} position={position}>
                  {/*  <Popup>
                      A pretty CSS3 popup. <br/> Easily customizable.
                    </Popup> */}
                  </Marker>
            </Map>
            </div>
            <div className={s.rightcard}>
                <b>Дата и время:  </b>{this.state.data.date} {this.state.data.time}<br/>
                <b>Местоположение:  </b>{this.state.data.place} {this.state.data.street} {this.state.data.house}<br/>
                <b>Тип ДТП:  </b>{this.state.data.type_dtp}<br/>
                <b>Пострадавшие:  </b>{this.state.data.deaths ? `погибло ${this.state.data.deaths}` : '' } {this.state.data.wounded ? `ранено ${this.state.data.wounded}` : '' }<br/>
                <b>Пострадавшие дети:  </b>{this.state.data.child_deaths ? `погибло ${this.state.data.child_deaths}` : '' } {this.state.data.child_wounded ? `ранено ${this.state.data.child_wounded}` : '' }<br/>
                <b>ДТП зарегистрировано:  </b>{this.state.data.dps}<br/>
                <b>Тип покрытия:  </b>{this.state.data.type_of_coating}<br/>
                <b>Широта:  </b>{this.state.data.longitude}<br/>
                <b>Долгота:  </b>{this.state.data.latitude}<br/>
            </div>
          </div>    
          </div>
      </>
    );
  }
}

export default withRouter(Page2);
