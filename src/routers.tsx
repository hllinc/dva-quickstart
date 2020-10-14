import React, {lazy} from 'react'
import {Switch, Redirect} from 'dva/router'
import {connect} from 'dva'
import {Route} from 'dva/router'

const Frame = lazy(() => import('@pages/Index'));

// const Login = lazy(()=> import('@pages/login'))
// const Register = lazy(()=> import('@pages/login/register'))
const NotFound = lazy(() => import('@pages/Exception/404'));

function routers() {
  return (
    <Switch>
      <Redirect from='/' to='/frame' exact />
      <Redirect from='/frame' to='/frame/todos' exact  />
      <Route path="/frame" component={Frame}/>
      {/*<Route path="/register" component={Register}/>*/}
      <Route component={NotFound}/>
    </Switch>
  )
}

export default connect(    // 状态管理 中间件
  // state=>({userData:state.userselect.userData})
)(routers)
