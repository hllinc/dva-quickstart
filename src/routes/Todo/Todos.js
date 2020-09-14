import React from 'react';
import {connect} from 'dva';
import TodoList from "../../components/TodoList";
import {Modal} from "antd";
import TodoForm from "../../components/TodoForm";

const Todos = ({dispatch, todos}) => {
  let selectedItem = null;

  function handleDelete(key) {
    dispatch({
      type: 'todos/delete',
      payload: key,
    });
  }

  function handleAdd() {
    dispatch({
      type: 'todos/setModal',
      payload: true
    })
  }

  function handleClose() {
    dispatch({
      type: 'todos/setModal',
      payload: false
    })
  }

  function handleEdit(item) {

  }

  function handleSubmit(item) {

  }

  return (
    <React.Fragment>
      <TodoList dispatch={dispatch} onAdd={handleAdd} onDelete={handleDelete} onClose={handleClose} onEdit={handleEdit}
                onSubmit={handleSubmit} todos={todos} width={'50vw'}/>
    </React.Fragment>
  );
};

export default connect(({todos}) => ({
  todos,
}))(Todos);
