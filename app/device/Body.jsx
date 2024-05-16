'use client'

import React from 'react'
import { CloseOutlined } from '@ant-design/icons'
import { Button, Form, Input, Space, Typography } from 'antd'
import { createDevice } from '@/lib/actions'

const Body = ({ data }) => {
  const [form] = Form.useForm()
  const onFinish = async (values) => {
    await createDevice(values.devices)
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
      initialValues={data}
      autoComplete="off"
      onFinish={onFinish}
    >
      <Form.Item label="List">
        <Form.List name="devices">
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
                  <Form.Item noStyle name={[subField.name, 'name']}>
                    <Input placeholder="Device Name"/>
                  </Form.Item>
                  <Form.Item noStyle name={[subField.name, 'viewPort']}>
                    <Input placeholder="Min. ViewPort"/>
                  </Form.Item>
                  <CloseOutlined
                    onClick={() => {
                      subOpt.remove(subField.name)
                    }}
                  />
                </Space>
              ))}
              <Button type="dashed" onClick={() => subOpt.add()}
                      block>
                + Add Sub Item
              </Button>
            </div>
          )}
        </Form.List>
      </Form.Item>

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
export default Body