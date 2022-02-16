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

const ButtonR = styled.button.attrs({
    className: `btn btn-primary right`,
})`
    margin: 15px 15px 15px 5px;
`

const TableRowInKB = styled.tr`
    background-color: #f6fcf2;
`

const TableRowNotKB = styled.tr`
    background-color: #fcfbf5;
`

const TableHead = styled.thead`
    margin: 15px 15px 15px 5px;
    padding: 8px;
    width: 25%;
`

const THead = styled.th`
    margin: 15px 15px 15px 5px;
    padding: 8px;
    width: 25%;
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

class InputArea extends Component {
    render() {
        const name = ""
        const gericht = ""
        return (
            <Wrapper>
                <Title>
                    Planen
                </Title>
                <Label>
                    Name der Mahlzeit:
                </Label>
                <InputText
                    type="text"
                    vaue={name}
                />
                <Label>
                    Gepantes Gericht:
                </Label>
                <InputText
                    type="text"
                    vaue={gericht}
                />
                <Button>Planen</Button>
            </Wrapper>
        )
    }
}


class MahlzeitRow extends Component {
    render() {
        const plan = this.props.plan
        const rowColor = plan.inKochbuch ? TableRowInKB : TableRowNotKB;
        if (plan.inKochbuch) {
            return (
                <rowColor>
                    <td>plan.name</td>
                    <td>plan.gericht</td>
                    <td><DeleteGericht/></td>
                </rowColor>
            )
        }
    }
}


class PlanDarst extends Component {
    render(){
        const rows = [];
        this.props.plans.forEach((plan) => {
            rows.push(
                <MahlzeitRow
                    plan={plan}
                    key={plan.name}
                    />
            )
        });
        return (
            <Wrapper>
            <table>
                <TableHead>
                    <tr>
                        <THead>Name der Mahlzeit</THead>
                        <THead>Geplantes Gericht</THead>
                        <THead>Bearbeiten</THead>
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
            geplanteMahlzeiten:  []
        }
    }
    
    render() {
        return (
            <Wrapper>
                <InputArea/>
                <PlanDarst plans={this.state.geplanteMahlzeiten}/>
                <ButtonR>Plan speichern</ButtonR>
            </Wrapper>
        )
    }
}


export default Planer