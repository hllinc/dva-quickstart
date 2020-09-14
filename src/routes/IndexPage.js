import React from 'react';
import styles from './IndexPage.css';
import {Link, Route, Switch} from 'dva/router';
import {Breadcrumb, Layout, Menu} from "antd";
import {UserOutlined} from "@ant-design/icons";
import Todos from "./Todo/Todos";
import Products from "./Products";

const {SubMenu} = Menu;
const {Header, Content, Sider} = Layout;

const IndexPage = ({history}) => {
  return (
    <Layout style={{height:'100vh'}}>
      <Header className="header">
        <div className={styles.logo}>DVA TEST</div>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
          <Menu.Item key="1">Nav 1</Menu.Item>
          <Menu.Item key="2">Nav 2</Menu.Item>
          <Menu.Item key="3">Nav 3</Menu.Item>
        </Menu>
      </Header>
      <Layout>
        <Sider width={200} className={styles.siteLayoutBackground}>
          <Menu
            mode="inline"
            selectedKeys={[history.location.pathname]}
            defaultOpenKeys={['sub1']}
            style={{height: '100%', borderRight: 0}}
          >
            <SubMenu key="sub1" icon={<UserOutlined/>} title="Menu">
              <Menu.Item key="/todo"><Link to="/todo">Todos</Link></Menu.Item>
              <Menu.Item key="/products"><Link to="/products">Products</Link></Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout style={{padding: '0 24px 24px'}}>
          <Breadcrumb style={{margin: '16px 0'}}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>{history.location.pathname.replaceAll('/','')}</Breadcrumb.Item>
          </Breadcrumb>
          <Content
            className={styles.siteLayoutBackground}
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              overflow: 'auto'
            }}
          >
            <Switch>
              <Route path="/todo" component={Todos}/>
              <Route path="/products" component={Products}/>
            </Switch>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}

IndexPage.propTypes = {};

export default IndexPage;
