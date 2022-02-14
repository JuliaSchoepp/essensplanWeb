import React, { Component } from 'react'
import Select from 'react-dropdown-select'
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

class GerichteInsert extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: '',
            saison: '',
            komplex: '',
            typ: '',
            zutaten: '',
        }

    }


    handleChangeInputName = async event => {
        const name = event.target.value
        this.setState({ name })
    }

    handleChangeInputSaison = async (obj) => {
        const saison = obj[0].label
        this.setState({ saison })
    }

    handleChangeInputKomplex = async (obj) => {
        const komplex = obj[0].label
        this.setState({ komplex })
    }

    handleChangeInputTyp = async (obj) => {
        const typ = obj[0].label
        this.setState({ typ })
    }

    handleChangeInputZutaten = async event => {
        const zutaten = event.target.value
        this.setState({ zutaten })
    }

    handleIncludeGericht = async () => {
        const { name, saison, komplex, typ, zutaten } = this.state
        const arrayZutaten = zutaten.split(',')
        const payload = { name, saison, komplex, typ, zutaten: arrayZutaten }

        await api.insertGericht(payload).then(res => {
            window.alert(`Gericht erfolgreich hinzugefügt`)
            this.setState({
                name: '',
                saison: 'Ohne',
                komplex: 'Normal',
                typ: 'Andere',
                zutaten: '',
            })
        })
    } 
    
    render() {
        const { name, saison, komplex, typ, zutaten } = this.state

        const optionsSaison = [
            {value: "Frühling/Sommer", label: "Frühling/Sommer"},
            {value: "Herbst/Winter", label: "Herbst/Winter"},
            {value: "Ohne", label: "Ohne"},
        ]

        const optionsKomplex = [
            {value: "Easy", label: "Easy"},
            {value: "Normal", label: "Normal"},
            {value: "Fancy", label: "Fancy"},
        ]

        const optionsTyp = [
            {value: "Pasta", label: "Pasta"},
            {value: "Suppe ", label: "Suppe"},
            {value: "Kalt", label: "Kalt"},
            {value: "Reis", label: "Reis"},
            {value: "Kartoffeln ", label: "Kartoffeln"},
            {value: "Andere", label: "Andere"},
        ]

        return (
            <Wrapper>
                <Title>Neues Gericht</Title>

                <Label>Name: </Label>
                <InputText
                    type="text"
                    value={name}
                    onChange={this.handleChangeInputName}
                />
                <Label>Saison: </Label>
                <Select options={optionsSaison} 
                        value={saison}
                        onChange={this.handleChangeInputSaison}
                /> 

                <Label>Komplexität: </Label>
                <Select options={optionsKomplex} 
                        value={komplex}
                        onChange={this.handleChangeInputKomplex}
                /> 

                <Label>Typ: </Label>
                <Select options={optionsTyp} 
                        value={typ}
                        onChange={(option) => this.handleChangeInputTyp(option)}
                />   

                <Label>Zutaten (/ getrennt): </Label>
                <InputText
                    type="text"
                    value={zutaten}
                    onChange={this.handleChangeInputZutaten}
                />

                <Button onClick={this.handleIncludeGericht}>Gericht speichern</Button>
                <CancelButton href={'/gerichte/list'}>Abbrechen</CancelButton>
            </Wrapper>
        )
    }
}

export default GerichteInsert