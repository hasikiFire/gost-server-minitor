const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 30000;

// 使用 body-parser 中间件来解析 JSON 数据
app.use(bodyParser.json());

// 定义 /observer 接口
// 通过 service 区分不同用户
app.post('/plugin/observer', (req, res) => {
  console.log('observer Received data:', JSON.stringify(req.body, null, 2));
  // 在这里处理接收到的数
  res.send('OK');
});

app.post('/plugin/limiter', (req, res) => {
  console.log('limiter Received data:', JSON.stringify(req.body, null, 2));
  // 在这里处理接收到的数
  res.json({ in: 999999999, out: 999999999 });
});

// 定义 /auth 接口
app.post('/plugin/auth', (req, res) => {
  console.log('auth Received data:', req.body);
  // console.log('req.body.username : ', req.body.username);
  if (
    req.body.username === '10018709' &&
    req.body.password === '0d4660882cf9974d53f0ef5553ab149b'
  ) {
    res.json({ ok: true, id: '10018709' });
  } else {
    res.json({ ok: false });
  }
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on http://0.0.0.0:${port}`);
});
