import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import Autosuggest from "react-autosuggest";
import { searchPeople, searchPeopleIdle } from "../../actions";
import { selectPeople } from "../../selectors";
import { getUserListId } from "../../../getUserListId/actions";
import { PersonalCard } from "../../../personalCard";
import { addUsersToRequest } from "../../../userInfo/actions";

// Use your imagination to render suggestions.
const renderSuggestion = suggestion => <div>{suggestion.name}</div>;

const getSuggestions = (value, people) => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0
    ? []
    : people.filter(item => {
        return item.name.toLowerCase().indexOf(inputValue) > -1;
      });
};

class Autocomplete extends Component {
  constructor() {
    super();

    this.state = {
      selectedUserId: null,
      popup: false,
      show: false,
      value: "",
      suggestion: []
    };
  }
  getSuggestionValue = suggestion => {
    const { getUserListId } = this.props;
    getUserListId(suggestion.value);
    this.setState({ show: true });
    return suggestion.name;
  };

  componentDidUpdate() {
    const { addUsersToRequest, user } = this.props;
    const { selectedUserId } = this.state;
    if (user && user.userId && selectedUserId !== user.userId) {
      this.setState({ selectedUserId: user.userId });

      let usersRequests = [];
      usersRequests = [...usersRequests, user.userId];
      if (usersRequests.length > 0) {
        addUsersToRequest(usersRequests);
      }
    }
  }

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
  };

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  onSuggestionsFetchRequested = ({ value }) => {
    const { searchPeople, people } = this.props;
    if (value.length > 3 && (people.length === 0 || people.length === 500)) {
      searchPeople(value);
    } else {
      this.setState({
        suggestion: getSuggestions(value, people)
      });
    }
  };

  onSuggestionsClearRequested = () => {
    const { searchPeopleIdle } = this.props;
    searchPeopleIdle();
  };
  handleMouseEnter = () => {
    this.setState({ popup: true });
  };
  handleMouseLeave = () => {
    this.setState({ popup: false });
  };
  render() {
    const { value, suggestion, show, popup } = this.state;
    const { user } = this.props;
    const inputProps = {
      placeholder: "Введите имя или фамилию",
      value,
      onChange: this.onChange
    };
    return (
      <Fragment>
        <div className="peoplePicker">
          <Autosuggest
            suggestions={suggestion}
            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
            getSuggestionValue={this.getSuggestionValue}
            renderSuggestion={renderSuggestion}
            inputProps={inputProps}
          />
          {show && user && user.userId && (
            <span
              onMouseEnter={this.handleMouseEnter}
              onMouseLeave={this.handleMouseLeave}
              className="info"
            >
              i
              {popup && (
                <div className="badge person-container">
                  <PersonalCard userId={user.userId} popup={true} />
                </div>
              )}
            </span>
          )}
        </div>
      </Fragment>
    );
  }
}
export default connect(
  state => ({
    people: selectPeople(state),
    keyword: state.modules.peoplePicker.keyword,
    status: state.modules.peoplePicker.status,
    user: state.modules.users.list.to
  }),
  { searchPeople, searchPeopleIdle, getUserListId, addUsersToRequest }
)(Autocomplete);
