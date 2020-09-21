import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import { Row, Col } from 'antd';
import { Upload, Icon, message } from 'antd';

import delay from 'utils/delay';

import Loader from 'components/ui/Loader';

import s from './HomePage.scss';

const { Dragger } = Upload;


export default class HomePage extends Component {
  state = {
    isLoading: true,
    data: []
  };

  componentDidMount() {
    delay(1000).then(() => {
      this.setState({
        isLoading: false,
        data: []
      });
    });
  }

  onChange = (info) => {
    const { status } = info.file;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  }

  handleChange = (e) => {
    console.log(e);
  }

  render() {
    return (
      <>
        {this.state.isLoading ? (
          <Loader size="large"/>
        ) : (
          <div className={s.container}>
            <h1>Загрузка данных</h1>
            <div>
              <Dragger
                 name="file"
                 multiple={false}
                 action="http://localhost:3000/upload"
              >
                <p className="ant-upload-drag-icon">
                  <Icon type="inbox" />
                </p>
                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                <p className="ant-upload-hint">
                  Support for a single or bulk upload. Strictly prohibit from uploading company data or other
                  band files
                </p>
              </Dragger>
            </div>
          </div>
        )}
      </>
    );
  }
}
