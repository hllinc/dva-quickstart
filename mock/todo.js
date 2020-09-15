const Mock = require('mockjs');
let db = Mock.mock({
  'data|3-10': [{
    'key|+1': 1,
    'name': '待办@date',
    content: '测试内容@integer',
    'level|0-2': 0,
    'checked|1': true,
  }]
});

module.exports = {
  [`GET /api/todo/queryAll`](req, res) {

    res.status(200).json(db);
  },

  [`POST /api/todo/add`](req, res) {

    let user = req.body;
    console.log(req);
    user.id = Mock.mock('@id');
    db.data.push(user);

    res.status(200).json(user);
  }
}
