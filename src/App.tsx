import React from "react";
import "./App.css";
import { SignIn, Dashboard } from "./pages";
import { PersistGate } from "redux-persist/integration/react";

import { Switch, Route, Redirect } from "react-router";
import { ThemeProvider } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "./theme";
import { useSelector } from "react-redux";
import { History } from "history";
import { ConnectedRouter } from "connected-react-router";

function PrivateRoute({ children, ...rest }: any) {
  const isLoggined = useSelector<any>((state) => state.auth.isLoggined);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isLoggined ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/signin",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

interface AppProps {
  history: History;
  persistor?: any;
}
const App = ({ history, persistor }: AppProps): any => {
  return (
    <PersistGate loading={null} persistor={persistor}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/signin" component={SignIn} />
            <PrivateRoute path="/">
              <Dashboard />
            </PrivateRoute>
          </Switch>
        </ConnectedRouter>
      </ThemeProvider>
    </PersistGate>
  );
};

export default App;
