import React from 'react';
import {Router, Route, Switch} from 'dva/router';
import IndexPage from './routes/IndexPage';
import Products from "./routes/Products";
import Home from "./routes/Home/Home";

function RouterConfig({history}) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={IndexPage}/>
        <Route path="/products" exact component={Products}/>
        <Route path="/home" exact component={Home}/>
      </Switch>
    </Router>
  );
}

export default RouterConfig;
