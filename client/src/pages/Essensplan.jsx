import React, { Component } from 'react'
import api from '../api'
import { Hint } from 'react-autocomplete-hint'
import Select from 'react-dropdown-select'

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
    background-color: ${props => props.inKb ? '#f6fcf2': '#faf5ed'};
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

    handleChangeInputGericht = async (obj) => {
        const gerichtInput = obj[0].label
        this.setState({ gerichtInput })
    }

    handlePlanen = async (event) => {
        event.preventDefault()
        const newPlan = {
            nameMz: this.state.nameInput,
            gericht: this.state.gerichtInput,
            inKochbuch: this.state.namenListe.includes(this.state.gerichtInput)? true: false,
        }
        this.props.onPlanen(newPlan)
        this.setState({
            nameInput: "",
            gerichtInput: null,
            }
        )
    }

    render() {
        const options = this.state.namenListe.map(namen => {
            return {value: namen,
                    label: namen}
        })

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
                <Select options={options}
                        value={this.state.gerichtInput}
                        onChange={this.handleChangeInputGericht}
                /> 
                {/* <Hint options={this.state.namenListe} allowTabFill={true}>
                    <input
                    className='form-control'
                    value={this.state.gerichtInput}
                    onChange={this.handleChangeInputGericht} />
                </Hint> */}
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
                <td><DeleteGericht nameMz={plan.nameMz} onDelete={this.props.onDelete}/></td>
            </TableRow>
            )
        }
    }

    class DeleteGericht extends Component {
        deleteMahlzeit = event => {
            event.preventDefault()
            const mahlzeit = this.props.nameMz;
            this.props.onDelete(mahlzeit);
        }
    
        render() {
            return <Delete onClick={this.deleteMahlzeit}>Löschen</Delete>
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
                    onDelete={this.props.onDelete}
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

class DownloadArea extends Component {
    handleDownloadPlan = event => {
        event.preventDefault();
        window.open('http://localhost:3000/api/downloads/plan')
    }

    handleDownloadListe = event => {
        event.preventDefault();
        window.open('http://localhost:3000/api/downloads/liste')
    }

    render(){
        return(
            <Wrapper>
            <Title>
                Download
            </Title>
            <Button onClick={this.handleDownloadPlan}>
                Plan laden
            </Button>
            <Button onClick={this.handleDownloadListe}>
                Einkaufsliste laden
            </Button>
        </Wrapper>
        )
    }
}

class Planer extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            geplanteMahlzeiten:  [],
            downloadIsHidden: true
        }
        this.handlePlanen = this.handlePlanen.bind(this);
        this.toggleHidden = this.toggleHidden.bind(this);
        this.deletePlan = this.deletePlan.bind(this);
    }

    deletePlan(mzName){
        const newList = this.state.geplanteMahlzeiten.filter( function (plan){
            return plan.nameMz != mzName
        })
        this.setState({
            geplanteMahlzeiten: newList
        })
    }

    toggleHidden() {
        this.setState({
            downloadIsHidden: !this.state.downloadIsHidden
        })
    }

    handlePlanen(newPlan){
        const geplanteMzNamen = this.state.geplanteMahlzeiten.map(plan => plan.nameMz);
        if (geplanteMzNamen.includes(newPlan.nameMz)){
            alert("Mahlzeitnamen müssen eindeutig sein!")
        } else {
        this.setState({
            geplanteMahlzeiten:[...this.state.geplanteMahlzeiten, newPlan]
        })
    }
    }

    handleSpeichern = async (event) => {
        event.preventDefault();
        const payload = this.state.geplanteMahlzeiten;
        await api.savePlan(payload).then(
                this.toggleHidden()
        )
    }
    
    render() {
        return (
            <Wrapper>
                <InputArea onPlanen={this.handlePlanen}/>
                <PlanDarst plans={this.state.geplanteMahlzeiten} onDelete={this.deletePlan}/>
                <Wrapper>
                <ButtonSave onClick={this.handleSpeichern}>Plan speichern</ButtonSave>
                </Wrapper>
                {!this.state.downloadIsHidden && <DownloadArea />}
            </Wrapper>
        )
    }
}


export default Planer