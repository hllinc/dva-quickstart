import React, {useEffect} from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'dva';
import styles from './g6.less';

import _G6 from '@antv/g6';

const G6 = ({dispatch, g6}) => {

  const ref = React.useRef(null);
  let graph = null;

  useEffect(() => {
    if (!graph) {
      graph = new _G6.Graph({
        container: ReactDOM.findDOMNode(ref.current),
        width: 1200,
        height: 800,
        // fitView: true,
        modes: {
          default: ['drag-canvas'],
        },
        layout: {
          type: 'combo-force',
          preventOverlap: true, // 防止节点重叠
          direction: 'LR',
        },
        nodeStateStyles: {
          // 各状态下的样式，平铺的配置项仅在 keyShape 上生效。需要在其他 shape 样式上响应状态变化则写法不同，参见上文提到的 配置状态样式 链接
          hover: {
            fillOpacity: 0.5,
          },
        },
        defaultNode: {
          type: 'rect',
          // type: 'modelRect',
          size: [100, 50],
          labelCfg: {
            style: {
              fill: '#000000A6',
              fontSize: 12,
            },
          },
          style: {
            // 仅在 keyShape 上生效
            fill: 'lightblue',
            stroke: '#888',
            lineWidth: 1,
            radius: 7,
          },
          linkPoints: {
            top: true,
            bottom: true,
            left: true,
            right: true
          }
        },
        defaultEdge: {
          type: 'polyline',
          labelCfg: {
            autoRotate: true
          }
        },
      });
    }
    graph.data(g6.data);
    graph.render();
    // 监听鼠标进入节点事件
    graph.on('node:mouseenter', (evt) => {
      const node = evt.item;
      // 激活该节点的 hover 状态
      graph.setItemState(node, 'hover', true);
    });
    // 监听鼠标离开节点事件
    graph.on('node:mouseleave', (evt) => {
      const node = evt.item;
      // 关闭该节点的 hover 状态
      graph.setItemState(node, 'hover', false);
    });
  }, []);

  return (
    <div ref={ref} className={styles.flowMap}></div>
  );
};

export default connect(({g6}) => ({
  g6
}))(G6);
