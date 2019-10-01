import React, { Component, Fragment } from "react";
import { Autocomplete } from "../components";
import "./PeoplePicker.css";

class PeoplePicker extends Component {
  render() {
    return (
      <Fragment>
        <Autocomplete {...this.props} />
      </Fragment>
    );
  }
}

export default PeoplePicker;
