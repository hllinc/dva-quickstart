import React, {lazy, Suspense} from 'react';

import {Router, Route, Switch} from 'dva/router';

const Routers = lazy(()=>import('./routers'));

export default function RouterConfig({history}) {        // 路由配置
  return (
    <Router history={history}>
      <Suspense fallback={<div>Loading</div>}>
        <Switch>
          <Route path="/" component={Routers}/>
        </Switch>
      </Suspense>
    </Router>
  );
}
