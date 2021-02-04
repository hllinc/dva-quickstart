import dva from 'dva';
import './index.css';
import {createBrowserHistory} from "history";

const createHistory = createBrowserHistory();

const app = dva({
  history: createHistory,
  initialState: {
    products: [
      {name: 'dva', id: 1, key: 1},
      {name: 'antd', id: 2, key: 2},
    ],
  },
});

app.model(require('./models/products').default);
app.model(require('./models/todos').default);
app.model(require('./models/g6').default);
app.model(require('@models/customFlow').default);

app.router(require('./router').default);

app.start('#root');
