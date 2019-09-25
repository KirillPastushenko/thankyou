import React, { PureComponent, Fragment } from "react";
import { connect } from "react-redux";
import { PeoplePicker } from "../../modules/peoplePicker";
import { Select } from "../../modules/select";
import Textarea from "../textarea";
import TenInput from "../tenInput";
import PhoneSearch from "../search";
import { addThankYou } from "../../actions";

import "./form.css";

class Form extends PureComponent {
  state = {
    form: {
      AppTo: null,
      AppText: "",
      AppScores: 0,
      AppFrom: null,
      AppNomination: null,
      Title: ""
    }
  };
  static getDerivedStateFromProps(props, state) {
    const { users } = props;
    let { form } = state;
    if (users.from) form = { ...form, AppFrom: users.from.id };
    if (users.to) form = { ...form, AppTo: users.to.id };
    return { form };
  }
  handleChange = (name, value) => {
    let { form } = this.state;
    form = { ...form, [name]: value };
    console.log(form);
    this.setState({ form });
  };
  handleSubmit = e => {
    e.preventDefault();
    let { form } = this.state;
    //тут нужна валидация form
    const { addThankYou, users } = this.props;
    if (users.from && users.to)
      form = { ...form, Title: users.from.title + " to " + users.to.title };
    addThankYou(form);
  };
  render() {
    return (
      <Fragment>
          <PhoneSearch {...this.props}></PhoneSearch>
          <PeoplePicker />
          <Select
            name="AppNomination"
            listTitle="AppNominations" 
            onChange={this.handleChange}
          />
          <Textarea name="AppText" onChange={this.handleChange} />
          <div className="flex-spb-c">
            <TenInput name="AppScores" onChange={this.handleChange} />
            <button id="thanks-submit" onClick={this.handleSubmit}>Отправить</button>
          </div>
      </Fragment>
    );
  }
}

export default connect(
  state => ({
    users: state.modules.users.list
  }),
  { addThankYou }
)(Form);
