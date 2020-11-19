import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'dva';
import styles from './g6.less';
import insertCss from 'insert-css';

import G6 from '@antv/g6';
import Toolbar from '@comp/g6/Toolbar';

insertCss(`
  .g6-tooltip {
    border: 1px solid #e2e2e2;
    border-radius: 4px;
    font-size: 12px;
    color: #545454;
    background-color: rgba(255, 255, 255, 0.9);
    padding: 10px 8px;
    box-shadow: rgb(174, 174, 174) 0px 0px 10px;
  }
`);

const MyG6 = ({dispatch, g6}) => {

  const ref = React.useRef(null);
  let graph;
  const [graphRef, setGraphRef] = useState(null);

  const initGraph = () => {
    // 实例化 Minimap 插件
    const minimap = new G6.Minimap({
      size: [100, 100],
      className: "minimap",
      type: 'delegate'
    });

    // 添加的节点数量，用于生成唯一 id
    let addedNodeCount = 0;

    // 封装点击添加节点的交互
    G6.registerBehavior('click-add-node', {
      // 设定该自定义行为需要监听的事件及其响应函数
      getEvents() {
        // 监听的事件为 canvas:click，响应函数是 onClick
        return {
          'canvas:click': 'onClick',
        };
      },
      // 点击事件
      onClick(ev) {
        // 在图上新增一个节点
        const node = graph.addItem('node', {
          x: ev.canvasX,
          y: ev.canvasY,
          label: '新节点' + addedNodeCount,
          id: `node-${addedNodeCount}`, // 生成唯一的 id
        });
        addedNodeCount++;
      },
    });

    // 封装点击添加边的交互
    G6.registerBehavior('click-add-edge', {
      // 设定该自定义行为需要监听的事件及其响应函数
      getEvents() {
        return {
          'node:click': 'onClick', // 监听事件 node:click，响应函数是 onClick
          mousemove: 'onMousemove', // 监听事件 mousemove，响应函数是 onMousemove
          'edge:click': 'onEdgeClick', // 监听事件 edge:click，响应函数是 onEdgeClick
        };
      },
      // getEvents 中定义的 'node:click' 的响应函数
      onClick(ev) {
        const node = ev.item;
        // 鼠标当前点击的节点的位置
        const point = {x: ev.x, y: ev.y};
        const model = node.getModel();
        if (this.addingEdge && this.edge) {
          graph.updateItem(this.edge, {
            target: model.id,
          });

          this.edge = null;
          this.addingEdge = false;
        } else {
          // 在图上新增一条边，结束点是鼠标当前点击的节点的位置
          this.edge = graph.addItem('edge', {
            source: model.id,
            target: point,
          });
          this.addingEdge = true;
        }
      },
      // getEvents 中定义的 mousemove 的响应函数
      onMousemove(ev) {
        // 鼠标的当前位置
        const point = {x: ev.x, y: ev.y};
        if (this.addingEdge && this.edge) {
          // 更新边的结束点位置为当前鼠标位置
          this.graph.updateItem(this.edge, {
            target: point,
          });
        }
      },
      // getEvents 中定义的 'edge:click' 的响应函数
      onEdgeClick(ev) {
        const currentEdge = ev.item;
        // 拖拽过程中，点击会点击到新增的边上
        if (this.addingEdge && this.edge == currentEdge) {
          graph.removeItem(this.edge);
          this.edge = null;
          this.addingEdge = false;
        }
      },
    });

    // 实例化 Grid 插件
    const grid = new G6.Grid();

    graph = new G6.Graph({
      container: ReactDOM.findDOMNode(ref.current),
      width: 1500,
      height: 800,
      animate: true,
      defaultNode: {
        type: 'rect',
        labelCfg: {
          style: {
            // fill: '#fff'
          }
        },
      },
      defaultEdge: {
        // type: 'polyline',
        labelCfg: {
          autoRotate: true
        },
        style: {
          stroke: 'orange',
          offset: 20,  // 拐弯处距离节点最小距离
          radius: 10,  // 拐弯处的圆角弧度，若不设置则为直角
          endArrow: {
            fill: 'orange',
            path: G6.Arrow.triangle(10, 20, 0),
            d: 0
          },
          // startArrow: true
        }
      },
      nodeStateStyles: {
        hover: {
          fill: 'lightsteelblue'
        },
        click: {
          stroke: '#000',
          lineWidth: 2
        }
      },
      edgeStateStyles: {
        click: {
          // fill: 'steelblue',
          stroke: 'steelblue'
        }
      },
      layout: {
        type: 'dagre',
        rankdir: 'LR',
        linkDistance: 100,
        preventOverlap: true,
        nodeStrength: -30,
        edgeStrength: 0.1
      },
      modes: {
        default: ['drag-node', 'drag-canvas', 'zoom-canvas',
          // 点提示框交互工具的配置
          {
            type: 'tooltip',
            formatText(model) {
              const text = 'label: ' + model.label;
              return text;
            },
            offset: 120,
            shouldUpdate: e => {
              return true;
            }
          },
          // 边提示框交互工具的配置
          {
            type: 'edge-tooltip',
            formatText(model) {
              const text = 'source: ' + model.source
                + '<br/> target: ' + model.target;
              return text;
            },
            offset: 150,
            shouldUpdate: e => {
              return true;
            }
          }
        ],
        addNode: ['click-add-node', 'click-select'],
        addEdge: ['click-add-edge', 'click-select']
      },
      plugins: [minimap, grid]    // 将 Minimap 和 Grid 插件的实例配置到图上
    });

    graph.data(g6.data);
    graph.render();

    graph.on('node:mouseenter', e => {
      const nodeItem = e.item;
      graph.setItemState(nodeItem, 'hover', true);
    });
    graph.on('node:mouseleave', e => {
      const nodeItem = e.item;
      graph.setItemState(nodeItem, 'hover', false);
    });
    graph.on('node:click', e => {
      const clickNodes = graph.findAllByState('node', 'click');
      clickNodes.forEach(cn => {
        graph.setItemState(cn, 'click', false);
      });
      const nodeItem = e.item;
      graph.setItemState(nodeItem, 'click', true);
    });
    graph.on('edge:click', e => {
      const clickEdges = graph.findAllByState('edge', 'click');
      clickEdges.forEach(ce => {
        graph.setItemState(ce, 'click', false);
      });
      const edgeItem = e.item;
      graph.setItemState(edgeItem, 'click', true);
    });
  }

  useEffect(() => {
    if (!graph) {
      initGraph();
      setGraphRef(graph);
    }
  }, []);

  return (
    <React.Fragment>
      {
        graphRef ? (<Toolbar graph={graphRef}/>) : ''
      }
      <div ref={ref} className={styles.flowMap}></div>
    </React.Fragment>
  );
};

export default connect(({g6}) => ({
  g6
}))(MyG6);
