import Router from 'preact-router';
import AsyncRoute from 'preact-async-route';
import { h, render, Component } from 'preact';
import createStore from 'unistore';
import { Provider } from 'unistore/preact';
import devtools    from 'unistore/devtools';

import Hello from './components/Hello';

let initialState = {
  global: {
    count: 0,
    test: true
  },
  hello: {
    count : 1,
    test: false,
    input: 's',
    list: ['a1','b2']
   }
};

let store = process.env.NODE_ENV === 'production' ?  createStore(initialState) : devtools(createStore(initialState));

// If actions is a function, it gets passed the store:

render(
  <Provider store={store}>
    <Router>
      <Hello path="/"/>
      {/*       
      <AsyncRoute
        path="/about"
        getComponent={ () => System.import('./components/Hello').then(module => module.default) }
        loading={ () => <div>loading...</div> }
      />
      <B path="/b" id="42" />
      <C path="/c/:id" />
      <C path="/d/:optional?/:params?" />
      <D default /> */} 
    </Router>
  </Provider>,
  document.getElementById('root')
);

