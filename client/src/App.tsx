import React, { FC } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { ApolloProvider } from '@apollo/react-hooks';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import SignIn from '@/routes/SignIn';
import Home from '@routes/Home';
import theme from '@theme/.';
import GlobalStyle from '@theme/global';
import reducer from '@reducers/.';
import saga from '@sagas/.';
import client from '@/apollo';

import '@theme/antd.less';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(saga);

const App: FC = () => (
  <ApolloProvider client={client}>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/signin" component={SignIn} />
          </Switch>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  </ApolloProvider>
);

export default App;
