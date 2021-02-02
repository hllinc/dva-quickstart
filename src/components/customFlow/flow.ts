import {fabric} from 'fabric';
// 默认数据
const defaultData = {
  nodes: [{
    "id": "AUD_MATCHED",
    "label": "AUD_MATCHED",
    "color": "blue"
  }, {
    "id": "BEGIN_CONVERT_CALC",
    "label": "BEGIN_CONVERT_CALC",
    "color": "blue"
  }, {
    "id": "CONVERT_END",
    "label": "CONVERT_END"
  }, {
    "id": "MSG_SEND",
    "label": "MSG_SEND",
    "color": "blue"
  }, {
    "id": "MSG_SEND_CHECK",
    "label": "MSG_SEND_CHECK",
    "color": "blue"
  }, {
    "id": "MSG_SEND_CHECK_FAILED",
    "label": "MSG_SEND_CHECK_FAILED"
  }, {
    "id": "MSG_SEND_CHECK_PASSED",
    "label": "MSG_SEND_CHECK_PASSED"
  }, {
    "id": "MSG_SEND_FAILED",
    "label": "MSG_SEND_FAILED"
  }, {
    "id": "MSG_SEND_PASSED",
    "label": "MSG_SEND_PASSED"
  }, {
    "id": "ROOT",
    "label": "ROOT",
    "color": "red"
  }],
  edges: [{
    "source": "AUD_MATCHED",
    "target": "MSG_SEND_CHECK",
    "label": "0",
    "color": "black"
  }, {
    "source": "BEGIN_CONVERT_CALC",
    "target": "CONVERT_END",
    "label": "1",
    "color": "black"
  }, {
    "source": "MSG_SEND",
    "target": "MSG_SEND_FAILED",
    "label": "2",
    "color": "black"
  }, {
    "source": "MSG_SEND",
    "target": "MSG_SEND_PASSED",
    "label": "3",
    "color": "black"
  }, {
    "source": "MSG_SEND_CHECK",
    "target": "MSG_SEND_CHECK_FAILED",
    "label": "4",
    "color": "black"
  }, {
    "source": "MSG_SEND_CHECK",
    "target": "MSG_SEND_CHECK_PASSED",
    "label": "5",
    "color": "black"
  }, {
    "source": "MSG_SEND_CHECK_PASSED",
    "target": "MSG_SEND",
    "label": "6",
    "color": "black"
  }, {
    "source": "MSG_SEND_PASSED",
    "target": "BEGIN_CONVERT_CALC",
    "label": "7",
    "color": "black"
  }, {
    "source": "ROOT",
    "target": "AUD_MATCHED",
    "label": "8",
    "color": "black"
  }]
};

/**
 * 初始化画布
 * @param data
 * @param canvas
 */
export function initMap(mapData, canvas) {
  if (!mapData) {
    mapData = defaultData;
  }
  // 格式化数据
  mapData = _formatData(mapData);
  // 绘制节点
  _drawNodes(mapData.nodes, canvas);
  // 绘制连接线
  _drawEdges(mapData.edges, canvas);
  // 注册事件
}

/**
 * 格式化数据
 * @param data
 * @private
 */
function _formatData(data) {
  return data;
}

/**
 * 绘制画布上的节点
 * @param nodes
 * @param ctx
 * @private
 */
function _drawNodes(nodes, ctx) {
  // 默认节点属性
  const cfg = {
    id: '',
    x: 20,
    y: 20,
    width: 180,
    height: 30,
    label: 'init'
  };
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];
    cfg.label = node.label;
    cfg.id = node.id;
    _createNode(ctx, cfg);
    cfg.y = cfg.y + cfg.height + 50;
  }
}

/**
 * 绘制连线
 * @param edges
 * @param ctx
 * @private
 */
function _drawEdges(edges, canvas) {
  var line = new fabric.Line([20, 20, 40, 30],
    {
      top: 10,
      left: 10,
      stroke: 'black'
    });
  canvas.add(line);
}

/**
 * 绘制箭头
 * @param ctx
 * @param x
 * @param y
 * @param direction 箭头方向
 * @private
 */
function _drawArrow(ctx, x, y, direction) {
  const cfg = {
    width: 10, // 箭头宽度
    height: 8 // 箭头高度
  }
  ctx.beginPath();
  ctx.moveTo(x, y);
  switch (direction) {
    case 'down':
      ctx.lineTo(x - cfg.width / 2, y - cfg.height);
      ctx.lineTo(x + cfg.width / 2, y - cfg.height);
      break;
    case 'up':
      ctx.lineTo(x - cfg.width / 2, y + cfg.height);
      ctx.lineTo(x + cfg.width / 2, y + cfg.height);
      break;
    case 'left':
      ctx.lineTo(x + cfg.height, y - cfg.width / 2);
      ctx.lineTo(x + cfg.height, y + cfg.width / 2);
      break;
    case 'right':
      ctx.lineTo(x - cfg.height, y - cfg.width / 2);
      ctx.lineTo(x - cfg.height, y + cfg.width / 2);
      break;
  }
  ctx.fillStyle = 'black';
  ctx.fill();
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
