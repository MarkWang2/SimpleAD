'use client'

import React, { useEffect, useState } from 'react'
import { Button, Form, Input, Space, Typography } from 'antd'
import { createSlot } from '@/lib/actions'
import TagEditor from '@/app/components/TagEditor'
import JsonView from 'react18-json-view'
import 'react18-json-view/src/style.css'
import { CloseOutlined } from '@ant-design/icons'

const Body = ({ deviceData, initValues }) => {
  const [form] = Form.useForm()
  const slotsConfig = Form.useWatch([], form)
  const onFinish = async (values) => {
    if (typeof (values) !== 'undefined') await createSlot(values)
  }

  const innit = {
    'slots': [
      {
        'name': 'mark',
        'adUnit': 'dfs',
        'sizeMapping': [
          {
            device: 'sm',
            sizes: [
              { size: '300x250' },
              { size: '320x600' },
            ],
          },
          {
            device: 'md',
            sizes: [
              { size: '600x250' },
              { size: '620x600' },
            ],
          },
        ],
      },
    ],
  }

  return (
    <>
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
        initialValues={innit}
        onFinish={onFinish}
      >

        <Form.List name="slots">
          {(slotsFields, subOpt) => (
            <div>
              {slotsFields.map((slotField) => (
                <Space key={slotField.key}>
                  <Form.Item label={'name'} name={[slotField.name, 'name']}>
                    <Input placeholder="name"/>
                  </Form.Item>
                  <Form.Item label={'Ad unit'}
                             name={[slotField.name, 'adUnit']}>
                    <Input placeholder="Ad unit"/>
                  </Form.Item>
                  <Form.List name={[slotField.name, 'sizeMapping']}>
                    {(mappingFields, subOpt) => (
                      <div>
                        {mappingFields.map((mappingField) => (
                          <div key={mappingField.key}>
                            <Form.Item label={'device'}
                                       name={[mappingField.name, 'device']}>
                              <Input placeholder="s'm"/>
                            </Form.Item>
                            <Form.List name={[mappingField.name, 'sizes']}>
                              {(sizesField, subOpt) => (
                                <div>
                                  {sizesField.map((sizeField) => (
                                    <div key={sizeField.key}>
                                      <Form.Item label={'device'}
                                                 name={[
                                                   sizeField.name,
                                                   'size']}>
                                        <Input placeholder="s'm"/>
                                      </Form.Item>
                                    </div>
                                  ))}
                                  <Button type="dashed"
                                          onClick={() => subOpt.add()}
                                          block>
                                    + Add Ad Size
                                  </Button>
                                </div>
                              )}
                            </Form.List>
                          </div>
                        ))}
                      </div>
                    )}
                  </Form.List>
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
      </Form>
      <JsonView src={slotsConfig} customizeCopy={(node) => {
        if (Object.keys(node).includes('slots', 'devices')) {
          return navigator.clipboard.writeText(
            `const slotsConfig=${JSON.stringify(node, null, 2)}`)
        }
        return navigator.clipboard.writeText(
          JSON.stringify(node, null, 2))
      }}/>
    </>
  )
}

export default Body