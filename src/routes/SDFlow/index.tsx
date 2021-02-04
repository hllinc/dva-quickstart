/**
 * 神策流程图
 * @author hongliang-sensorsdata
 * @date 2021/2/3 7:39 下午
 */
import React, {useEffect, useState} from 'react';
import {connect} from 'dva';
import SDFlowComponent from "@comp/sdFlow";

const SDFlow = ({dispatch, customFlow}) => {
  return <SDFlowComponent {...customFlow}/>;
};

export default connect(({customFlow}) => ({
  customFlow
}))(SDFlow);
