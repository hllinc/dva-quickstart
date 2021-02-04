import React, {useEffect, useState} from 'react';
import {connect} from 'dva';
import D3Dagre from "@comp/d3Dagre";

const D3DagrePage = ({dispatch, customFlow}) => {

  return (
    <React.Fragment>
      <D3Dagre {...customFlow} />
    </React.Fragment>
  );
};

export default connect(({customFlow}) => ({
  customFlow
}))(D3DagrePage);
