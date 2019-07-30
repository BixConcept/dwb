import React, { Component } from "react";
import { connect } from "react-redux";
import { createAssignment } from '../../actions/assignments'
import PropTypes from "prop-types"


export class CreateAssignmentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  static propTypes = {
    createAssignment: PropTypes.func.isRequired
  }

  handleChange(e) {
    this.setState({
      [e.target.id]: e.target.value
    })

    console.log(this.state)
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.createAssignment(this.state);
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type="text" placeholder="subject" id="subject" onChange={this.handleChange} autoComplete="off" required />
          <input type="number" placeholder="author" id="author" onChange={this.handleChange} autoComplete="off" required />
          <input type="text" placeholder="text" id="text" onChange={this.handleChange} autoComplete="off" required />
          <input type="text" placeholder="description" id="description" onChange={this.handleChange} autoComplete="off" />
          <input type="date" placeholder="due date" id="due_date" onChange={this.handleChange} autoComplete="off" />
          <input type="submit" />
        </form>
      </div>
    );
  }
}


export default connect(null, { createAssignment })(CreateAssignmentForm);
