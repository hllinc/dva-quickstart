import React from 'react';
import styles from './index.less';
import {Button, Select} from 'antd';

export default ({graph}) => {
  const repaintEvent = () => {
    graph.refresh();
  }
  const setMode = (value) => {
    graph.setMode(value);
  };
  return (
    <div className={styles.toolbar}>
      <Button onClick={() => setMode('default')}>选择模式</Button>
      <Button onClick={() => setMode('addNode')}>添加节点</Button>
      <Button onClick={() => setMode('addEdge')}>添加连线</Button>
    </div>
  );
};
