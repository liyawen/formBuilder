import React from 'react';
import { Table, Icon, message, Button } from 'antd';
import _ from 'underscore';
import Service from '../../service/showForm';

class ShowForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [{
        title: 'id',
        dataIndex: 'id',
        key: 'id',
      }, {
        title: '表单名称',
        dataIndex: 'formName',
        key: 'formName',
      }, {
        title: '表单类型',
        dataIndex: 'formType',
        key: 'formType',
      }, {
        title: '操作',
        key: 'action',
        render: data => (<span>
          <Button type="primary" onClick={_.partial(this.previewForm, data.id)} >
            <Icon type="search" />预览表单
          </Button>
        </span>),
      }],
      data: [],
    };
  }

  componentDidMount() {
    this.getList();
  }

  getList() {
    Service.getList()
    .then((res) => {
      if (res.status === 0) {
        this.setState({
          data: res.data.map((item, i) => {
            item.key = i + 1;
            return item;
          }),
        });
      } else {
        message.error(res.msg, 4);
      }
    })
    .catch((error) => {
      message.error(error.message, 5);
    });
  }

  previewForm(id) {
    window.location.href = `#/previewForm/${id}`;
  }

  render() {
    const { columns, data } = this.state;
    return (
      <Table columns={columns} dataSource={data} />
    );
  }
}

export default ShowForm;