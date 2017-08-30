import React from 'react';
import { message, Button, Form } from 'antd';
import Service from '../../service/showForm';
import InputCom from '../formBuild/basicComponents/InputCom';
import SelectCom from '../formBuild/basicComponents/SelectCom';
import ButtonCom from '../formBuild/basicComponents/ButtonCom';

const FormItem = Form.Item;

class ShowView extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      id: this.props.params.id,
      data: [],
    };
  }

  componentDidMount() {
    this.getFormData(this.state.id);
  }

  getFormData(id) {
    Service.getFormData(id)
    .then((res) => {
      if (res.status === 0) {
        this.setState({
          data: JSON.parse(res.data.formData),
        });
      } else {
        message.error(res.msg, 4);
      }
    })
    .catch((error) => {
      message.error(error.message, 5);
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }

  render() {
    const { data } = this.state;
    const parForm = this.props.form;

    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 14,
          offset: 6,
        },
      },
    };

    return (
      <Form onSubmit={this.handleSubmit}>
        {data.map((card, i) => {
          const key = i + 1;
          switch (card.type) {
            case 'Input':
              return (<InputCom key={key} data={card} parForm={parForm} />);
            case 'Select':
              return (<SelectCom key={key} data={card} parForm={parForm} />);
            case 'Button':
              return (<ButtonCom key={key} data={card} parForm={parForm} />);
            default:
              return card.text;
          }
        })};
        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">Register</Button>
        </FormItem>
      </Form>
    );
  }
}
const ShowForm = Form.create()(ShowView);
export default ShowForm;