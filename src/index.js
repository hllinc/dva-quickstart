import dva from 'dva';
import './index.css';

// 1. Initialize
// const app = dva();
const app = dva({
  initialState: {
    products: [
      {name: 'dva', id: 1, key: 1},
      {name: 'antd', id: 2, key: 2},
    ],
    todos: {
      items: [
        {key: 1, name: '待办1', content: '这是待办1', level: '0'},
        {key: 2, name: '待办2', content: '这是待办2', level: '1'},
        {key: 3, name: '待办3', content: '这是待办3', level: '2', checked: true},
      ]
    }
  },
});

// 2. Plugins
// app.use({});

// 3. Model
// app.model(require('./models/example').default);
app.model(require('./models/products').default);
app.model(require('./models/todos').default);

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');
