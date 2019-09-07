import express from 'express';
import { render } from './utils';
import { getStore } from '../store';
import { matchRoutes } from 'react-router-config';
import routes from '../Routes';
import proxy from 'express-http-proxy';

const app = express();
app.use(express.static('public'));

app.use(
  '/todos',
  proxy('https://jsonplaceholder.typicode.com', {
    proxyReqPathResolver: function(req) {
      return '/todos' + req.url;
    },
  }),
);

app.get('*', (req, res) => {
  const store = getStore();

  const promises = [];

  const matchedRoutes = matchRoutes(routes, req.url);

  matchedRoutes.forEach(item => {
    if (item.route.loadData) {
      const promise = new Promise((resolve, reject) => {
        item.route
          .loadData(store)
          .then(resolve)
          .catch(resolve);
      });
      promises.push(promise);
    }
  });
  Promise.all(promises).then(() => {
    const context = { css: [] };
    const html = render(req, routes, store, context);
    if (context.NotFound) {
      res.status(404);
      res.send(html);
    } else {
      res.send(html);
    }
  });
});

app.listen(3000, () => {
  console.log('server running on port 3000');
});
