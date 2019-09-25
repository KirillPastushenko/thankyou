import React, { PureComponent } from "react";
import "./textarea.css";

class Textarea extends PureComponent {
  state = {
    value: ""
  };
  handleChange = e => {
    const { onChange, name } = this.props;
    onChange(name, e.target.value);
    this.setState({ value: e.target.value });
  };
  render() {
    const { value } = this.state;
    return <textarea value={value} onChange={this.handleChange}></textarea>;
  }
}

export default Textarea;
