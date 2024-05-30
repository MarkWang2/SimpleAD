'use client'

import { AntdRegistry } from '@ant-design/nextjs-registry'
import { Breadcrumb, Layout, Menu, theme } from 'antd'
import { usePathname } from 'next/navigation'
import Script from 'next/script'
import React from 'react'
import {
  LaptopOutlined,
  NotificationOutlined,
} from '@ant-design/icons'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const { Header, Content, Footer, Sider } = Layout

const items =
  [
    {
      key: `1`,
      icon: React.createElement(LaptopOutlined),
      label: `Ad Configuration`,
      children: [
        { key: 'slot', label: 'Slot Setup' },
        { key: 'device', label: 'Devices & Viewports' }],
    },
  ]

const LayoutBody = ({ children }) => {
  const router = useRouter()
  const paths = usePathname()
  const pathNames = paths.split('/').
    filter((path) => path).
    map((link) => ({ path: `/${link}`, title: link }))

  function itemRender (currentRoute, params, items, paths) {
    const isLast = currentRoute?.path === items[items.length - 1]?.path

    return isLast ? (
      <span>{currentRoute.title}</span>
    ) : (
      <Link href={`/${paths.join('/')}`}>{currentRoute.title}</Link>
    )
  }

  const handleMenuClick = ({ item, key, keyPath, domEvent }) => {
    if (key === 'slot')
      return router.push('/slots')
    if (key === 'device')
      return router.push('/devices')
  }
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken()
  return (<AntdRegistry>
    <Layout>
      <Script
        async
        src="https://www.googletagservices.com/tag/js/gpt.js"
      />
      <Script id="show-banner">
        {` var googletag = googletag || {}; googletag.cmd = googletag.cmd || [];`}
      </Script>
      <Content
        style={{
          padding: '0 48px',
        }}
      >
        <Breadcrumb itemRender={itemRender} items={pathNames}/>
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
              mode="inline"
              defaultSelectedKeys={['slot']}
              defaultOpenKeys={['1']}
              style={{
                height: '100%',
              }}
              onClick={handleMenuClick}
              items={items}
            />
          </Sider>
          <Content
            style={{
              padding: '0 24px',
              minHeight: 280,
            }}
          >

            {children}

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
  </AntdRegistry>)
}

export default LayoutBody