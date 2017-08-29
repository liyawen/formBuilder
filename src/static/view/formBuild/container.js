import React, { Component } from 'react';
import { Card } from 'antd';
import update from 'react/lib/update';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Components from './components';
import Space from './canvasSpace';
import './css/drop.less';

@DragDropContext(HTML5Backend)
export default class Container extends Component {
  constructor(props) {
    super(props);
    this.moveBox = this.moveBox.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
    this.updateDropItem = this.updateDropItem.bind(this);
    this.state = {
      cards: [{
        id: 1,
        type: 'Input',
        text: '输入框',
        params: {},
      }, {
        id: 2,
        type: 'Select',
        text: '选择器',
        params: {},
      }, {
        id: 3,
        type: 'Button',
        text: '按钮',
        params: {},
      }, {
        id: 4,
        type: '',
        text: '纯文本',
        params: {},
      }],
      dropItem: props.formData,
    };
  }

  moveBox(dragIndex, hoverIndex) {
    const { dropItem } = this.state;
    const dragCard = dropItem[dragIndex];

    this.setState(update(this.state, {
      dropItem: {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, dragCard],
        ],
      },
    }), () => {
      this.props.getFormData(this.state.dropItem);
    });
  }

  handleDrop(item) {
    const dropItem = this.state.dropItem;
    dropItem.push(Object.assign({
      key: item.key,
    }, this.state.cards[item.index]));
    this.setState({
      dropItem,
    }, () => {
      this.props.getFormData(this.state.dropItem);
    });
  }

  updateDropItem(id, params) {
    console.log('id', id);
    console.log('params', params);
    const dropItem = this.state.dropItem.map((item, key) => {
      if (key === id) {
        item.params = params;
      }
      return item;
    });
    this.setState({
      dropItem,
    }, () => {
      this.props.getFormData(this.state.dropItem);
    });
  }

  render() {
    const { cards, dropItem } = this.state;
    console.log('dropItem', dropItem);
    return (
      <div className="designSpace">
        <div className="componentList">
          <Card title="基础组件">
            {cards.map((card, i) => (
              <Components
                key={card.id}
                index={i}
                id={card.id}
                text={card.text}
              />
            ))}
          </Card>
        </div>
        <div className="drapSpace">
          <Space
            dropItem={dropItem}
            onDrop={item => this.handleDrop(item)}
            moveBox={this.moveBox}
            updateDropItem={this.updateDropItem}
          />
        </div>
      </div>
    );
  }
}