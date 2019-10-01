import React, { PureComponent, Fragment } from "react";
import { connect } from "react-redux";
import { PeoplePicker } from "../../modules/peoplePicker";
import { Select } from "../../modules/select";
import Textarea from "../textarea";
import TenInput from "../tenInput";
import { addThankYou, addThankYouIdle } from "../../actions";
import { maxBonusToSend } from "../../constants/config";

import "./form.css";

class Form extends PureComponent {
  state = {
    disabled: true,
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
  componentDidUpdate() {
    const { addThankYouStatus, addThankYouIdle } = this.props;
    if (addThankYouStatus === "SUCCESS") {
      const form = {
        AppTo: null,
        AppText: "",
        AppScores: 1,
        AppFrom: null,
        AppNomination: null,
        Title: ""
      };
      this.setState({ form, disabled: true });
      addThankYouIdle();
    }
  }
  handleChange = (name, value) => {
    let { form } = this.state;
    const { users } = this.props;
    let { disabled } = this.state;
    if (
      users.from &&
      users.to &&
      form.AppText.length > 30 &&
      form.AppScores > 0 &&
      form.AppNomination
    ) {
      disabled = false;
    } else {
      disabled = true;
    }
    form = { ...form, [name]: value };
    this.setState({ form, disabled });
  };
  handleSubmit = e => {
    e.preventDefault();
    let { form } = this.state;
    const { addThankYou, users } = this.props;
    if (users.from && users.to)
      form = { ...form, Title: users.from.title + " to " + users.to.title };
    form.AppNomination = form.AppNomination.value;
    addThankYou(form);
  };
  render() {
    const { form, disabled } = this.state;
    const { AppScores } = form;
    return (
      <Fragment> 
        <Select
          name="AppNomination"
          listTitle="AppNominations"
          onChange={this.handleChange}
          value={form.AppNomination}
        />
        <PeoplePicker value={form.AppTo} />
        <Textarea
          name="AppText"
          onChange={this.handleChange}
          value={form.AppText}
        />
        <div className="flex-spb-c">
          <TenInput
            name="AppScores"
            onChange={this.handleChange}
            value={form.AppScores}
          />
          <button
            id="thanks-submit"
            disabled={disabled}
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
    count: state.modules.thanks.count,
    addThankYouStatus: state.status.addThankYouStatus
  }),
  { addThankYou, addThankYouIdle }
)(Form);
