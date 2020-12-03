import React, { FC } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'emotion-theming';
import { ApolloProvider } from '@apollo/react-hooks';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import ChatRoom from '@routes/ChatRoom';
import SignIn from '@/routes/SignIn';
import Home from '@routes/Home';
import UserMain from '@routes/User/Main';
import UserWaitingDriver from '@routes/User/WaitingDriver';
import DriverMain from '@routes/Driver/Main';
import DriverGoToOrigin from '@routes/Driver/GoToOrigin';
import DriverGoToDestination from '@routes/Driver/GoToDestination';
import Signup from '@routes/Signup';
import SearchDriver from '@routes/User/SearchDriver';
import UserGoToDestination from '@routes/User/GoToDestination';

import theme from '@theme/.';
import GlobalStyle from '@theme/global';
import reducer from '@reducers/.';
import client from '@/apollo';
import auth from '@/utils/auth';

import '@theme/antd.less';

const store = createStore(reducer);

const App: FC = () => (
  <ApolloProvider client={client}>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={auth(Home)} />
            <Route exact path="/user" component={auth(UserMain, 'user')} />
            <Route exact path="/user/waitingDriver" component={auth(UserWaitingDriver, 'user')} />
            <Route
              exact
              path="/user/goToDestination"
              component={auth(UserGoToDestination, 'user')}
            />
            <Route exact path="/driver" component={auth(DriverMain, 'driver')} />
            <Route exact path="/driver/goToOrigin" component={auth(DriverGoToOrigin, 'driver')} />
            <Route
              exact
              path="/driver/goToDestination"
              component={auth(DriverGoToDestination, 'driver')}
            />
            <Route exact path="/user/searchDriver" component={auth(SearchDriver, 'user')} />
            <Route exact path="/signin" component={SignIn} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/chatroom/:chatId" component={auth(ChatRoom)} />
          </Switch>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  </ApolloProvider>
);

export default App;
