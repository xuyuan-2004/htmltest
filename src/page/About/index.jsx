import React, { useState } from 'react';
import { Table, Button, Modal, Form, Input, Space, Select, Popconfirm, notification } from 'antd';
import { SaveOutlined, SearchOutlined, ImportOutlined, ExportOutlined } from '@ant-design/icons';

const initialData = [
  { key: 1, name: 'John Doe', age: 32, address: 'New York' },
  { key: 2, name: 'Jane Smith', age: 28, address: 'London' },
];

const About = () => {
  const [data, setData] = useState(initialData);
  const [visible, setVisible] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const handleAdd = () => {
    setEditingRecord(null);
    setVisible(true);
  };

  const handleEdit = (record) => {
    setEditingRecord(record);
    setVisible(true);
  };

  const handleDelete = (key) => {
    setData(data.filter(item => item.key !== key));
    notification.success({ message: 'Record deleted successfully!' });
  };

  const handleBatchDelete = () => {
    setData(data.filter(item => !selectedRowKeys.includes(item.key)));
    setSelectedRowKeys([]);
    notification.success({ message: 'Selected records deleted successfully!' });
  };

  const handleOk = (values) => {
    if (editingRecord) {
      setData(data.map(item => (item.key === editingRecord.key ? { ...item, ...values } : item)));
    } else {
      const newRecord = { key: Date.now(), ...values };
      setData([...data, newRecord]);
    }
    setVisible(false);
    notification.success({ message: 'Record saved successfully!' });
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleSearch = (value) => {
    setSearchText(value);
  };

  const filteredData = data.filter(item => item.name.includes(searchText));

  return (
    <div>
      <Space style={{ marginBottom: 16 }}>
        <Button type="primary" onClick={handleAdd} icon={<SaveOutlined />}>Add New</Button>
        <Button type="danger" onClick={handleBatchDelete} disabled={selectedRowKeys.length === 0}>Batch Delete</Button>
        <Input.Search
          placeholder="Search by name"
          onSearch={handleSearch}
          style={{ width: 200 }}
          allowClear
          prefix={<SearchOutlined />}
        />
      </Space>
      <Table
        rowSelection={{
          selectedRowKeys,
          onChange: setSelectedRowKeys,
        }}
        dataSource={filteredData}
      >
        <Table.Column title="Name" dataIndex="name" sorter={(a, b) => a.name.localeCompare(b.name)} />
        <Table.Column title="Age" dataIndex="age" sorter={(a, b) => a.age - b.age} />
        <Table.Column title="Address" dataIndex="address" />
        <Table.Column
          title="Action"
          render={(text, record) => (
            <Space size="middle">
              <Button onClick={() => handleEdit(record)}>Edit</Button>
              <Popconfirm title="Are you sure to delete this record?" onConfirm={() => handleDelete(record.key)}>
                <Button danger>Delete</Button>
              </Popconfirm>
            </Space>
          )}
        />
      </Table>
      <Modal
        title={editingRecord ? 'Edit Record' : 'Add Record'}
        visible={visible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          initialValues={editingRecord}
          onFinish={handleOk}
          layout="vertical"
        >
          <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Please input name!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="age" label="Age" rules={[{ required: true, message: 'Please input age!' }]}>
            <Input type="number" />
          </Form.Item>
          <Form.Item name="address" label="Address" rules={[{ required: true, message: 'Please input address!' }]}>
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default About;