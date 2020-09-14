import React from 'react';
import PropTypes from 'prop-types';
import {Popconfirm, Button, List, Skeleton, Avatar, Card, Modal} from 'antd';
import styles from '../routes/Todo/todo.css';
import TodoForm from "./TodoForm";

const TodoList = ({todos, onAdd, onDelete, onClose, onSubmit, onEdit, width}) => {

  return (
    <Card title="List of Todos" extra={<Button type={'primary'} onClick={onAdd}>添加</Button>} style={{width: width}}>
      <List
        className={styles.demoLoadmoreList}
        itemLayout="horizontal"
        dataSource={todos.items}
        renderItem={item => (
          <List.Item
            actions={[<Button size={'small'} onClick={onEdit(item)}>编辑</Button>,
              <Popconfirm title="Delete?" onConfirm={() => onDelete(item.key)}>
                <Button type={'danger'} size={'small'}>删除</Button>
              </Popconfirm>]}
          >
            <Skeleton avatar title={false} loading={item.loading} active>
              <List.Item.Meta
                avatar={
                  <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>
                }
                title={item.name}
                description={item.content}
              />
              <div>{item.level}</div>
            </Skeleton>
          </List.Item>
        )}
      />
      <Modal
        title={todos.selectedItem ? '编辑' : '添加'}
        visible={todos.showModal}
        onOk={onSubmit}
        onCancel={onClose}
      >
        <TodoForm item={todos.selectedItem}/>
      </Modal>
    </Card>
  );
};

TodoList.propTypes = {
  todos: PropTypes.object.isRequired, // 数据列表
  onAdd: PropTypes.func.isRequired, // 添加事件
  onEdit: PropTypes.func.isRequired, // 编辑事件
  onDelete: PropTypes.func.isRequired, // 删除事件
  onClose: PropTypes.func.isRequired, // 关闭事件
  onSubmit: PropTypes.func.isRequired, // 提交事件
  width: PropTypes.string // 组件宽度
};

export default TodoList;
