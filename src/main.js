import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './style/main.scss';
import reducer from './reducer';
import Landing from './component/landing';
import thunk from './middleware/redux-thunk';
import reporter from './middleware/redux-reporter';

const store = process.env.NODE_ENV === 'production' ?
  createStore(reducer, applyMiddleware(thunk)) :
  createStore(reducer, composeWithDevTools(applyMiddleware(reporter, thunk)));

const container = document.createElement('main');
document.body.appendChild(container);

render(
  <Provider store={store} >
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Landing} />
      </Switch>
    </BrowserRouter>
  </Provider>, container
);

