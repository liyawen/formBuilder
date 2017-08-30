import React from 'react';
import { message, Button, Form, Input } from 'antd';

const FormItem = Form.Item;

class InputCom extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { getFieldDecorator } = this.props.parForm;
    const data = this.props.data;
    const params = data.params;
    console.log(data)
    const formItemLayout = {
      labelCol: { span: 9 },
      wrapperCol: { span: 15 },
    };

    return (
      <FormItem
        {...formItemLayout}
        label={params.label}
        hasFeedback
      >
        {getFieldDecorator('email', {
          rules: [{
            required: true, message: 'Please input your E-mail!',
          }],
        })(
          <Input />
        )}
      </FormItem>
    );
  }
}

export default InputCom;