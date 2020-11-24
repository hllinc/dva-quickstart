import React from 'react';
import styles from './index.less';
import {Button} from 'antd';

export default ({graph}) => {
  const repaintEvent = () => {
    graph.refresh();
  }
  const setMode = (value) => {
    graph.setMode(value);
  };
  // 删除对象
  const deleteItems = () => {
    const clickEdges = graph.findAllByState('edge', 'click');
    const clickNodes = graph.findAllByState('node', 'click');
    const items = clickEdges.concat(clickNodes);
    items.forEach(item => {
      graph.removeItem(item);
    })
  }
  return (
    <div className={styles.toolbar}>
      <Button onClick={() => setMode('default')}>选择模式</Button>
      <Button onClick={() => setMode('addNode')}>添加节点</Button>
      <Button onClick={() => setMode('addEdge')}>添加连线</Button>
      <Button onClick={deleteItems}>删除</Button>
    </div>
  );
};
