/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/sort-comp */
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Row, Col, Input,  Table, Button, Icon } from 'antd';
import Highlighter from 'react-highlight-words';
import cx from 'classnames';
import DefectType from 'utils/DefectType';
import axios from 'axios';

import delay from 'utils/delay';

import Chart from "react-apexcharts";

import Loader from 'components/ui/Loader';

import s from './Page1.scss';

import Attention from 'assets/attention.png';
import Ruble from 'assets/ruble.png';


class Page1 extends Component {

  state = {
    searchText: '',
    defects_for_hist: {},
    stats: {},
    dtps: [],
    loading: false,
    pagination: {
      current: 1,
      pageSize: 10,
      total: 100,
    },
  };

  componentDidMount() {
    axios.get('http://65.227.132.216:8080/api/dtp/?offset=0&limit=10')
    .then(resp => {
      // console.log(resp.data.results);
      const stats = this.makeStat(resp.data);
      this.setState({ dtps: resp.data.results, stats, pagination: { ...this.state.pagination, total: resp.data.count } });
    })
  }

 makeStat(data) {
    const dtp_count = data.count;
    const total_money = 200;
    // console.log('stat', dtp_count, total_money);
    return { dtp_count, total_money };
  }


  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm)}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
          Reset
        </Button>
      </div>
    ),
    filterIcon: filtered => (
      <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: text => (
      <Highlighter
        highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
        searchWords={[this.state.searchText]}
        autoEscape
        textToHighlight={String(text)}
      />
    ),
  });

  handleSearch = (selectedKeys, confirm) => {
    confirm();
    this.setState({ searchText: selectedKeys[0] });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: '' });
  };

  onClick = record => {
    console.log('click', record);
    this.props.history.push(`/dashboard/dtp/${record.id}`);
  }

  handleTableChange = (pagination, filters, sorter) => {
    console.log('handleTableChange', pagination);
    this.fetch({
      sortField: sorter.field,
      sortOrder: sorter.order,
      pagination,
      ...filters,
    });
  };

  fetch = (params = {}) => {
    this.setState({ loading: true });
    const offset = params.pagination.current === 1 ? 0 : (params.pagination.current - 1) * 10;
    axios.get(`http://65.227.132.216:8080/api/dtp/?offset=${offset}&limit=10`)
    .then(resp => {
      console.log(resp);
      this.setState({ 
        dtps: resp.data.results,
        loading: false,
        pagination: { 
          ...this.state.pagination,
          current: params.pagination.current,
          total: resp.data.count
        } 
      });
    });
  };


  render() {
    const columns = [
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        width: '10%',
        ...this.getColumnSearchProps('key'),
      },
      {
        title: 'Дата',
        dataIndex: 'date',
        key: 'date',
        width: '10%',
        render: (text, record) => {
          return `${text}`;
        },
        ...this.getColumnSearchProps('date'),
      },
      {
        title: 'Время',
        dataIndex: 'time',
        key: 'time',
        width: '10%',
        render: (text, record) => {
          return `${text}`;
        },
        ...this.getColumnSearchProps('date'),
      },
      {
        title: 'Тип ДТП',
        dataIndex: 'type_dtp',
        key: 'type_dtp',
        ...this.getColumnSearchProps('type_dtp'),
      },
      {
        title: 'Местоположение',
        dataIndex: 'place',
        key: 'place',
        ...this.getColumnSearchProps('place'),
      },
     /*  {
        title: 'Степень тяжести',
        dataIndex: 'deaths',
        key: 'deaths',
        render: (text, record) => {
          console.log('render', text, record);
          return `${text} погибло, ${record.wounded} ранено`;
        },
        ...this.getColumnSearchProps('deaths'),
      }, */
    ];
    const options = {
      labels: Object.keys(this.state.defects_for_hist),
      staticPlot: true,
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: 'top'
          }
        }
      }]
    }
    const series = [{
        data: Object.values(this.state.defects_for_hist)
      }];
    return (
      <>
        <div className={s.container}>
          <h1>Аналитическая сводка</h1>
          <div className={s.stat}>
            <div className={s.statItem}>
              {/* <div className={cx(s.circle, s.red)}/> */}
              <img className={s.pngicon} src={Attention} alt=""/>
              <h1>{this.state.stats.dtp_count}</h1>
              <p>всего ДТП</p>
              <div className={s.redTxt}><Icon type="caret-up"/>22</div>
            </div>
            <div className={s.statItem}>
              <img className={s.pngicon} src={Ruble} alt=""/>
              <h1>{`${this.state.stats.total_money}млн`}</h1>
              <p> </p>
            </div>
            <div className={s.grafic}>
              <Chart options={options} series={series} type="bar" height="250" />
            </div>
          </div>
          <h1>Улицы</h1>
          <div style={{ backgroundColor: 'white', padding: '0 10px', marginTop: '20px' }}>
          <Table
              rowKey="id"
              loading={this.state.loading}
              pagination={this.state.pagination}
              onChange={this.handleTableChange}
              onRow={(record) => {
                return {
                  onClick: event => { this.onClick(record) }
                };
              }}
              columns={columns} dataSource={this.state.dtps} />
          </div>
        </div>
      </>
    );
  }
}

export default withRouter(Page1);
