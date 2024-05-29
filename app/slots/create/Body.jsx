'use client'

import React, { useState } from 'react'
import { Button, Form, Input, Space, Collapse, Tooltip } from 'antd'
import { MinusCircleOutlined, InfoCircleOutlined } from '@ant-design/icons'
import { createSlot } from '@/lib/actions'
import JsonView from 'react18-json-view'
import 'react18-json-view/src/style.css'

const Body = ({ deviceData, initValues }) => {
  const [form] = Form.useForm()
  const [pending, setPending] = useState(false)
  const buildSizeMapping = (sizeMapping) => {
    return sizeMapping.reduce((values, { device, sizes }) => (
      {
        ...values,
        [device]: sizes.map(({ size }) => (size)).filter(n => n),
      }
    ), {})
  }
  const slotsConfigFields = Form.useWatch((values) => {
    return {
      slots: values?.slots?.map(
        ({ name, adUnit, slotTargeting, sizeMapping }) => {
          return {
            name,
            adUnit,
            slotTargeting,
            sizeMapping: buildSizeMapping(sizeMapping),
          }
        }),
    }
  }, form)

  const onFinish = async () => {
    if (typeof (slotsConfigFields) !== 'undefined') {
      setPending(true)
      await createSlot(slotsConfigFields)
      setPending(false)
    }
  }

  const adSlotTemplate = () => {
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
      'adUnit': '', sizeMapping,
    }
  }

  const onChange = (key) => {
    console.log(key)
  }

  return (
    <>
      <Form
        labelCol={{
          span: 24,
        }}
        wrapperCol={{
          span: 24,
        }}
        layout="vertical"
        form={form}
        name="dynamic_form_complex"
        style={{
          maxWidth: '100%',
        }}
        autoComplete="off"
        initialValues={initValues}
        onFinish={onFinish}
      >
        <Form.List name="slots">
          {(slotsFields, subOpt) => (
            <Space direction="vertical" style={{ width: '100%' }}>
              {slotsFields.map((slotField) => (
                <Collapse key={slotField.key} defaultActiveKey={['1']}>
                  <Collapse.Panel
                    header={<Form.Item
                      style={{ width: '20%' }}
                      name={[slotField.name, 'name']}
                      rules={[
                        {
                          required: true,
                        },
                      ]}
                    >
                      < Input placeholder="name"/>
                    </Form.Item>}
                    key={slotField.key}>
                    <Space direction="vertical" key={slotField.key}>
                      <Form.Item label={'Ad unit'}
                                 name={[slotField.name, 'adUnit']}>
                        <Input placeholder="Ad unit"/>
                      </Form.Item>
                      <Form.List name={[slotField.name, 'sizeMapping']}>
                        {(mappingFields, mappingOpt) => (
                          <Space direction="vertical">
                            <div>
                              <span>sizeMapping: </span>
                              <Tooltip title="example: 300x250">
                                <InfoCircleOutlined/>
                              </Tooltip>
                            </div>
                            {mappingFields.map((mappingField) => (
                              <Space key={mappingField.key}>
                                <Form.Item noStyle
                                           name={[mappingField.name, 'device']}>
                                  <Input type="hidden"/>
                                </Form.Item>
                                <Space> {form.getFieldValue([
                                  'slots',
                                  slotField.name,
                                  'sizeMapping',
                                  mappingField.name,
                                  'device'])}:</Space>
                                <Form.List name={[mappingField.name, 'sizes']}>
                                  {(sizesField, sizeSubOpt) => (
                                    <Space>
                                      {sizesField.map((sizeField) => (
                                        <Space key={sizeField.key}>
                                          <Form.Item
                                            noStyle
                                            name={[
                                              sizeField.name,
                                              'size']}
                                            rules={[
                                              {
                                                message: 'please use the right way define ad size 330x250',
                                                validator: (_, value) => {
                                                  if (value.includes('x') || value.includes('fluid')) {
                                                    return Promise.resolve()
                                                  } else {
                                                    return Promise.reject(
                                                      new Error(
                                                        'The new password that you entered do not match!'))
                                                  }
                                                },
                                              },
                                            ]}
                                          >
                                            <Input style={{ width: '80px' }}
                                                   size="small"
                                                   placeholder="adSize"/>
                                          </Form.Item>
                                          <MinusCircleOutlined
                                            className="dynamic-delete-button"
                                            onClick={() => sizeSubOpt.remove(
                                              sizeField.name)}
                                          />
                                        </Space>
                                      ))}
                                      <Button type="dashed"
                                              onClick={() => sizeSubOpt.add(
                                                { size: null })}
                                              block>
                                        + Size
                                      </Button>
                                    </Space>
                                  )}
                                </Form.List>
                              </Space>
                            ))}
                          </Space>
                        )}
                      </Form.List>
                      <Form.List name={[slotField.name, 'slotTargeting']}>
                        {(targetingFields, targetingOpt) => (
                          <Space direction="vertical">
                            AdTargeting:
                            {targetingFields.map((targetingField) => (
                              <Space key={targetingField.key}>
                                <Form.Item noStyle
                                           name={[targetingField.name, 'name']}>
                                  <Input placeholder="name"/>
                                </Form.Item>

                                <Form.Item noStyle
                                           name={[
                                             targetingField.name,
                                             'value']}>
                                  <Input placeholder="value"/>
                                </Form.Item>

                                {targetingFields.length > 0 ? (
                                  <MinusCircleOutlined
                                    className="dynamic-delete-button"
                                    onClick={() => targetingOpt.remove(
                                      targetingField.name)}
                                  />
                                ) : null}
                              </Space>
                            ))}
                            <Button type="dashed"
                                    onClick={() => targetingOpt.add(
                                      { name: null, value: null })}
                                    block>
                              + Ad targeting
                            </Button>
                          </Space>
                        )}
                      </Form.List>
                      <Button type="dashed"
                              onClick={() => subOpt.remove(slotField.name)}
                              block>
                        - Ad Slot
                      </Button>
                    </Space>

                  </Collapse.Panel>
                </Collapse>
              ))}
              <Button type="dashed"
                      onClick={() => subOpt.add(adSlotTemplate())}
                      block>
                + Ad Slot
              </Button>
            </Space>

          )}
        </Form.List>
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            {pending ? 'loading...' : 'Save'}
          </Button>

          <Button onClick={() => { form.resetFields() }} type="default"
                  htmlType="submit">
            Discard
          </Button>
        </Form.Item>
      </Form>
      <JsonView src={slotsConfigFields} customizeCopy={(node) => {
        if (Object.keys(node).includes('slots')) {
          const devices = deviceData.devices.reverse().reduce(
            (values, { name, viewPort }) => ({
              [name]: viewPort.split('x').
                map(Number), ...values,
            }), {})
          const slotsConfigData = { ...node, devices }
          return navigator.clipboard.writeText(
            `const slotsConfig = ${JSON.stringify(slotsConfigData, null, 2)}
export default slotsConfig`)

        }
        return navigator.clipboard.writeText(
          JSON.stringify(node, null, 2))
      }}/>
    </>
  )
}

export default Body