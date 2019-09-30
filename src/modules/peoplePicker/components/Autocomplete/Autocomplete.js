import React, { Component } from "react";
import { connect } from "react-redux";
import Autosuggest from "react-autosuggest";
import { searchPeople, searchPeopleIdle } from "../../actions";
import { selectPeople } from "../../selectors";
import { getUserListId } from "../../../getUserListId/actions";

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
      value: "",
      suggestion: []
    };
  }
  getSuggestionValue = suggestion => {
    const { getUserListId } = this.props;
    getUserListId(suggestion.value);
    return suggestion.name;
  };

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

  render() {
    const { value, suggestion } = this.state;
    const inputProps = {
      placeholder: "Введите имя или фамилию",
      value,
      onChange: this.onChange
    };
    return (
      <Autosuggest
        suggestions={suggestion}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={this.getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
      />
    );
  }
}
export default connect(
  state => ({
    people: selectPeople(state),
    keyword: state.modules.peoplePicker.keyword,
    status: state.modules.peoplePicker.status
  }),
  { searchPeople, searchPeopleIdle, getUserListId }
)(Autocomplete);
