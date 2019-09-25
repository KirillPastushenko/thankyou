import React, { Component } from "react";
import { connect } from "react-redux";
import { Autocomplete } from "../components";
import { searchPeople, searchPeopleIdle } from "../actions";
import "./PeoplePicker.css";

class PeoplePicker extends Component {
  state = {};

  render() {
    return <Autocomplete {...this.props} />;
  }
}

export default PeoplePicker;
