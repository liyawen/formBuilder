import React, { Component } from 'react';
import { Form, Icon, message, Select, Input, Button, Breadcrumb } from 'antd';
import Container from './container';
import Service from '../../service/formBuild';
import './css/drop.less';

const FormItem = Form.Item;
const Option = Select.Option;

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class createForm extends Component {
  constructor(props) {
    super(props);
    this.getFormData = this.getFormData.bind(this);
    this.state = {
      formData: [],
      isLoading: false
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
        const requestData = Object.assign({}, values);
        requestData.formType = parseInt(requestData.formType, 10);
        requestData.formKey = parseInt(requestData.formKey, 10);
        requestData.formData = JSON.stringify(this.state.formData);
        this.addForm(requestData);
      }
    });
  }

  addForm(requestData) {
    console.log('values', requestData);
    Service.addForm(requestData)
      .then((res) => {
        if (res.status === 0) {
          message.success('提交成功！');
          this.setState({
            isLoading: false,
          });
        } else {
          this.setState({
            isLoading: false,
          });
          message.error(res.msg, 4);
        }
      })
      .catch((error) => {
        this.setState({
          isLoading: false,
        });
        message.error(error.message, 5);
      });
  }

  getFormData(data) {
    this.setState({
      formData: data,
    });
  }

  render() {
    const { getFieldDecorator, getFieldsError, getFieldError,
      isFieldTouched } = this.props.form;
    const { formData } = this.state;
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
        <Container getFormData={this.getFormData} formData={formData} />
      </div>
    );
  }
}

const App = Form.create()(createForm);
export default App;