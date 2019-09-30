import React, { PureComponent } from "react";
import { connect } from "react-redux";
import "./select.css";
import ReactSelect from "react-select";
import { getSelectData } from "../actions";
import { selectOptions } from "../selectors";

class Select extends PureComponent {
  componentDidMount() {
    const { getSelectData, listTitle } = this.props;
    getSelectData(listTitle);
  }
  handleChange = option => {
    const { onChange, name } = this.props;
    onChange(name, option);
  };
  render() {
    const { options, listTitle, value } = this.props;
    let selectOptions = [];
    if (options && options[listTitle]) {
      selectOptions = options[listTitle];
    }
    return (
      <ReactSelect
        value={value}
        onChange={this.handleChange}
        options={selectOptions}
        placeholder="Выберите номинацию"
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
