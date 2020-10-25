import React from 'react';
import ReactDOM from 'react-dom';
import { QueryCache, ReactQueryCacheProvider } from 'react-query'

import App from './App';
import reportWebVitals from './reportWebVitals';
import GlobalStyles from './styles/Global'

const queryCache = new QueryCache({
  defaultConfig: {
    queries: {
      enabled: true
    }}
})

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyles />
      <App />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
