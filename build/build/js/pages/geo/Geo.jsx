/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/sort-comp */
import React, { Component } from 'react';
import { Layout, Breadcrumb, Menu, Mention, Badge } from 'antd';
import { withRouter } from 'react-router-dom';
import { Map, Marker, Popup, TileLayer, Polyline } from 'react-leaflet';
import { icon } from 'leaflet';
import axios from 'axios';
import SideDtp from './comps/Dtp';


import { pipeline, defects } from './mocks/Geometry';

import s from './Geo.scss';



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

class Geo extends Component {

    state = {
      sider: { },
      data: [],
      lat: 55.795181,
      lng: 49.119280,
      zoom: 11
    }

    componentWillMount() {
      axios.get('http://65.227.132.216:8080/api/dtp/?fields=id,latitude,longitude,deaths,child_deaths,wounded,child_wounded&date__gte=2019-01-01&limit=13175').then(resp => {
          console.log('data', resp.data.results);
          this.setState({ data: this.transformData(resp.data.results) });
      })
    }

    transformData(data) {
      const result = [];
      for (let i = 0; i < data.length; i++) {
        result.push({
          lanlng: [data[i].longitude, data[i].latitude],
          type: (data[i].deaths || data[i].child_deaths) ? 1 : 0,
          id: data[i].id
        })
      }
      return result;
    }

    onMarkerClick = (e) => {
      console.log(e, e.target.options.data);
      this.setSider(e.target.options.data);
    }

    setSider(data) {
      this.setState({ sider: data });
    }
  
    render() {
      const position = [this.state.lat, this.state.lng];
      return (
        <>
          <div className={s.container}>
            <h1>Карта ДТП по республике Татарстан</h1>
            <div className={s.map}>
              <div className={s.mapheader}>
                <div className={s.legend}>
                  <Badge className={s.badge} status="error" text="ДТП со смертельным исходом" />
                  <Badge status="warning" text="ДТП с ранениями" />
                </div>
              </div>
              <Map className={s.leaflet} center={position} zoom={this.state.zoom}>
                <TileLayer
                  attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                  url='https://{s}.tile.osm.org/{z}/{x}/{y}.png'
                />
               {/*  <Marker icon={redIcon} position={position} onClick={this.onMarkerClick}>
                  <Popup>
                    A pretty CSS3 popup. <br/> Easily customizable.
                  </Popup>
                </Marker>
                <Marker icon={yellowIcon} position={[51.51, -0.12]} onClick={this.onMarkerClick}>
                  <Popup>
                    A pretty CSS3 popup. <br/> Easily customizable.
                  </Popup>
                </Marker> */}
                {
                  this.state.data.map((dtp, i) => {
                    return <Marker key={i} data={dtp} icon={ dtp.type === 1  ? redIcon : orangeIcon} position={dtp.lanlng} onClick={this.onMarkerClick.bind(dtp)}/>;
                  })
                }
                <Polyline color="lime" positions={pipeline} />
              </Map>
              <div className={s.rightsider}>
                <SideDtp data={this.state.sider}/>
              </div>
            </div>
          </div>
        </>
      );
    }
  }
  
  export default withRouter(Geo);