import {queryAll} from "../services/g6";
import Model from "@infe/Model";

export class G6Model {
  items: [] = [];
  showModal: boolean = false;
  selectedItem: object = [];
  data = {
    nodes: [
      {
        id: '1',
        label: '开始',
        size: 50,
        type: 'circle',
        props: {
          info: '这是开始'
        }
      },
      {
        id: '2',
        label: '流程1',
        props: {
          info: '这是一个流程'
        }
      },
      {
        id: '3',
        label: '流程2',
        props: {
          info: '这是一个流程'
        }
      },
      {
        id: '4',
        label: '流程3',
        props: {
          info: '这是一个流程'
        }
      },
      {
        id: '5',
        label: '结束',
        type: 'circle',
        size: 50,
        props: {
          info: '这是结束'
        }
      }
    ],
    edges: [
      {
        source: '1',
        target: '2',
        data: {
          type: 'name1',
          amount: '100,000,000,00 元',
          date: '2019-08-03'
        }
      },
      {
        source: '1',
        target: '3',
        data: {
          type: 'name2',
          amount: '100,000,000,00 元',
          date: '2019-08-03'
        }
      },
      {
        source: '3',
        target: '4',
        data: {
          type: 'name3',
          amount: '100,000,000,00 元',
          date: '2019-08-03'
        }
      },
      {
        source: '2',
        target: '4',
        data: {
          type: 'name4',
          amount: '100,000,000,00 元',
          date: '2019-08-03'
        }
      },
      {
        source: '4',
        target: '5',
        data: {
          type: 'name5',
          amount: '100,000,000,00 元',
          date: '2019-08-03'
        }
      },
    ]
  };
}

export default {
  namespace: 'g6',
  state: new G6Model(),
  reducers: {
    setModal(state, {payload: isShow}) {
      if (!isShow) {
        return {...state, showModal: isShow, selectedItem: null};
      }
      return {...state, showModal: isShow};
    },
    delete(state, {payload: key}) {
      const s = state.items.filter(item => item.key !== key);
      window.localStorage.setItem('g6', JSON.stringify(state.items));
      return {...state, items: s};
    },
    changeStatus(state, {payload: item}) {
      state.items.forEach((o, index) => {
        if (o.key === item.key) {
          state.items.splice(index, 1, item);
        }
      })
      window.localStorage.setItem('g6', JSON.stringify(state.items));
      return {...state};
    },
    submit(state, {payload: item}) {
      if (item.key) {
        state.items.forEach((o, index) => {
          if (o.key === item.key) {
            state.items.splice(index, 1, item);
          }
        })
      } else {
        state.selectedItem = item;
        state.selectedItem.key = Math.floor(Math.random() * 100);
        state.items.unshift(state.selectedItem);
      }
      window.localStorage.setItem('g6', JSON.stringify(state.items));
      return {...state, showModal: false, selectedItem: null};
    },
    edit(state, {payload: item}) {
      return {...state, selectedItem: item, showModal: true};
    },
    load(state, {payload: items}) {
      const db = window.localStorage.getItem('g6');
      if (db) {
        return {...state, items: JSON.parse(db)};
      } else {
        window.localStorage.setItem('g6', JSON.stringify(items));
      }
      return {...state, items: items};
    }
  },
  effects: {
    // 异步加载
    * query(_, {call, put, select}) {
      const response = yield call(queryAll);
      yield put({type: 'load', payload: response.data.data});
      const items = yield select(state => state.g6.items);
      console.log('获取到的数据条数：', items.length);
      return items;
    }
  }
} as Model<G6Model>;
