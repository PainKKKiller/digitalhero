import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Button, Row, Form, Icon, Input } from 'antd';
import User from 'utils/user';
import logoBig from 'assets/new_full_logo_big.png';

import s from './login.scss';

const { Item } = Form;


class Login extends PureComponent {

  handleOk = () => {
    const { form } = this.props
    const { validateFieldsAndScroll } = form;
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return
      }
      // тут проверяем юзера и редиректим на админку
      if (values.password === 'guest' && values.username === 'guest') {
        console.log('user log in');
        User.setUser({ name: values.username, role: 'admin' });
        localStorage.setItem('loggedIn', true);
        this.props.history.push('/dashboard/');
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { form } = this.props;
    return (
      <Fragment>
        <div className={s.form}>
          <div className={s.logo}>
          <img src={logoBig} width={144} height={71} alt=""/>
           {/*  <Logo width="40" height="33"/>
            <span>Defectoscope</span> */}
          </div>
          <form>
            <Item
              hasFeedback
            > {getFieldDecorator('username', {
              rules: [
                {
                  required: true,
                  message: 'Please input your login',
                },
              ],
            })(<Input
                  id="login" 
                  onPressEnter={this.handleOk}
                  placeholder="Username" />)}
            </Item>
            <Item
              hasFeedback
            > {getFieldDecorator('password', {
              rules: [
                {
                  enum: 'guest',
                  message: 'Your password incorrect',
                },
                {
                  required: true,
                  message: 'Please input your password'
                }
              ],
            })(<Input
                  id="password"
                  onPressEnter={this.handleOk}
                  placeholder="Password" />)}
            </Item>
            <Row>
              <Button
                type="primary"
                onClick={this.handleOk}
              >
              Sign in
              </Button>
              <p>
                <span>
                  Username
                  ：guest
                </span>
                <span>
                  Password
                  ：guest
                </span>
              </p>
            </Row>
          </form>
        </div>
        <div className={s.footer}>
            
        </div>
      </Fragment>
    )
  }
}

Login.propTypes = {
  form: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default Form.create({ name: 'Login' })(Login);
