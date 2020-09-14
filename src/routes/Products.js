import React from 'react';
import {connect} from 'dva';
import ProductList from '../components/ProductList';

const Products = ({dispatch, products, todos}) => {
  function handleDelete(id) {
    dispatch({
      type: 'products/delete',
      payload: id,
    });
  }

  function handleAdd() {

  }

  return (
    <div>
      <h2>List of Products</h2>
      <ProductList onDelete={handleDelete} onAdd={{handleAdd}} products={products}/>
      <ProductList onDelete={handleDelete} onAdd={{handleAdd}} products={todos.items}/>
    </div>
  );
};

export default connect(({products, todos}) => ({
  products, todos
}))(Products);
