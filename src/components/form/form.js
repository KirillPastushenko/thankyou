import React, { PureComponent, Fragment } from "react";
import { connect } from "react-redux";
import { PeoplePicker } from "../../modules/peoplePicker";
import { Select } from "../../modules/select";
import Textarea from "../textarea";
import TenInput from "../tenInput";
import { addThankYou } from "../../actions";
import { maxBonusToSend } from "../../constants/config";

import "./form.css";

class Form extends PureComponent {
  state = {
    form: {
      AppTo: null,
      AppText: "",
      AppScores: 1,
      AppFrom: null,
      AppNomination: null,
      Title: ""
    }
  };
  static getDerivedStateFromProps(props, state) {
    const { users, count } = props;
    let { form } = state;
    if (users.from) form = { ...form, AppFrom: users.from.id };
    if (users.to) form = { ...form, AppTo: users.to.id };
    if (maxBonusToSend == count) form = { ...form, AppScores: 0 };
    return { form };
  }
  handleChange = (name, value) => {
    let { form } = this.state;
    form = { ...form, [name]: value };
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
    const { form } = this.state;
    const { AppScores } = form;
    return (
      <Fragment>
        <Select
          name="AppNomination"
          listTitle="AppNominations"
          onChange={this.handleChange}
        />
        <PeoplePicker />
        <Textarea name="AppText" onChange={this.handleChange} />
        <div className="flex-spb-c">
          <TenInput name="AppScores" onChange={this.handleChange} />
          <button
            id="thanks-submit"
            disabled={!AppScores && "true"}
            onClick={this.handleSubmit}
          >
            Отправить
          </button>
        </div>
      </Fragment>
    );
  }
}

export default connect(
  state => ({
    users: state.modules.users.list,
    count: state.modules.thanks.count
  }),
  { addThankYou }
)(Form);
