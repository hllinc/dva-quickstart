# Dva Todo Demo
使用dva开发的一个todo功能的demo，UI为Antd。
## 路由
### 多级路由实现
- 父路由，放在根路由上，参见src/router.js文件的内容及装载方式。
```javascript
function RouterConfig({history}) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" component={IndexPage}/>
      </Switch>
    </Router>
  );
}
```
- 子路由，放在子页面中，参见src/routes/IndexPage.js文件的内容及装载方式。
```javascript
<Switch>
  <Route path="/todo" component={Todos}/>
  <Route path="/products" component={Products}/>
</Switch>
```
## 组件传参
### 父传子
- 父组件，参见src/routes/Todo/Todos.js文件内容及装载方式，这里建议尽可能将操作状态的dispatch写在主页面中，子组件中只做组件的逻辑处理，不直接操作state。
```javascript
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

  return (
    <React.Fragment>
      <TodoList dispatch={dispatch} onAdd={handleAdd} onDelete={handleDelete} onClose={handleClose} onEdit={handleEdit}
                onSubmit={handleSubmit} onChangeStatus={handleChangeStatus} todos={todos} width={'50vw'}/>
    </React.Fragment>
  );
};
```
- 子组件，参见src/components/TodoList.js文件内容及装载方式。
```javascript
const TodoList = ({todos, onAdd, onDelete, onClose, onSubmit, onEdit, onChangeStatus, width}) => {
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
            className={item.checked ? styles.checked : ''}
          >
            <Skeleton avatar title={false} loading={item.loading} active>
              <List.Item.Meta
                avatar={
                  <Checkbox onChange={(e) => onChangeStatus(e, item)} checked={item.checked}/>
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
  onChangeStatus: PropTypes.func.isRequired, // 改变状态
  width: PropTypes.string // 组件宽度
};

export default TodoList;
```
### 子传父
- 子传父一般都是回调方法的方式，这块也不例外可以通过回调的方式实现。具体参见子组件src/components/TodoForm.js文件内容及装载方式。
- 该子组件的父组件是TodoList，接收方法是TodoList的onSubmit参数。
```javascript
const TodoForm = ({todos, onClose, onSubmit}) => {

  const [form] = Form.useForm();

  // 初始化数据
  if (todos.selectedItem) {
    form.setFieldsValue(todos.selectedItem);
  }
  // 这里是子组件向父组件传递参数通过onSubmit回调方法
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
```
### 同级组件共享状态
- 同级组件共享状态同mobx共享store类似，在组件加载状态时一并加入即可，代码如下，参见src/routes/Products.js文件的内容及装载方式。
```javascript
export default connect(({products, todos}) => ({
  products, todos
}))(Products);
```
## 异步加载
### 使用effect
- service
文件位置：src/services/todo.ts
```javascript
import request from "../utils/request";

export function add(params) {
  return request('/api/todo/add', {method: 'POST', data: params});
}

export function queryAll() {
  return request('/api/todo/queryAll');
}
```
- model
注意effects中的方法名不要和reducers中的冲突；这块就是在effects方法中调用异步的service方法，完事后将结果再通过reducers中的方法反应到state上。
```javascript
effects: {
  // 异步加载
  * query(action, {call, put}) {
    const response = yield call(queryAll);
    yield put({type: 'load', payload: response?.data?.data});
  }
}
```
- 页面
在页面中使用useEffect触发页面初始化加载数据的方法，类似React类组件中生命周期方法componentDidMount，具体见src/routes/Todo/Todos.js文件中的内容及具体装载方式。
```javascript
useEffect(() => {
    if (dispatch) {
      dispatch({
        type: 'todos/query'
      })
    }
  }, []);
```
- mock服务
文件位置：mock/todo.ts
```javascript
const Mock = require('mockjs');
let db = Mock.mock({
  'data|3-10': [{
    'key|+1': 1,
    'name': '待办@date',
    content: '测试内容@integer',
    'level|0-2': 0,
    'checked|1': true,
  }]
});

module.exports = {
  [`GET /api/todo/queryAll`](req, res) {

    res.status(200).json(db);
  },

  [`POST /api/todo/add`](req, res) {

    let user = req.body;
    console.log(req);
    user.id = Mock.mock('@id');
    db.data.push(user);

    res.status(200).json(user);
  }
}
```
- mock配置
文件位置：.roadhogrc.mock.js
```javascript
const fs=require('fs');
const path=require('path');
const mockPath=path.join(__dirname+'/mock');

const mock={};
fs.readdirSync(mockPath).forEach(file=>{

  Object.assign(mock,require('./mock/'+file));
});

module.exports=mock;
```
