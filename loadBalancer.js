const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const PORT = process.env.PORT || 8080;

const producerServer = 'http://localhost:3000';
const consumerServer = 'http://localhost:3001';
// const routes = {
//     '/sendNotification':producerServer,
//     // '/orders': 'http://localhost:3001',
//     '/receiveNotification': consumerServer
// }

// for(const route in routes){
//     const target = routes[route];
//     app.use(route,createProxyMiddleware({target}))
// }

const producerProxy = createProxyMiddleware({
  target: producerServer,
  changeOrigin: true,
  pathRewrite: {
    '^/sendNotification': '/sendNotification',
  },
})
// .on('error', (err, req, res) => {
//     console.error('producerProxy error:', err);
//     res.status(500).send('producerProxy error occurred');
//   });

const consumerProxy = createProxyMiddleware({
  target: consumerServer,
  changeOrigin: true,
  pathRewrite: {
    '^/receiveNotification': '/receiveNotification',
  },
})
// .on('error', (err, req, res) => {
//     console.error('consumerProxy error:', err);
//     res.status(500).send('consumerProxy error occurred');
//   });

app.use('/sendNotification', producerProxy);
app.use('/receiveNotification', consumerProxy);
  
app.listen(PORT, () => {
  console.log(`Load balancer running on port ${PORT}`);
});
