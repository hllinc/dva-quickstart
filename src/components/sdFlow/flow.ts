import {fabric} from 'fabric';

/**
 * 初始化画布
 * @param data
 * @param canvas
 */
export function initMap(mapData, canvas) {
  if (!mapData) {
    mapData = [];
  }
  // 格式化数据
  mapData = _formatData(mapData);
  // 绘制节点
  _drawNodes(mapData.nodes, canvas);
  // 绘制连接线
  _drawEdges(mapData.edges, canvas);
  // 配置画布属性
  // 注册事件
  _initEvent(canvas);
}

function _initEvent(canvas) {
  //鼠标按下事件
  canvas.on("mouse:down", function(e) {
    this.panning = true;
    canvas.selection = false;
  });
  //鼠标抬起事件
  canvas.on("mouse:up", function(e) {
    this.panning = false;
    canvas.selection = true;
  });
  // 移动画布事件
  canvas.on("mouse:move", function(e) {
    if (this.panning && e && e.e) {
      var delta = new fabric.Point(e.e.movementX, e.e.movementY);
      canvas.relativePan(delta);
    }
  });
  // 鼠标滚动画布放大缩小
  canvas.on("mouse:wheel", function(event) {
    var zoom = (event.e.deltaY > 0 ? -0.05 : 0.05) + canvas.getZoom();
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
  const edgeColor = 'black';
  var triangle = new fabric.Triangle({
    width: 10,
    height: 15,
    fill: edgeColor,
    left: 235,
    top: 65,
    angle: 90
  });

  var line = new fabric.Line([50, 100, 200, 100], {
    left: 75,
    top: 70,
    stroke: edgeColor
  });

  var objs = [line, triangle];

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
