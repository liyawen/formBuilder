import React, { Component } from 'react';
import { Form, Icon, Select, Input, Button, Breadcrumb } from 'antd';
import Container from './container';
import './css/drop.less';

const FormItem = Form.Item;
const Option = Select.Option;

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class createForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      basicInfo: {},
    };
  }

  componentDidMount() {
    // To disabled submit button at the beginning.
    this.props.form.validateFields();
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }

  render() {
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
    const formNameError = isFieldTouched('formName') && getFieldError('formName');
    const formKeyError = isFieldTouched('formKey') && getFieldError('formKey');

    return (
      <div>
        <div className="breadRow">
          <Breadcrumb separator=">">
            <Breadcrumb.Item>表单设计</Breadcrumb.Item>
            <Breadcrumb.Item>新建表单</Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div className="basicRow">
          <Form layout="inline" onSubmit={this.handleSubmit}>
            <FormItem
              label="表单名称"
              validateStatus={formNameError ? 'error' : ''}
              help={formNameError || ''}
            >
              {getFieldDecorator('formName', {
                rules: [{ required: true, message: '请输入表单名称!' }],
              })(
                <Input placeholder="表单显示名称" />
              )}
            </FormItem>
            <FormItem
              label="表单key值"
              validateStatus={formKeyError ? 'error' : ''}
              help={formKeyError || ''}
            >
              {getFieldDecorator('formKey', {
                rules: [{ required: true, message: '请输入表单key值，格式为 英文+数字 !' }],
              })(
                <Input placeholder="英文+数值，且不能重复" />
              )}
            </FormItem>
            <FormItem
              label="表单类型"
            >
              {getFieldDecorator('formType', {
                rules: [{ required: true, message: '请选择表单类型' }],
                initialValue: '0',
              })(
                <Select
                  onChange={this.handleSelectChange}
                  style={{ width: '100px' }}
                >
                  <Option value="0">基本表</Option>
                  <Option value="1">审批表</Option>
                </Select>
              )}
            </FormItem>
            <FormItem
              label="备注"
            >
              {getFieldDecorator('remarks')(
                <Input />
              )}
            </FormItem>
            <FormItem>
              <Button type="primary" ghost>表单预览</Button>
              &nbsp;&nbsp;
              <Button>取消</Button>
              &nbsp;&nbsp;
              <Button
                type="primary"
                htmlType="submit"
                disabled={hasErrors(getFieldsError())}
              >
                创建表单
              </Button>
            </FormItem>
          </Form>
        </div>
        <hr />
        <Container />
      </div>
    );
  }
}

const App = Form.create()(createForm);
export default App;