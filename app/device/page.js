'use client'
import React from 'react'
import { CloseOutlined } from '@ant-design/icons'
import { Button, Card, Form, Input, Space, Typography } from 'antd'

const App = () => {
  const [form] = Form.useForm()
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
      initialValues={{
        devices: [
              {
                'name': 'mark',
                'viewPort': 'q',
              },
              {
                'name': 'w',
                'viewPort': 'w',
              },
              null,
            ],
          }
      }
    >
      <Form.Item label="List">
        <Form.List name='devices'>
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