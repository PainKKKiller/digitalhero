/* eslint-disable react/sort-comp */
import React, { PureComponent } from 'react';
import { Map, TileLayer } from 'react-leaflet';
import HeatmapLayer from 'react-leaflet-heatmap-layer';
import { Select } from 'antd';
import axios from 'axios';


import s from './openmap.scss';

const { Option } = Select;



export default class OpenMap extends PureComponent {

    state = {
        lat: 55.795181,
        lng: 49.119280,
        zoom: 7,
        height: 500,
        data: [],
        year: 2017,
    }

    componentWillMount() {
        this.updateDimensions();
        // axios.get('http://165.227.132.216:8080/api/dtp/?fields=id,latitude,longitude,deaths,child_deaths,wounded&date__gte=2019-01-01&limit=13175').then(resp => {
        axios.get('http://165.227.132.216:8080/api/dtp-places/?format=json&limit=20000').then(resp => {
            console.log('data', resp.data.results);
            this.setState({ data: resp.data.results });
        })
    }
    
    componentDidMount() {
        window.addEventListener("resize", this.updateDimensions.bind(this))
    }
    
    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions.bind(this))
    }

    updateDimensions() {
        const height = window.innerWidth >= 992 ? window.innerHeight : 400
        this.setState({ height })
    }

  /*   makeIntensity(deaths, child_deaths, wounded) {
        // считаем интенсивность с весами
        // т.е. раненые имеет вес половину от смертей
        return parseInt(deaths, 10) + parseInt(child_deaths, 10) + (0.5 * parseInt(wounded, 10));
    } */

    filterByYear(data, year) {
        return data.map(dtp => {
            return { 
                id: dtp.id,
                latitude: dtp.latitude,
                longitude: dtp.longitude,
                intensity: dtp[`year${year}`]
            }
        })
    }

    handleChange = (year) => {
        this.setState({ year: parseInt(year, 10)});
    }


    render() {
        const position = [this.state.lat, this.state.lng];
        return (
            <Map style={{ height: this.state.height }} className={s.leaflet} center={position} zoom={this.state.zoom}>
                <HeatmapLayer
                    points={this.filterByYear(this.state.data, this.state.year)}
                    longitudeExtractor={m => m.latitude}
                    latitudeExtractor={m => m.longitude}
                    intensityExtractor={m => m.intensity} 
                />
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url='https://{s}.tile.osm.org/{z}/{x}/{y}.png'
                />
            <div className={s.card}>
                <Select defaultValue="2017" style={{ width: '100%' }} onChange={this.handleChange}>
                    <Option value="2017">2017</Option>
                    <Option value="2018">2018</Option>
                    <Option value="2019">2019</Option>
                    <Option value="2020">2020</Option>
                </Select>
            </div>
          </Map>
        );
    }

}