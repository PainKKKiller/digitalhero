import React, { Component } from 'react';
import { Layout, Breadcrumb, Menu, Mention, Icon } from 'antd';

import { Route, withRouter, Switch, Link } from 'react-router-dom';

import delay from 'utils/delay';
import User from 'utils/user';

import HomePage from 'pages/home';
import Page1 from 'pages/page1';
import Page2 from 'pages/page2';
import Settings from 'pages/settings';
import Geo from 'pages/geo';

// import logoBig from 'assets/logo-gazprom-neft.png';
import logoBig from 'assets/new_full_logo_big.png';
// import logoSmall from 'assets/logo-gazprom-neft-small.png';
import logoSmall from 'assets/new_full_logo_small.png';

import s from './Admin.scss';
import Loader from 'components/ui/Loader';
import UserSnippet from 'components/UserSnippet';



const { Header, Footer, Sider, Content } = Layout;

class Admin extends Component {

  state = {
    isLoading: true,
    collapsed: false,
    /* user: User.getUser(), */
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

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    const { match } = this.props;
    return (
      <>
        {this.state.isLoading ? (
          <Loader size="large"/>
        ) : (
          <>
          <Layout style={{ height: "100vh" }}>
            <Sider className={s.sider} width={256} trigger={null} theme="light" collapsible collapsed={this.state.collapsed}>
              <div className={s.brand}>
                { this.state.collapsed ? <img src={logoSmall} width={44} height={71} alt=""/> : <img src={logoBig} width={144} height={71} alt=""/> }
              </div>
              <Menu mode="inline" defaultSelectedKeys={['/']}>
                <Menu.Item key="/">
                  <Link to="/dashboard/">
                    <Icon type="home" />
                    <span>Таблица ДТП</span>
                  </Link>
                </Menu.Item>
                <Menu.Item key="/geo">
                  <Link to="/dashboard/geo">
                    <Icon type="flag" />
                    <span>Карта ДТП</span>
                  </Link>
                </Menu.Item>
                <Menu.Item key="/settings">
                  <Link to="/dashboard/settings">
                    <Icon type="setting" />
                    <span>Настройки</span>
                  </Link>
                </Menu.Item>
              </Menu>
            </Sider>
            <Layout>
              <Header style={{ background: '#fff', height: '72px', paddingLeft: '0', position: 'relative' }}>
                <div className={s.toggler}>
                  <Icon
                    className="trigger"
                    type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                    onClick={this.toggle}
                  />
                </div>
                <UserSnippet userName="Guest" additional="Admin" />
              </Header>
              <Content>
                <Route exact path={`${match.path}`} component={Page1} />
                <Route exact path={`${match.path}/dtp/:id`} component={Page2} />
                <Route exact path={`${match.path}/geo`} component={Geo} />
                <Route exact path={`${match.path}/settings`} component={Settings} />
              </Content>
            </Layout>
          </Layout>
        </>
        )}
      </>
    );
  }
}

export default withRouter(Admin);
