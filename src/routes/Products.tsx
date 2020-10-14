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

  return (
    <div>
      <h2>List of Products....</h2>
      <ProductList onDelete={handleDelete} products={products}/>
      <ProductList onDelete={handleDelete} products={todos.items}/>
    </div>
  );
};

export default connect(({products, todos}) => ({
  products, todos
}))(Products);
