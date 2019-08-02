import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

export class Team extends Component {
    static propTypes = {
        prop: PropTypes
    }

    render() {
        return (
            <div>
                <h3 className="container-headline">team</h3>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    team: state.team.team
})

const mapDispatchToProps = {
    getTeam   
}

export default connect(mapStateToProps, mapDispatchToProps)(Team)
