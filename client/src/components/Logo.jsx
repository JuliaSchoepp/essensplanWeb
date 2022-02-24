import React, { Component } from 'react'
import styled from 'styled-components'

import logo from '../logo.png'

const Wrapper = styled.a.attrs({
    className: 'navbar-brand',
})``

class Logo extends Component {
    render() {
        return (
            <Wrapper href='http://localhost:8000'>
                <img src={logo} width="60" height="60" alt="Butter mit Trüffeln" />
            </Wrapper>
        )
    }
}

export default Logo