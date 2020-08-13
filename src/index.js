import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { store, getProducts } from './redux_shop'
import { Provider } from 'react-redux'

store.dispatch(getProducts())
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />,
  </Provider>,
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
