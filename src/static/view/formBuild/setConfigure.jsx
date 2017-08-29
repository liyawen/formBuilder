import React, { Component } from 'react';
import { Form, Icon, Button, Input, Modal } from 'antd';

const FormItem = Form.Item;

class ConfigureView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      params: props.data.params,
      id: props.targetId,
      visible: true,
    };
  }

  handleOk = (e) => {
    console.log(e);
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      this.setState({
        params: {
          label: values.label,
        },
        visible: false,
      }, () => {
        this.props.onUpdate(this.state.id, this.state.params);
      });
    });
  }
  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }

  render() {
    const { params, id } = this.state;
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
      },
    };

    return (
      <Modal
        title="组件配置"
        visible={this.state.visible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
      >
        <Form onSubmit={this.handleOk}>
          <FormItem
            {...formItemLayout}
            label="label"
            hasFeedback
          >
            {getFieldDecorator('label', {
              rules: [{
                required: true, message: '请输入label！',
              }],
            })(
              <Input />
            )}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

ConfigureView.defaultProps = {
  data: {
    params: {},
  },
  onUpdate: f => f  // 默认是个什么都不做的函数
};

const SetConfigure = Form.create()(ConfigureView);
export default SetConfigure;