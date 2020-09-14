export default {
  namespace: 'todos',
  state: {
    items: [],
    showModal: false,
    selectedItem: null
  },
  reducers: {
    setModal(state, {payload: isShow}) {
      return {...state, showModal: isShow};
    },
    delete(state, {payload: key}) {
      const s = state.items.filter(item => item.key !== key);
      return {...state, items: s};
    },
    add(state, {payload: item}) {
      const key = Math.floor(Math.random() * 100);
      item = {key: key, name: '待办' + key, content: '这是待办' + key, level: '低'};
      state.items.unshift(item);
      return {...state};
    },
    edit(state, {payload: o}) {
      state.items.forEach((item) => {
        if (item.key === o.key) {
          item = o;
        }
      });
      return state;
    },
  },
};
