import React, {Component} from 'react';

import {connect} from 'react-redux'

import {getAssignments} from "../../actions/assignments";

class AssignmentsView extends Component {
    render() {
        return (
            <h1 className="m-heading">assignments view</h1>
        )
    }
}

const mapStateToProps = state => ({
    assignments: state.assignments.assignments
});

export default connect(mapStateToProps, { getAssignments })(AssignmentsView);
