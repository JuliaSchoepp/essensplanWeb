import React, { Component } from 'react'
import ReactTable from 'react-table-6'
import api from '../api'

import styled from 'styled-components'

import 'react-table-6/react-table.css'

const Wrapper = styled.div`
padding: 0 40px 40px 40px;
`

const Update = styled.div`
    color: #ef9b0f;
    cursor: pointer;
`

const Delete = styled.div`
    color: #ff0000;
    cursor: pointer;
`

class UpdateGericht extends Component {
    updateGericht = event => {
        event.preventDefault()

        window.location.href = `/gerichte/update/${this.props.id}`
    }

    render() {
        return <Update onClick={this.updateUser}>Ändern</Update>
    }
}

class DeleteGericht extends Component {
    deleteGericht = event => {
        event.preventDefault()

        if (
            window.confirm(
                `Willst du das Gericht ${this.props.id} endgütig löschen?`,
            )
        ) {
            api.deleteGerichtById(this.props.id)
            window.location.reload()
        }
    }

    render() {
        return <Delete onClick={this.deleteUser}>Löschen</Delete>
    }
}



class GerichteList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            gerichte: [],
            columns: [],
            isLoading: false,
        }
    }

    componentDidMount = async () => {
        this.setState({ isLoading: true })

        await api.getAllGerichte().then(gerichte => {
            this.setState({
                gerichte: gerichte.data.data,
                isLoading: false,
            })
        })
    }

    render() {
        const { gerichte, isLoading } = this.state
        console.log('TCL: Gerichte -> render -> gerichte', gerichte)

        const columns = [
            {
                Header: 'ID',
                accessor: '_id',
                filterable: true,
            },
            {
                Header: 'Name',
                accessor: 'name',
                filterable: true,
            },
            {
                Header: 'Saison',
                accessor: 'saison',
                filterable: true,
            },
            {
                Header: 'Komplexität',
                accessor: 'komplex',
                filterable: true,
            },
            {
                Header: 'Typ',
                accessor: 'typ',
                filterable: true,
            },
            {
                Header: 'Zutaten',
                accessor: 'zutaten',
                Cell: props => <span>{props.value.join(' / ')}</span>,
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
            {
                Header: '',
                accessor: '',
                Cell: function(props) {
                    return (
                        <span>
                            <UpdateGericht id={props.original._id} />
                        </span>
                    )
                },
            },
        ]

        let showTable = true
        if (!gerichte.length) {
            showTable = false
        }

        return (
            <Wrapper>
                {showTable && (
                    <ReactTable
                        data={gerichte}
                        columns={columns}
                        loading={isLoading}
                        defaultPageSize={10}
                        showPageSizeOptions={true}
                        minRows={0}
                    />
                )}
            </Wrapper>
        )
    }
}

export default GerichteList