import React from 'react';
import PropTypes from 'prop-types';
import {Form, Input, Modal, Select, Button} from "antd";

const {Option} = Select;

const layout = {
  labelCol: {span: 8},
  wrapperCol: {span: 16},
};

const TodoForm = ({todos, onClose, onSubmit}) => {

  const [form] = Form.useForm();

  // 初始化数据
  if (todos.selectedItem) {
    form.setFieldsValue(todos.selectedItem);
  }

  function submit() {
    form.validateFields().then((values) => {
      onSubmit({...todos.selectedItem, ...values});
      form.resetFields();
    })
  }

  function close() {
    onClose();
    form.resetFields();
  }

  return (
    <Modal
      title={todos.selectedItem ? '编辑' : '添加'}
      visible={todos.showModal}
      onOk={submit}
      onCancel={close}
    >
      <Form {...layout} form={form} name="control-hooks">
        <Form.Item name="name" label="Name" rules={[{required: true}]}>
          <Input/>
        </Form.Item>
        <Form.Item name="content" label="Content" rules={[{required: true}]}>
          <Input.TextArea/>
        </Form.Item>
        <Form.Item name="level" label="Level" rules={[{required: true}]}>
          <Select placeholder="选择优先级">
            <Option value="2">低</Option>
            <Option value="1">中</Option>
            <Option value="0">高</Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

TodoForm.propTypes = {
  todos: PropTypes.object.isRequired, // 当前操作的数据
  onClose: PropTypes.func.isRequired, // 关闭事件
  onSubmit: PropTypes.func.isRequired, // 提交事件
};

export default TodoForm;
