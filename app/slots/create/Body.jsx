'use client'

import React from 'react'
import { Button, Form, Input, Space } from 'antd'
import { createSlot } from '@/lib/actions'
import JsonView from 'react18-json-view'
import 'react18-json-view/src/style.css'

const Body = ({ deviceData, initValues }) => {
  const [form] = Form.useForm()
  const slotsConfig = Form.useWatch([], form)
  const onFinish = async (values) => {
    if (typeof (values) !== 'undefined') await createSlot(values)
  }

  const adSlotDefaultValue = () => {
    const sizeMapping = []
    deviceData.devices.forEach(({ name }) => {
      sizeMapping.push({
        device: name,
        sizes: [
          {
            size: '',
          },
        ],
      })
    })
    return {
      'name': '',
      'adUnit': '', sizeMapping
    }
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
        initialValues={initValues}
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
                    {(mappingFields, mappingOpt) => (
                      <div>
                        {mappingFields.map((mappingField) => (
                          <div key={mappingField.key}>
                            <Form.Item noStyle
                                       name={[mappingField.name, 'device']}>
                              <Input placeholder="s'm" type="hidden"/>
                            </Form.Item>
                            <div> {form.getFieldValue([
                              'slots',
                              slotField.name,
                              'sizeMapping',
                              mappingField.name,
                              'device'])}</div>
                            <Form.List name={[mappingField.name, 'sizes']}>
                              {(sizesField, sizeSubOpt) => (
                                <div>
                                  {sizesField.map((sizeField) => (
                                    <div key={sizeField.key}>
                                      <Form.Item
                                        name={[
                                          sizeField.name,
                                          'size']}>
                                        <Input placeholder="s'm"/>
                                      </Form.Item>
                                    </div>
                                  ))}
                                  <Button type="dashed"
                                          onClick={() => sizeSubOpt.add()}
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
              <Button type="dashed" onClick={() => subOpt.add(adSlotDefaultValue())} block>
                + Add Ad Slot
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