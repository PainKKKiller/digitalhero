/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import UserPic from 'components/UserPic';
import logout from 'assets/logout.png';

import s from './UserSnippet.scss';


class UserSnippet extends Component {
  static propTypes = {
    image: PropTypes.string,
    userName: PropTypes.string,
    additional: PropTypes.string
  };

  static defaultProps = {
    image: '',
    userName: '',
    additional: ''
  };

  onLogout = () => {
    console.log('logout');
    delete localStorage.loggedIn;
    this.props.history.push('/login');
  }

  render() {
    const { image, userName, additional } = this.props;
    return (
      <div className={s.wrapper}>
        <UserPic image={image} />
        <div className={s.info}>
          <div className={s.userName}>{userName}</div>
          <div className={s.additional}>{additional}</div>
        </div>
        <img onClick={this.onLogout} className={s.logout} src={logout} width={30} height={30} alt="logout"/>
      </div>
    );
  }
}

export default withRouter(UserSnippet);
