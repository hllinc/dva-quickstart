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
      return {...state, items: s};
    },
    submit(state, {payload: item}) {
      if (item.key) {
        state.items.forEach((o,index) => {
          if (o.key === item.key) {
            state.items.splice(index,1,item);
          }
        })
      } else {
        state.selectedItem = item;
        state.selectedItem.key = Math.floor(Math.random()*100);
        state.items.unshift(state.selectedItem);
      }
      return {...state,showModal: false, selectedItem: null};
    },
    edit(state, {payload: item}) {
      return {...state, selectedItem: item, showModal: true};
    },
  },
};
