import React, { useState } from 'react';
import { Table, Button, Modal, Form, Input, Space, Row, Col, message } from 'antd';
import ReactECharts from 'echarts-for-react';

const Class = () => {
  const [dataSource, setDataSource] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [form] = Form.useForm();

  const columns = [
    {
      title: '名字',
      dataIndex: 'name',
      align: 'center',
      sorter: (a, b) => a.name.localeCompare(b.name),
      onHeaderCell: () => ({
        'aria-sort': 'none', // 去除排序提示
      }),
    },
    {
      title: '年龄',
      dataIndex: 'age',
      align: 'center',
      sorter: (a, b) => a.age - b.age,
      onHeaderCell: () => ({
        'aria-sort': 'none', // 去除排序提示
      }),
    },
    {
      title: '地址',
      dataIndex: 'address',
      key: 'address',
      align: 'center',
    },
    {
      title: '操作',
      align: 'center',
      render: (text, record) => (
        <Space size="middle">
          <Button onClick={() => handleEdit(record)}>编辑</Button>
          <Button onClick={() => handleDelete(record.key)} danger>删除</Button>
        </Space>
      ),
    },
  ];

  const handleAdd = () => {
    form.resetFields();
    setEditingRecord(null);
    setIsModalVisible(true);
  };

  const handleEdit = (record) => {
    setEditingRecord(record);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleDelete = (key) => {
    setDataSource(dataSource.filter(item => item.key !== key));
  };

  const handleBatchDelete = () => {
    setDataSource(dataSource.filter(item => !selectedRowKeys.includes(item.key)));
    setSelectedRowKeys([]);
  };

  const handleOk = (values) => {
    form.validateFields().then(values => {
      if (editingRecord) {
        setDataSource(dataSource.map(item => (item.key === editingRecord.key ? { ...item, ...values } : item)));
      } else {
        setDataSource([...dataSource, { key: Date.now(), ...values }]);
      }
      form.resetFields();
      setIsModalVisible(false);
    }).catch(() => {
      message.warning('不能为空！')
    })
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const filteredData = dataSource.filter(item => item.name.includes(searchText));

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const getChartOptions = () => {
    const names = dataSource.map(item => item.name);
    const ages = dataSource.map(item => item.age);
    return {
      title: {
        text: '分类图表',
      },
      tooltip: {},
      xAxis: {
        data: names,
      },
      yAxis: {},
      series: [{
        name: 'Age',
        type: 'bar',
        data: ages,
      }],
    };
  };
  return (
    <div>
      <Row style={{ marginBottom: 16 }}>
        <Col span={12}>
          <Input placeholder="请搜索内容" style={{ width: '200px' }} onChange={handleSearch} />
        </Col>
        <Col span={12} style={{ textAlign: 'right' }}>
          <Space>
            <Button type="primary" onClick={handleAdd}>增加</Button>
            <Button danger onClick={handleBatchDelete} disabled={!selectedRowKeys.length}>删除所选</Button>
          </Space>
        </Col>
      </Row>
      <Table
        style={{ marginTop: '30px' }}
        rowKey="key"
        columns={columns}
        dataSource={filteredData}
        rowSelection={rowSelection}
        pagination={{ pageSize: 5 }}
        bordered
      />

      <Modal
        title={editingRecord ? '编辑' : '新增'}
        visible={isModalVisible}
        onCancel={handleCancel}
        onOk={handleOk}
        okText={'确认'}
        cancelText={'取消'}
      >
        <Form
          form={form}
        >
          <Form.Item
            name="name"
            label="名字"
            rules={[{ required: true, message: '请输入名字!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="age"
            label="年龄"
            rules={[{ required: true, message: '请输入年龄!' }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item name="address" label="地址" rules={[{ required: true, message: '请输入地址!' }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
      <ReactECharts option={getChartOptions()} style={{ marginTop: '30px', }} />
    </div>
  );
};

export default Class;