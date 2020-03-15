// определять ссылки

import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { AuthPage } from './pages/AuthPage'
import { FirstPage } from './pages/FirstPage'
import { SecondPage } from './pages/SecondPage'


export const useRoutes = isAuthenticated => {
    // усли есть токен 
    if (isAuthenticated) {
        return (
            <Switch>
                <Route path="/first" exact>
                    <FirstPage />
                </Route>
                <Route path="/second" exact>
                    <SecondPage />
                </Route>
                <Redirect to="/first" />
            </Switch>
        )
    }

    return (
        <Switch>
            <Route path="/" exact>
                <AuthPage />
            </Route>
            <Redirect to="/" />
        </Switch>
    )
}