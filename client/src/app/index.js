import React from 'react'
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'

import { NavBar } from '../components'
import {Essensplan, GerichteList, GerichteInsert, GerichteUpdate} from '../pages'

import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
    return (
        <Router>
            <NavBar />
            <Routes>
                <Route path="/planen" element={<Essensplan/>} />
                <Route path="/gerichte/list" element={<GerichteList/>} />
                <Route path="/gerichte/create" element={<GerichteInsert/>} />
                <Route path="/gerichte/update/:id" element={<GerichteUpdate/>} />
            </Routes>
        </Router>
    )
}

export default App
