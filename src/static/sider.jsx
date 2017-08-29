import React, { Component } from 'react';
import { Menu, Icon } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class Sider extends Component {
  state = {
    current: 'mail',
    menus: [{
      name: '设计表单',
      url: '#/designForm',
      key: '设计表单'
    }, {
      name: '表单展示',
      url: '#/showForm',
      key: '表单展示',
    }],
  }
  handleClick = (e) => {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
  }
  render() {
    const { menus } = this.state;
    return (
      <Menu
        onClick={this.handleClick}
        selectedKeys={[this.state.current]}
        mode="horizontal"
      >
        {menus.map((item, i) => {
          return (<Menu.Item key={item.key}>
            <a href={item.url} rel={item.name}>{item.name}</a>
          </Menu.Item>)
        })}
      </Menu>
    );
  }
}

export default Sider;