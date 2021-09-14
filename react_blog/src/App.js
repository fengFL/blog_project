import Header from "./components/Header"
import Content from "./components/Content"
import MyList from "./pages/list/index"
import Detail from "./pages/detail/index"
import "./comm.css"
import { Route, Switch, Redirect, BrowserRouter } from "react-router-dom"
const App = () => {
    return (
        <>
            <BrowserRouter >
                <Header />
                <Switch >
                    <Route exact path="/" component={Content} />
                    <Route exact path="/list/:id" component={MyList} />
                    <Route path="/list/detail/:id" component={Detail} />
                    <Redirect to="/" />
                </Switch>

            </BrowserRouter>

        </>
    )
}

export default App