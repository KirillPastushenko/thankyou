import React, { PureComponent } from "react";
import "./textarea.css";

class Textarea extends PureComponent {
  handleChange = e => {
    const { onChange, name } = this.props;
    onChange(name, e.target.value);
  };
  render() {
    const { value } = this.props;
    return <textarea value={value} onChange={this.handleChange}></textarea>;
  }
}

export default Textarea;
