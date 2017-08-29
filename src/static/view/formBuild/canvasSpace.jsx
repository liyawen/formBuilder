import React, { Component } from 'react';
import { Form, Icon, Button } from 'antd';
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';
import ItemTypes from './itemType';
import Card from './card';
import SetConfigure from './setConfigure';
import './css/drop.less';

const boxTarget = {
  drop(props, monitor) {
    // if (monitor.getItem().text) {
    //   return;
    // }
    props.onDrop(monitor.getItem());
  },

};

@DropTarget(ItemTypes.OUTER, boxTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop(),
}))

class CanvasSpace extends Component {
  static propTypes = {
    connectDropTarget: PropTypes.func.isRequired,
    isOver: PropTypes.bool.isRequired,
    canDrop: PropTypes.bool.isRequired,
  };
  constructor(props) {
    super(props);
    this.moveBox = this.moveBox.bind(this);
    this.toggleButtons = this.toggleButtons.bind(this);
    this.getData = this.getData.bind(this);
    this.setConfigure = this.setConfigure.bind(this);
    this.state = {
      buttonHidden: [],
      targetParam: {},
      targetId: null,
      targetState: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.dropItem) {
      if (this.props.dropItem.length !== nextProps.dropItem.length) {
        this.setState({
          buttonHidden: nextProps.dropItem.map(() => {
            return true;
          }),
        });
      } else {
        this.setState({
          buttonHidden: this.props.dropItem.map(() => {
            return true;
          }),
        });
      }
    }
  }

  moveBox(dropIndex, hoverIndex) {
    this.props.moveBox(dropIndex, hoverIndex);
  }

  toggleButtons(key) {
    return () => {
      this.setState({
        buttonHidden: this.state.buttonHidden.map((item, i) => {
          if (key === i) {
            return !item;
          } else {
            return item;
          }
        })
      });
    };
  }

  getData(key, data) {
    console.log('key', key);
    console.log('data', data);
    this.setState({
      targetState: false,
    });
    this.props.updateDropItem(key, data);
  }

  setConfigure(key, item) {
    return () => {
      this.setState({
        targetParam: item,
        targetId: key,
        targetState: true,
      });
    };
  }
  render() {
    const { canDrop, isOver, connectDropTarget } = this.props;
    const { dropItem } = this.props;
    const { buttonHidden, targetId, targetParam, targetState } = this.state;
    const isActive = canDrop && isOver;
    const { getFieldDecorator } = this.props.form;

    let backgroundColor = '#eee';
    if (isActive) {
      backgroundColor = '#bbb';
    } else if (canDrop) {
      backgroundColor = '#aaa';
    }
    return connectDropTarget(
      <div className="spaceDiv" style={{ backgroundColor }}>
        <Form>
          {dropItem.map((card, i) => (
            <div className="cardDiv" key={card.key}>
              <Card
                index={i}
                id={card.id}
                text={card.text}
                type={card.type}
                params={card.params}
                moveBox={this.moveBox}
                getFieldDecorator={getFieldDecorator}
              />
              <div className="configureIcon">
                <Button type="primary" onClick={this.setConfigure(i, card)}><Icon type="setting" /></Button>
                &nbsp;&nbsp;
                <Button type="danger"><Icon type="delete" /></Button>
              </div>
            </div>
          ))}
        </Form>
        { targetState &&
          <SetConfigure data={targetParam} targetId={targetId} onUpdate={this.getData} />
        }
      </div>,
    );
  }
}
const Space = Form.create()(CanvasSpace);
export default Space;

{/* <div className="cardDiv" onMouseLeave={this.toggleButtons(i)} onMouseEnter={this.toggleButtons(i)} key={card.key}> */}
{/* <div hidden={buttonHidden[i]} className="configureIcon"> */}