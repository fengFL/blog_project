import React from "react"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import Login from "./login"
import AdminIndex from "./adminIndex"
function Main() {
    return (
        <>
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact component={Login} />
                    <Route path="/index" component={AdminIndex} />
                </Switch>
            </BrowserRouter>
        </>
    )
}

export default Main