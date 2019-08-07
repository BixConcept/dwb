import React, { Component } from 'react';
import { connect } from "react-redux";



class Alert extends Component {
    /* static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.errors !== prevState.errors)
    } */

    render() {
        return (
          <div></div>  
        );
    }
}

const mapStateToProps = state => ({
    errors: state.errors.errors
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, )(Alert);