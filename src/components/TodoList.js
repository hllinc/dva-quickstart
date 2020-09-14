import React from 'react';
import PropTypes from 'prop-types';
import {Popconfirm, Button, List, Skeleton, Avatar, Card, Tag} from 'antd';
import styles from '../routes/Todo/todo.css';
import TodoForm from "./TodoForm";

const TodoList = ({todos, onAdd, onDelete, onClose, onSubmit, onEdit, width}) => {
  // 等级枚举对象
  const levelEnum = [{label: '高', color: 'red'}, {label: '中', color: 'orange'}, {label: '低', color: 'green'}];
  return (
    <Card title="List of Todos" extra={<Button type={'primary'} onClick={onAdd}>添加</Button>} style={{width: width}}>
      <List
        className={styles.demoLoadmoreList}
        itemLayout="horizontal"
        dataSource={todos.items}
        renderItem={item => (
          <List.Item
            actions={[<Button size={'small'} onClick={() => onEdit(item)}>编辑</Button>,
              <Popconfirm title="确定删除?" onConfirm={() => onDelete(item.key)}>
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
              <div><Tag color={levelEnum[item.level].color}>{levelEnum[item.level].label}</Tag></div>
            </Skeleton>
          </List.Item>
        )}
      />
      <TodoForm todos={todos} onClose={onClose} onSubmit={onSubmit}/>
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
