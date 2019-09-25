import React, { PureComponent } from "react";
import { connect } from "react-redux";
import "./select.css";
import ReactSelect from "react-select";
import { getSelectData } from "../actions";
import { selectOptions } from "../selectors";

class Select extends PureComponent {
  state = {
    value: null
  };
  componentDidMount() {
    const { getSelectData, listTitle } = this.props;
    getSelectData(listTitle);
  }
  handleChange = option => {
    this.setState({ value: option });
    const { onChange, name } = this.props;
    onChange(name, option.value);
  };
  render() {
    const { value } = this.state;
    const { options, listTitle } = this.props;
    let selectOptions = [];
    if (options && options[listTitle]) {
      selectOptions = options[listTitle];
    }
    return (
      <ReactSelect
        value={value}
        onChange={this.handleChange}
        options={selectOptions}
      />
    );
  }
}

export default connect(
  state => ({
    options: selectOptions(state)
  }),
  { getSelectData }
)(Select);
