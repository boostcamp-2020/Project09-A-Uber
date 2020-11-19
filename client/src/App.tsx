import React, { FC } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { ApolloProvider } from '@apollo/react-hooks'

import Home from 'routes/Home';
import theme from 'theme';
import GlobalStyle from 'theme/global';
import client from './apollo';

const App: FC = () => (
  <ApolloProvider client={client} >
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  </ApolloProvider>
);

export default App;
