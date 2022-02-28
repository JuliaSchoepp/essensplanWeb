import React from 'react'
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import { NavBar } from '../components'
import {Essensplan, GerichteList, GerichteInsert, GerichteUpdate } from '../pages'

import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
    return (
        <Router>
            <NavBar />
            <Switch>
                <Route path="/" exact component={Essensplan} />
                <Route path="/gerichte/list" exact component={GerichteList} />
                <Route path="/gerichte/create" exact component={GerichteInsert} />
                <Route path="/gerichte/update/:id" exact component={GerichteUpdate} />
            </Switch>
        </Router>
    )
}

export default App
