import React, { Component } from 'react'
import api from '../api'

import styled from 'styled-components'
import { useParams } from 'react-router-dom'

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


class GerichtUpdate extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
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

    handleChangeInputSaison = async event => {
        const saison = event.target.value
        this.setState({ saison })
    }

    handleChangeInputKomplex = async event => {
        const komplex = event.target.value
        this.setState({ komplex })
    }

    handleChangeInputTyp = async event => {
        const typ = event.target.value
        this.setState({ typ })
    }

    handleChangeInputZutaten = async event => {
        const zutaten = event.target.value
        this.setState({ zutaten })
    }

    handleUpdateGericht = async () => {
        const { id, name, saison, komplex, typ, zutaten } = this.state
        const arrayZutaten = zutaten.split(',')
        const payload = { name, saison, komplex, typ, zutaten: arrayZutaten }

        await api.updateGerichtById(id, payload).then(res => {
            window.alert(`Gericht erfolgreich geändert`)
            this.setState({
                name: '',
                saison: '',
                komplex: '',
                typ: '',
                zutaten: '',
            })
        })
    }

    componentDidMount = async () => {
        const { id } = this.state;
        const gericht = await api.getGerichtById(id)

        this.setState({
            name: gericht.data.data.name,
            saison: gericht.data.data.saison,
            komplex: gericht.data.data.komplex,
            typ: gericht.data.data.typ,
            zutaten: gericht.data.data.zutaten.join(', '),
        })
    }

    render() {
        const { name, saison, komplex, typ, zutaten } = this.state
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
                <InputText
                    type="text"
                    value={saison}
                    onChange={this.handleChangeInputSaison}
                />  

                <Label>Komplexität: </Label>
                <InputText
                    type="text"
                    value={komplex}
                    onChange={this.handleChangeInputKomplex}
                />   

                <Label>Typ: </Label>
                <InputText
                    type="text"
                    value={typ}
                    onChange={this.handleChangeInputTyp}
                />     

                <Label>Zutaten: </Label>
                <InputText
                    type="text"
                    value={zutaten}
                    onChange={this.handleChangeInputZutaten}
                />

                <Button onClick={this.handleUpdateGericht}>Gericht ändern</Button>
                <CancelButton href={'/gerichte/list'}>Abbrechen</CancelButton>
            </Wrapper>
        )
    }
}

export default GerichtUpdate