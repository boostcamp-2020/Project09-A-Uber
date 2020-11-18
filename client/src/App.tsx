import React, { FC } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from 'routes/Home';

const App: FC = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home} />
    </Switch>
  </BrowserRouter>
);

export default App;
