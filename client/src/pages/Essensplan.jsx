import React, { Component } from 'react'
import ReactTable from 'react-table-6'
import api from '../api'

import styled from 'styled-components'

import 'react-table-6/react-table.css'

const Wrapper = styled.div`
padding: 0 40px 40px 40px;
`

const Delete = styled.div`
    color: #ff0000;
    cursor: pointer;
`
const Title = styled.h1.attrs({
    className: 'h1',
})``

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

class DeleteGericht extends Component {
    deleteMahlzeit = event => {
        event.preventDefault()

        // Eintrag löschen

        /*
        if (
            window.confirm(
                `Willst du die Mahlzeit ${this.props.id} endgütig löschen?`,
            )
        ) {
            api.deleteGerichtById(this.props.id)
            window.location.reload()
        }
        */
    }

    render() {
        return <Delete onClick={this.deleteGericht}>Löschen</Delete>
    }
}

class InputMahlzeit extends Component {
    constructor(props) {
        super(props)

        this.state = {
            mahlzeitName: '',
            gerichtName: '',
        }
        
        } 

    handleChangeInputMahlzeitName = async event => {
        const mahlzeitName = event.target.value
        this.setState({ mahlzeitName })
    }

    handleChangeInputGerichtName = async event => {
        const gerichtName = event.target.value
        // wenn nicht in Gerichte -> Spalte wird rot
        this.setState({ gerichtName })
    }

    handleIncludeMahlzeit = async () => {
        const { mahlzeitName, gerichtName } = this.state
        }

        render() {
            const { mahlzeitName, gerichtName } = this.state
    
    
            return (
                <Wrapper>
                    <Title>Planer</Title>
    
                    <Label>Name: </Label>
                    <InputText
                        type="text"
                        value={mahlzeitName}
                        onChange={this.handleChangeInputMahlzeitName}
                    />
    
                    <Label>Gericht: </Label>
                    <InputText
                        type="text"
                        value={gerichtName}
                        onChange={this.handleChangeInputGerichtName}
                    />
    
                    <Button onClick={this.handleIncludeMahlzeit}>Mahlzeit eintragen</Button>
                    <Button onClick={this.getRandom}>Random</Button>
                </Wrapper>
            )
        }
}


class Essensplan extends Component {

    constructor(props) {
        super(props)
        this.state = {
            gerichteNamen: [],
            columns: [],
            isLoading: false,
            planData: []
        }
    }

    componentDidMount = async () => {
        this.setState({ isLoading: true })

        await api.getAllGerichte().then(gerichte => {
            
            let names = []

            for (var i in gerichte.data){
                names.push(i.name);
            }

            this.setState({
                gerichteNamen: names,
                isLoading: false,
            })
        })
    }

    handleSavePlan = async () => {
        const { planData } = this.state
        const payload = { planData }
        console.log(payload)

        // send to server to do sth with it
        /*
        await api.insertGericht(payload).then(res => {
            window.alert(`Gericht erfolgreich hinzugefügt`)
            this.setState({
                name: '',
                saison: '',
                komplex: '',
                typ: '',
                zutaten: '',
            })
        })
        */
    } 

    render() {
        const { gerichteNamen, isLoading, planData } = this.state

        const columns = [
            {
                Header: 'Name',
                accessor: 'name',
            },
            {
                Header: 'Gericht',
                accessor: 'gericht',
            },
            {
                Header: 'In Kochbuch?',
                accessor: 'inKochbuch',
            },
            {
                Header: '',
                accessor: '',
                Cell: function(props) {
                    return (
                        <span>
                            <DeleteGericht id={props.original._id} />
                        </span>
                    )
                },
            },
        ]

        let showTable = true

        return (
            <Wrapper>
            <InputMahlzeit/>
                {showTable && (
                    <ReactTable
                        data={planData}
                        columns={columns}
                        loading={isLoading}
                        defaultPageSize={10}
                        showPageSizeOptions={true}
                        minRows={0}
                    />
                )}
            <Button onClick={this.handleSavePlan}>Plan speichern</Button>
            </Wrapper>
        )
    }
}

export default Essensplan