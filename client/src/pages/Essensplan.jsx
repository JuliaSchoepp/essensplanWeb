import React, { Component } from 'react'
import api from '../api'
import { Hint } from 'react-autocomplete-hint'

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
`

const Button = styled.button.attrs({
    className: `btn btn-primary`,
})`
    margin: 15px 15px 15px 5px;
`

const ButtonSave = styled.button.attrs({
    className: `btn btn-secondary btn-lg btn-block`,
})`
    margin: 15px 15px 15px 5px;
`

const TableRow = styled.tr`
    background-color: ${props => props.inKB? '#f6fcf2': '#faf5ed'};
    border-bottom: 1px solid #ddd;
    padding: 8px;
`

const TableHead = styled.thead`
    padding: 8px;
    border-bottom: 1px solid #ddd;
`

const THead = styled.th`
    padding: 8px;
    border-bottom: 1px solid #ddd;
`

class DeleteGericht extends Component {
    deleteMahlzeit = event => {
        event.preventDefault()

    }

    render() {
        return <Delete onClick={this.deleteMahlzeit}>Löschen</Delete>
    }
}

class InputArea extends Component {
    
    constructor(props){
        super(props)
        this.state = {
        isLoading: false,
        namenListe: [],
        nameInput: "",
        gerichtInput: "",
        gerichteListe: [],
        randomTries: []
        }
    }

    handleRandom = async (event) => {
        let keepSearching = true
        while (keepSearching){
            if (this.state.randomTries.length == this.state.namenListe.length){
                this.setState({
                    gerichtInput: "Keine weiteren Optionen"
                })
                keepSearching = false
            }

            const randIndex = Math.floor(Math.random() * this.state.namenListe.length)
            if (!this.state.randomTries.includes(randIndex)){
                keepSearching = false
                const randomGericht = this.state.namenListe[randIndex]
                this.setState({
                    randomTries: [...this.state.randomTries, randIndex],
                    gerichtInput: randomGericht,
                })
            }
        }
        


    }
    
    componentDidMount = async () => {
        this.setState({ isLoading: true })

        await api.getAllGerichte().then(gerichte => {

            let names = []

            const gerArray = gerichte.data.data

            gerArray.forEach( function(gerObj){
                names.push(gerObj.name)
            });

            this.setState({
                namenListe: names,
                isLoading: false,
            })
        })
    }

    handleChangeInputName = async event => {
        const nameInput = event.target.value
        this.setState({ nameInput })
    }

    handleChangeInputGericht = async event => {
        const gerichtInput = event.target.value
        this.setState({ gerichtInput })
    }

    handlePlanen = async (event) => {
        event.preventDefault()
        const newPlan = {
            nameMz: this.state.nameInput,
            gericht: this.state.gerichtInput,
            inKochbuch: this.state.namenListe.includes(this.state.nameInput)? true: false,
        }
        this.props.onPlanen(newPlan)
        this.setState({
            nameInput: "",
            gerichtInput: "",
            }
        )
    }

    render() {
        return (
            <Wrapper>
                <Title>
                    Planen
                </Title>
                <Label>
                    Name der Mahlzeit
                </Label>
                <InputText
                    type="text"
                    value={this.state.nameInput}
                    onChange={this.handleChangeInputName}
                />
                <Label>
                    Geplantes Gericht
                </Label>
                <Hint options={this.state.namenListe} allowTabFill={true}>
                    <input
                    className='form-control'
                    value={this.state.gerichtInput}
                    onChange={this.handleChangeInputGericht} />
                </Hint>
                <Button onClick={this.handlePlanen}>Planen</Button>
                <Button onClick={this.handleRandom}>Random</Button>
            </Wrapper>
        )
    }
}


class MahlzeitRow extends Component {
    render() {
        const plan = this.props.plan
        
        return (
            <TableRow inKb={plan.inKochbuch}>
                <td>{plan.nameMz}</td>
                <td>{plan.gericht}</td>
                <td><DeleteGericht/></td>
            </TableRow>
            )
        }
    }


class PlanDarst extends Component {
    render(){
        const rows = [];
        this.props.plans.map((plan) => {
            rows.push(
                <MahlzeitRow
                    plan={plan}
                    key={plan.name}
                    />
            )
        });
        return (
            <Wrapper>
            <table className="table">
                <TableHead>
                    <tr>
                        <THead>Name der Mahlzeit</THead>
                        <THead>Geplantes Gericht</THead>
                        <THead></THead>
                    </tr>
                </TableHead>
                <tbody>{rows}</tbody>
            </table>
            </Wrapper>
        );
    }
}


class Planer extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            geplanteMahlzeiten:  [],
        }
        this.handlePlanen = this.handlePlanen.bind(this);
    }

    handlePlanen(newPlan){
        this.setState({
            geplanteMahlzeiten:[...this.state.geplanteMahlzeiten, newPlan]
        })
    }

    handleSpeichern = async (event) => {
        event.preventDefault()
        console.log(this.state.geplanteMahlzeiten)
        window.location.href = '/save'
    }
    
    render() {
        return (
            <Wrapper>
                <InputArea onPlanen={this.handlePlanen}/>
                <PlanDarst plans={this.state.geplanteMahlzeiten}/>
                <Wrapper>
                <ButtonSave onClick={this.handleSpeichern}>Plan speichern</ButtonSave>
                </Wrapper>
            </Wrapper>
        )
    }
}


export default Planer