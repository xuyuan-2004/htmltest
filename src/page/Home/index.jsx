import React, { useState } from 'react';
import { Table, Button, Modal, Form, Input, message, Popconfirm } from 'antd';
import { useNavigate } from 'react-router-dom';

const initialData = [
  { key: '1', name: 'John Doe', age: 32, address: 'New York' },
  { key: '2', name: 'Jane Smith', age: 28, address: 'London' },
  { key: '3', name: 'Alice Brown', age: 24, address: 'Paris' },
  { key: '4', name: 'Bob Green', age: 45, address: 'Berlin' },
];

const Home = () => {
  const [data, setData] = useState(initialData);
  const [filteredData, setFilteredData] = useState(initialData);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editRecord, setEditRecord] = useState(null);
  const [form] = Form.useForm();
  const [searchText, setSearchText] = useState('');
  const token = window.sessionStorage.getItem('uid')
  const usenavgate = useNavigate()

  const showModal = (record) => {
    setEditRecord(record);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form.validateFields().then(values => {
      if (editRecord) {
        setData(data.map(item => (item.key === editRecord.key ? { ...item, ...values } : item)));
      } else {
        setData([...data, { key: Date.now(), ...values }]);
      }
      setIsModalVisible(false);
      setEditRecord(null);
      form.resetFields();
      setFilteredData(data);
    }).catch(() => {
      message.warning('不能为空！')
    });
  };

  const handleDelete = (key) => {
    setData(data.filter(item => item.key !== key));
    setFilteredData(filteredData.filter(item => item.key !== key))
  };

  const handleSearch = (value) => {
    const filtered = data.filter(item =>
      item.name.toLowerCase().includes(value.toLowerCase()) || item.address.toLowerCase().includes(value.toLowerCase()));
    setFilteredData(filtered);
    setSearchText(value);
  };

  const columns = [
    { title: '名字', dataIndex: 'name', key: 'name', align: 'center' },
    { title: '年龄', dataIndex: 'age', key: 'age', align: 'center' },
    { title: '地址', dataIndex: 'address', key: 'address', align: 'center' },
    {
      title: '操作 ',
      key: 'action',
      align: 'center',
      render: (_, record) => (
        <>
          <Button type="danger" onClick={() => showModal(record)}>编辑</Button>
          <Popconfirm
            description="确认要删除吗?"
            onConfirm={() => handleDelete(record.key)}
            okText="确认"
            cancelText="取消"
          >
            <Button style={{ color: 'red' }} type="danger">删除</Button>
          </Popconfirm>
        </>
      ),
    },
  ];
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Input.Search
          placeholder="请搜索内容"
          value={searchText}
          onChange={(e) => handleSearch(e.target.value)}
          style={{ marginBottom: 16, width: '260px' }}
        />
        <Button type="primary" onClick={() => showModal(null)}>添加成员</Button>
      </div>

      <Table style={{ marginTop: '30px' }} columns={columns} dataSource={filteredData || data} />
      <Modal
        title={editRecord ? "编辑" : "新增"}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={() => setIsModalVisible(false)}
        okText={'确认'}
        cancelText={'取消'}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="名字" rules={[{ required: true, message: '请输入名字!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="age" label="年龄" rules={[{ required: true, message: '请输入年龄!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="address" label="地址" rules={[{ required: true, message: '请输入地址!' }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Home;