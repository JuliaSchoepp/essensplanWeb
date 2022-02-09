import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Collapse = styled.div.attrs({
    className: 'collpase navbar-collapse',
})``

const List = styled.div.attrs({
    className: 'navbar-nav mr-auto',
})``

const Item = styled.div.attrs({
    className: 'collpase navbar-collapse',
})``

class Links extends Component {
    render() {
        return (
            <React.Fragment>
                <Link to="/planen" className="navbar-brand">
                    Essensplan
                </Link>
                <Collapse>
                    <List>
                        <Item>
                            <Link to="/gerichte/list" className="nav-link">
                                Kochbuch
                            </Link>
                        </Item>
                        <Item>
                            <Link to="/gerichte/create" className="nav-link">
                                Neues Gericht
                            </Link>
                        </Item>
                    </List>
                </Collapse>
            </React.Fragment>
        )
    }
}

export default Links