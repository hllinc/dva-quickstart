import {queryAll} from "../services/todo";

export default {
  namespace: 'todos',
  state: {
    items: [],
    showModal: false,
    selectedItem: null
  },
  reducers: {
    setModal(state, {payload: isShow}) {
      if (!isShow) {
        return {...state, showModal: isShow, selectedItem: null};
      }
      return {...state, showModal: isShow};
    },
    delete(state, {payload: key}) {
      const s = state.items.filter(item => item.key !== key);
      window.localStorage.setItem('todos', JSON.stringify(state.items));
      return {...state, items: s};
    },
    changeStatus(state, {payload: item}) {
      state.items.forEach((o, index) => {
        if (o.key === item.key) {
          state.items.splice(index, 1, item);
        }
      })
      window.localStorage.setItem('todos', JSON.stringify(state.items));
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
      window.localStorage.setItem('todos', JSON.stringify(state.items));
      return {...state, showModal: false, selectedItem: null};
    },
    edit(state, {payload: item}) {
      return {...state, selectedItem: item, showModal: true};
    },
    load(state, {payload: items}) {
      const db = window.localStorage.getItem('todos');
      if (db) {
        return {...state, items: JSON.parse(db)};
      } else {
        window.localStorage.setItem('todos', JSON.stringify(items));
      }
      return {...state, items: items};
    }
  },
  effects: {
    // 异步加载
    * query(action, {call, put, select}) {
      const response = yield call(queryAll);
      yield put({type: 'load', payload: response?.data?.data});
      const items = yield select(state => state.todos.items);
      console.log('获取到的数据条数：',items.length);
      return items;
    }
  }
};
