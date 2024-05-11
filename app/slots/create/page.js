'use client'

import React, { useEffect, useState } from 'react'
import useSWR from 'swr'
import { CloseOutlined } from '@ant-design/icons'
import { Button, Form, Input, Space, Typography } from 'antd'
import { createSlot } from '@/lib/actions'
import TagEditor from '@/app/components/TagEditor'

const App = () => {
  const [form] = Form.useForm()
  const fetcher = (url) => fetch(url).then((r) => r.json())
  const { data } = useSWR('/api/devices', fetcher)

  const onFinish = async (values) => {createSlot(values)}
  const [tags, setTags] = useState({})

  const setDeviceTags = (device, key) => {
    return (vtags) => {
      form.setFieldsValue(data)
      const fieldsValue = form.getFieldsValue()
      const tagsState = {
        ...tags,
        [key]: { ...tags[key], [device]: [...vtags] },
      }
      fieldsValue.slots[key]['sizeMapping'] = tagsState[key]
      form.setFieldsValue(fieldsValue)
      setTags({ ...tags, [key]: { ...tags[key], [device]: [...vtags] } })
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
      <Form.List name="slots">
        {(subFields, subOpt) => (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              rowGap: 16,
            }}
          >
            {subFields.map((subField) => (
              <Space key={subField.key}>
                <Form.Item label={'name'} name={[subField.name, 'name']}>
                  <Input placeholder="name"/>
                </Form.Item>
                <Form.Item label={'Ad unit'} name={[subField.name, 'adUnit']}>
                  <Input placeholder="Ad unit"/>
                </Form.Item>
                {data?.devices.map(({ name, viewPort }) => {
                  return <Form.Item key={name}
                                    label={`${name} ${viewPort}`}>

                    <TagEditor tags={tags[subField.key]?.[name] || []}
                               setTags={setDeviceTags(name,
                                 subField.key)}></TagEditor>
                  </Form.Item>
                })}
              </Space>
            ))}
            <Button type="dashed" onClick={() => subOpt.add()}
                    block>
              + Add Sub Item
            </Button>
          </div>
        )}
      </Form.List>
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

      <Form.Item noStyle shouldUpdate>
        {() => (
          <Typography>
            <pre>{JSON.stringify(form.getFieldsValue(), null, 2)}</pre>
          </Typography>
        )}
      </Form.Item>
    </Form>
  )
}

export default App