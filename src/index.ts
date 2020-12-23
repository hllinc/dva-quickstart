import dva from 'dva';
import './index.css';
import {createBrowserHistory} from "history";

import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";

Sentry.init({
  dsn: "http://935f423fb3a54b959b8f2873956d68c8@127.0.0.1:9000/3",
  autoSessionTracking: true,
  integrations: [
    new Integrations.BrowserTracing(),
  ],

  // We recommend adjusting this value in production, or using tracesSampler
  // for finer control
  tracesSampleRate: 1.0,
});

const createHistory = createBrowserHistory();

const app = dva({
  history: createHistory,
  initialState: {
    products: [
      {name: 'dva', id: 1, key: 1},
      {name: 'antd', id: 2, key: 2},
    ],
  },
});

app.model(require('./models/products').default);
app.model(require('./models/todos').default);
app.model(require('./models/g6').default);

app.router(require('./router').default);

app.start('#root');
