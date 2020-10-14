import React, {useEffect} from 'react';
import {connect} from 'dva';
import TodoList from "@comp/TodoList";

const Todos = ({dispatch, todos}) => {

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
    dispatch({
      type: 'todos/edit',
      payload: item
    })
  }

  function handleSubmit(item) {
    dispatch({
      type: 'todos/submit',
      payload: item
    })
  }

  function handleChangeStatus(e, item) {
    item.checked = e.target.checked;
    dispatch({
      type: 'todos/changeStatus',
      payload: item
    })
  }

  useEffect(() => {
    if (dispatch) {
      dispatch({
        type: 'todos/query'
      }).then((items) => {
        console.log('返回的值：', items.length);
        console.log('loaded')
      })
    }
  }, []);


  return (
    <React.Fragment>
      <TodoList
        onAdd={handleAdd}
        onDelete={handleDelete}
        onClose={handleClose}
        onEdit={handleEdit}
        onSubmit={handleSubmit}
        onChangeStatus={handleChangeStatus}
        todos={todos}
        width={'50vw'}/>
    </React.Fragment>
  );
};

export default connect(({todos}) => ({
  todos
}))(Todos);
