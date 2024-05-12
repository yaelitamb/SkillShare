import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import MainPage from './MainPage';

function App() {
    return (
        <BrowserRouter>
            <div>
                <Switch>
                    {/* Redirect to the login page when accessing the root path */}
                    <Route exact path="/">
                        <Redirect to="/login" />
                    </Route>
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Register} />
                    <Route path="/main" component={MainPage} />
                    {/* Otros componentes */}
                </Switch>
            </div>
        </BrowserRouter>
    );
}

export default App;

