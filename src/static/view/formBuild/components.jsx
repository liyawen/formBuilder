import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DragSource } from 'react-dnd';
import ItemTypes from './itemType';
import './css/drop.less';

let counter = 0;

const boxSource = {
  beginDrag(props) {
    counter += 1;
    return {
      id: props.id,
      index: props.index,
      key: counter,
    };
  },

};

@DragSource(ItemTypes.OUTER, boxSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
}))
export default class Components extends Component {
  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired,
  };

  render() {
    const { isDragging, connectDragSource } = this.props;
    const { text } = this.props;
    const opacity = isDragging ? 0 : 1;

    return (
      // <Card title="基础组件">
        connectDragSource(
          <div className="componentDiv" style={{ opacity }}>
            {text}
          </div>,
        )
      // </Card>
    );
  }
}