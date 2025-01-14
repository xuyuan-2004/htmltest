import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme, Watermark } from 'antd';
import About from './page/About';
import Main from './page/Main';
import Class from './page/Class';
import Home from './page/Home/index';
import Login from './page/Login/index';

function App() {
  const [menulist, setmenulist] = useState('')

  const items = [
    {
      key: 'sub1',
      label: '首页',
      icon: <MailOutlined />,
      children: [
        {
          key: '1',
          label: '成员名单',
        },
        {
          key: '2',
          label: '分类名单',
        },
        {
          key: '3',
          label: '投诉名单',
        },
        {
          key: '4',
          label: '总计名单',
        },
      ],
    },
    {
      key: 'sub2',
      label: '功能页',
      icon: <AppstoreOutlined />,
      children: [
        {
          key: '5',
          label: '级别选择',
        },
        {
          key: '6',
          label: '种类选择',
        },
      ],
    },
    {
      key: 'sub4',
      label: '设置',
      icon: <SettingOutlined />,
      children: [
        {
          key: '9',
          label: '基础设置',
        },
        {
          key: '10',
          label: '权限设置',
        },
      ],
    },
  ];

  const { Header, Content, Footer, Sider } = Layout;

  const { token: { colorBgContainer, borderRadiusLG }, } = theme.useToken();

  const navigate = useNavigate('/home')

  const serouter = (e) => {
    if (e.key === '1') {
      navigate('/home'); // 跳转到 Home
      setmenulist('成员名单')
    } else if (e.key === '2') {
      navigate('/class'); // 跳转到 class
      setmenulist('分类名单')
    } else if (e.key === '3') {
      navigate('/about')//跳转到about
      setmenulist('投诉名单')
    } else if (e.key === '4') {
      navigate('/main')//跳转到main
      setmenulist('总计名单')
    }
  };

  return (
    <Watermark content={['统计平台', 'Statistical platform']}>
      <Layout style={{ height: '100vh' }}>
        <Header
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <div className="demo-logo" style={{ color: '#fff', fontWeight: 'bold', fontSize: '22px' }}>统计平台</div>

        </Header>
        <Content
          style={{
            padding: '0 48px',
          }}
        >
          <Breadcrumb
            style={{
              margin: '16px 0',
            }}
          >
          </Breadcrumb>
          <Layout
            style={{
              padding: '24px 0',
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Sider
              style={{
                background: colorBgContainer,
              }}
              width={200}
            >
              <Menu
                onClick={serouter}
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                mode="inline"
                items={items}
              />
            </Sider>
            <Content
              style={{
                padding: '0 24px',
                minHeight: 800,
              }}
            >
              <div style={{ height: '100px', lineHeight: '100px', fontSize: '26px', fontWeight: 'bold' }}>{menulist}</div>
              <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/class" element={<Class />} />
                <Route path="/about" element={<About />} />
                <Route path="/main" element={<Main />} />
                <Route path="*" element={<Login />} />
              </Routes>
            </Content>
          </Layout>
        </Content>
        <Footer
          style={{
            textAlign: 'center',
          }}
        >
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Watermark >
  );
}

export default App;
