import React, {useEffect, useState} from 'react';
import {connect} from 'dva';
import CustomFlow from "@comp/customFlow";

const CustomFlowPage = ({dispatch, customFlow}) => {

  return (
    <React.Fragment>
      <CustomFlow {...customFlow} />
    </React.Fragment>
  );
};

export default connect(({customFlow}) => ({
  customFlow
}))(CustomFlowPage);
