import * as React from 'react';
import {Breadcrumb, Layout, Menu} from "antd";
import {UserOutlined} from "@ant-design/icons";
import {Link, Route} from "dva/router";
import {lazy} from "react";
import styles from './Index.less';
import MyG6 from '@pages/MyG6/MyG6';
import CustomFlowPage from "@pages/D3Dagre";
import SDFlow from "@pages/SDFlow";

const Todos = lazy(() => import('@pages/Todo/Todos'));
const Products = lazy(() => import('@pages/Products'));

const {SubMenu} = Menu;
const {Header, Content, Sider} = Layout;

const Index = (history) => {
  return (
    <Layout style={{height: '100vh'}}>
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
              <Menu.Item key="/frame/todos"><Link to="/frame/todos">Todos</Link></Menu.Item>
              <Menu.Item key="/frame/products"><Link to="/frame/products">Products</Link></Menu.Item>
              <Menu.Item key="/frame/g6"><Link to="/frame/g6">G6</Link></Menu.Item>
              <Menu.Item key="/frame/d3-dagre"><Link to="/frame/d3-dagre">D3-dagre-react</Link></Menu.Item>
              <Menu.Item key="/frame/sd-flow"><Link to="/frame/sd-flow">SDFlow</Link></Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout style={{padding: '0 24px 24px'}}>
          <Breadcrumb style={{margin: '16px 0'}}>
            {history.location.pathname.split('/').map((o, index) => {
              if (index > 0) {
                return <Breadcrumb.Item key={index}><span style={{textTransform: 'capitalize'}}>{o}</span></Breadcrumb.Item>;
              }
            })}
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
            <Route path="/frame/products" component={Products}/>
            <Route path="/frame/todos" component={Todos}/>
            <Route path="/frame/g6" component={MyG6}/>
            <Route path="/frame/d3-dagre" component={CustomFlowPage}/>
            <Route path="/frame/sd-flow" component={SDFlow}/>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

Index.prototype = {};
export default Index;
