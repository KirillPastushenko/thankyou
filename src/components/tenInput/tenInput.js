import React, { PureComponent, Fragment } from "react";
import "./tenInput.css";
import { maxBonusToSend } from "../../constants/config";

class TenInput extends PureComponent {
  state = {
    value: 1
  };
  handleChange = e => {
    const { onChange, name } = this.props;
    onChange(name, e.target.value);
    this.setState({ value: e.target.value });
  };
  handleMinus = () => {
    let { value } = this.state;
    value = parseInt(value);
    if (!value) value = 1;
    value -= 1;
    if (value < 1) value = 1;
    const { onChange, name } = this.props;
    onChange(name, value);
    this.setState({ value });
  };
  handlePlus = () => {
    let { value } = this.state;
    value = parseInt(value);
    if (!value) value = 1;
    value += 1;
    if (value > maxBonusToSend) value = maxBonusToSend;
    const { onChange, name } = this.props;
    onChange(name, value);
    this.setState({ value });
  };
  render() {
    const { value } = this.state;
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

export default TenInput;
