import React, { PureComponent, Fragment } from "react";
import { connect } from "react-redux";
import "./tenInput.css";
import { maxBonusToSend } from "../../constants/config";

class TenInput extends PureComponent {
  handleChange = e => {
    const { onChange, name } = this.props; 
    onChange(name, e.target.value);
  };
  handleMinus = () => {
    let { value } = this.props;
    const { count } = this.props;
    value = parseInt(value);
    if (!value) value = 1;
    value -= 1;
    if (value < 1) value = 1;
    if (count === maxBonusToSend) value = 0;
    const { onChange, name } = this.props;
    onChange(name, value);
  };
  handlePlus = () => {
    let { count, value } = this.props;
    value = parseInt(value);
    if (!value) value = 1;
    value += 1;
    if (value > maxBonusToSend - count) value = maxBonusToSend - count;
    const { onChange, name } = this.props;
    onChange(name, value);
  };
  render() {
    let { count, value } = this.props;
    if (count === maxBonusToSend) value = 0;
    return (
      <Fragment>
        <div className="tenInput">
          <button className="minus btn-counter" onClick={this.handleMinus}>
            -
          </button>
          <input value={value} onChange={this.handleChange}></input>
          <button className="plus btn-counter" onClick={this.handlePlus}>
            +
          </button>
        </div>
      </Fragment>
    );
  }
}

export default connect(
  state => ({
    count: state.modules.thanks.count
  }),
  {}
)(TenInput);
