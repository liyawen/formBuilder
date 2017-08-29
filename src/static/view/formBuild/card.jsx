import React, { Component } from 'react';
import { Input, Form, Select, Button } from 'antd';
import PropTypes from 'prop-types';
import { DragSource, DropTarget } from 'react-dnd';
import { findDOMNode } from 'react-dom';
import ItemTypes from './itemType';
import './css/drop.less';

const Option = Select.Option;
const FormItem = Form.Item;

const cardSource = {
  beginDrag(props) {

    return {
      id: props.id,
      index: props.index,
      text: props.text,
      type: props.type,
      params: props.params,
    };
  },
};

const cardTarget = {
  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;
    if (dragIndex === hoverIndex) {
      return;
    }
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
    const clientOffset = monitor.getClientOffset();
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;
    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return;
    }
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return;
    }
    props.moveBox(dragIndex, hoverIndex);
    monitor.getItem().index = hoverIndex;
  },
};

@DragSource(ItemTypes.INNER, cardSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
}))
@DropTarget(ItemTypes.INNER, cardTarget, connect => ({
  connectDropTarget: connect.dropTarget(),
}))
export default class Card extends Component {
  static propTypes = {
    isDragging: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    type: PropTypes.string.isRequired,
    getFieldDecorator: PropTypes.func.isRequired,
  };

  render() {
    const { text, isDragging, connectDragSource, connectDropTarget,
      type, getFieldDecorator, params } = this.props;
    console.log('params', params)
    const opacity = isDragging ? 0 : 1;
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
    let result;
    switch (type) {
      case 'Input':
        result = (<FormItem
          {...formItemLayout}
          label={params.label ? params.label : ''}
          hasFeedback
        >
          {getFieldDecorator('email', {
            rules: [{
              required: true, message: `请输入${params.label ? params.label : ''}`,
            }],
          })(
            <Input placeholder={params.label ? params.label : ''} />
          )}
        </FormItem>);
        break;
      case 'Select':
        result = (<Select defaultValue="lucy" style={{ width: 120 }}>
          <Option value="jack">Jack</Option>
          <Option value="lucy">Lucy</Option>
          <Option value="disabled" disabled>Disabled</Option>
          <Option value="Yiminghe">yiminghe</Option>
        </Select>);
        break;
      case 'Button':
        result = (<Button type="primary">{text}</Button>);
        break;
      default:
        result = text;
    }
    return connectDragSource(connectDropTarget(
      <div className="cardDiv" style={{ opacity }}>
        {result}
      </div>,
    ));

    // return connectDragSource(connectDropTarget(
    //   <Input placeholder={text} />,
    // ));
  }
}