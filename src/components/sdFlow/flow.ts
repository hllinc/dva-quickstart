import {fabric} from 'fabric';
import {cloneDeep} from 'lodash';

/**
 * 初始化画布
 * @param data
 * @param canvas
 */
export function initMap(mapData, canvas) {
  if (!mapData) {
    console.error('map data is not ready.')
    return;
  }
  // 格式化数据
  mapData = _formatData(mapData);
  // 绘制节点
  _drawNodes([mapData.treeNodes], canvas);
  // 绘制连接线
  // _drawEdges(mapData.edges, canvas);
  // 配置画布属性
  // 注册事件
  // _initEvent(canvas);
}

/**
 * 初始化画布交互事件
 * @param canvas
 * @private
 */
function _initEvent(canvas) {
  //鼠标按下事件
  canvas.on("mouse:down", function (e) {
    this.panning = true;
    canvas.selection = false;
  });
  //鼠标抬起事件
  canvas.on("mouse:up", function (e) {
    this.panning = false;
    canvas.selection = true;
  });
  // 移动画布事件
  canvas.on("mouse:move", function (e) {
    if (this.panning && e && e.e) {
      var delta = new fabric.Point(e.e.movementX, e.e.movementY);
      canvas.relativePan(delta);
    }
  });
  // 鼠标滚动画布放大缩小
  canvas.on("mouse:wheel", function (event) {
    var zoom = (event.e.deltaY > 0 ? -0.01 : 0.01) + canvas.getZoom();
    zoom = Math.max(0.1, zoom); //最小为原来的1/10
    zoom = Math.min(3, zoom); //最大是原来的3倍
    var zoomPoint = new fabric.Point(event.e.pageX, event.e.pageY);
    canvas.zoomToPoint(zoomPoint, zoom);
  });
}

/**
 * 格式化数据
 * @param data
 * @private
 */
function _formatData(data) {
  let resultTreeNode = {};
  for (let i = 0; i < data.nodes.length; i++) {
    const node = data.nodes[i];
    node.children = [];
    resultTreeNode[node.id] = node;
  }

  for (let i = 0; i < data.edges.length; i++) {
    const edge = data.edges[i];
    let sourceTreeNode = resultTreeNode[edge.source];
    const targetTreeNode = resultTreeNode[edge.target];
    // 去除 root 环
    if (edge.target !== 'ROOT') {
      const hasTarget = _getNodeById(edge.target, sourceTreeNode.children);
      if (!hasTarget) {
        sourceTreeNode.children.push(targetTreeNode);
      }
      resultTreeNode[edge.source] = sourceTreeNode;
    }
  }
  data.treeNodes = resultTreeNode['ROOT'];
  _generateNodeInfo([data.treeNodes], {level: 1, x: 20, y: 20});
  console.log(data.treeNodes)
  return data;
}
function _generateNodeInfo(nodes, cfg) {
  for(let i=0;i<nodes.length;i++) {
    const node = nodes[i];
    node.level = cfg.level;
    node.x = cfg.x + 300 * i;
    node.y = cfg.y;
    if(node.children.length > 0) {
      _generateNodeInfo(node.children, {
        level: node.level + 1,
        x: node.x,
        y: node.y + 100
      });
    }
  }
}

function _getNodeById(id, nodes) {
  return nodes.find((o) => o.id === id);
}
function getCanvasItemById(canvas, id) {
  let result;
  canvas.getObjects().forEach(function(o) {
    if(o.id === id) {
      result = o;
    }
  });
  return result;
}
/**
 * 绘制画布上的节点
 * @param nodes
 * @param ctx
 * @private
 */
function _drawNodes(nodes, ctx) {
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];
    const cfg = {
      id: node.id,
      x: node.x,
      y: node.y,
      width: 240,
      height: 30,
      label: node.label
    };
    _createNode(ctx, cfg);
    if(node.children.length > 0) {
      _drawNodes(node.children, ctx);
    }
  }
}

/**
 * 绘制连线
 * @param edges
 * @param ctx
 * @private
 */
function _drawEdges(edges, canvas) {
  for(let i=0;i<edges.length;i++) {
    const edge = edges[i];
    const sourceNode = getCanvasItemById(canvas, edge.source);
    const targetNode = getCanvasItemById(canvas, edge.target);
    const x1 = sourceNode.left + sourceNode.width/2;
    const y1 = sourceNode.top + sourceNode.height;
    const x2 = targetNode.left + targetNode.width/2;
    const y2 = targetNode.top;
    _drawLine(canvas, x1, y1, x2, y2);
  }
}
var getAngle = function(start,end){
  var diff_x = end.x - start.x,
    diff_y = end.y - start.y;
  //返回角度,不是弧度
  return 360*Math.atan(diff_y/diff_x)/(2*Math.PI);
};
function _drawLine(canvas, x1, y1, x2, y2) {
  const edgeColor = 'black';
  // var triangle = new fabric.Triangle({
  //   width: 12,
  //   height: 15,
  //   fill: edgeColor,
  //   left: x2,
  //   top: y2,
  //   angle: getAngle({x: x1, y: y1}, {x: x2, y: y2}) + 90
  // });

  var line = new fabric.Line([x1, y1, x2, y2], {
    stroke: edgeColor
  });

  var objs = [line];

  var alltogetherObj = new fabric.Group(objs);
  canvas.add(alltogetherObj);
}

/**
 * 创建节点
 * @param canvas
 */
function _createNode(canvas, cfg) {
  const rect = new fabric.Rect({
    fill: 'white',//填充的颜色
    stroke: 'grey',
    rx: 5,
    ry: 5,
    width: cfg.width,//方形的宽度
    height: cfg.height,//方形的高度
    originX: 'center',//调整中心点的X轴坐标
    originY: 'center'//调整中心点的Y轴坐标
  });
  const label = new fabric.Text(cfg.label, {
    fontSize: 12,
    originX: 'center',
    originY: 'center'
  });
  //进行组合

  var group = new fabric.Group([rect, label], {
    id: cfg.id,
    left: cfg.x,//距离画布左侧的距离，单位是像素
    top: cfg.y,//距离画布上边的距离
  })
  canvas.add(group);
}
