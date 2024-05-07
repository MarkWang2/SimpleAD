'use client'
import React from 'react'
import { Button, Checkbox, Form, Input } from 'antd'
import { insertPage } from '@/lib/actions'

const onFinish = async (values) => {
  await insertPage(values);
}
const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo)
}
const Slot =  () => {
  return (
    <div className="p-4 flex flex-col gap-y-4">
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="PageName"
          name="name"
          rules={[
            {
              required: true,
              message: 'Please input your PageName!',
            },
          ]}
        >
          <Input/>
        </Form.Item>

        <Form.Item
          label="AdUnit"
          name="adUnit"
          rules={[
            {
              required: true,
              message: 'Please input your AdUnit!',
            },
          ]}
        >
          <Input/>
        </Form.Item>

        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Slot