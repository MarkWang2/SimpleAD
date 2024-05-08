'use client'

import React, { useEffect, useState } from 'react'
import useSWR from 'swr'
import { CloseOutlined } from '@ant-design/icons'
import { Button, Form, Input, Space, Typography } from 'antd'
import { createDevice } from '@/lib/actions'
import TagEditor from '@/app/components/TagEditor'

const App = () => {
  const [form] = Form.useForm()
  const fetcher = (url) => fetch(url).then((r) => r.json())
  const { data } = useSWR('/api/devices', fetcher)

  const onFinish = async (values) => {
    await createDevice(values.devices)
  }
  const [tags, setTags] = useState({})

  const setDeviceTags = (device) => {
    return (vtags) => {
      setTags({ ...tags, [device]: [...vtags] })
    }
  }

  return (
    <Form
      labelCol={{
        span: 6,
      }}
      wrapperCol={{
        span: 18,
      }}
      form={form}
      name="dynamic_form_complex"
      style={{
        maxWidth: 600,
      }}
      autoComplete="off"
      onFinish={onFinish}
    >
      {data?.devices.map(({name, viewPort}) => {
        return <Form.Item key={name}
                          label={`${name} ${viewPort}`}>

          <TagEditor tags={tags[name] || []}
                     setTags={setDeviceTags(name)}></TagEditor>
        </Form.Item>
      })}

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Save
        </Button>

        <Button type="default" htmlType="submit">
          Discard
        </Button>
      </Form.Item>

    </Form>
  )
}

export default App