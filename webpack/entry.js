import Router from 'preact-router';
import { h, render, Component } from 'preact';
import createStore from 'unistore';
import { Provider } from 'unistore/preact';
import devtools    from 'unistore/devtools';
import { fromJS } from 'immutable';

import Hello from './components/Hello';

let initialState = {
  global: {
    count: 0,
    test: true
  },
  hello: {
    count : 1
   }
};

let store = process.env.NODE_ENV === 'production' ?  createStore(initialState) : devtools(createStore(initialState));

// If actions is a function, it gets passed the store:

render(
  <Provider store={store}>
    <Router>
      <Hello path="/"/>
            {/* <B path="/b" id="42" />
      <C path="/c/:id" />
      <C path="/d/:optional?/:params?" />
      <D default /> */}
    </Router>
  </Provider>,
  document.getElementById('root')
);

