import React, { Component } from 'react'
import api from '../api'

import styled from 'styled-components'

const Title = styled.h1.attrs({
    className: 'h1',
})``

const Wrapper = styled.div.attrs({
    className: 'form-group',
})`
    margin: 0 30px;
`

const Label = styled.label`
    margin: 5px;
`

const InputText = styled.input.attrs({
    className: 'form-control',
})`
    margin: 5px;
`

const Button = styled.button.attrs({
    className: `btn btn-primary`,
})`
    margin: 15px 15px 15px 5px;
`

const CancelButton = styled.a.attrs({
    className: `btn btn-danger`,
})`
    margin: 15px 15px 15px 5px;
`


class SaveFiles extends Component {
    constructor(props){
        super(props)
    }

    render(){
        return(
            <Wrapper>
                <Title>
                    Hier kommen die Dateien zum Download hin:
                </Title>
                <Label>
                    Essensplan
                </Label>
                <Label>
                    Einkaufsliste
                </Label>
                <Label>
                    Vorschau des Plans?!
                </Label>
            </Wrapper>
        )
    }
   
}

export default SaveFiles