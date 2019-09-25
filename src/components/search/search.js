import React, { PureComponent, Fragment } from "react";
import { connect } from "react-redux";
import { Input } from "antd";
import { getPhoneBook } from "../../actions";

const { Search } = Input;

class PhoneSearch extends PureComponent {
  state = {};
  handleSearch = value => {
    let { getPhoneBook, search } = this.props;
    search = { ...search, search: value };
    let request = "";
    const length = Object.keys(search).length;
    Object.keys(search).map((key, index) => {
      request +=
        "(" +
        (key !== "search" ? key + ":" : "") +
        search[key] +
        "*)" +
        (index !== length - 1 ? " AND " : "");
    });
    getPhoneBook({ request, search });
  };
  handleChange = e => {
    let { getPhoneBook, search } = this.props;
    if (e.target.value === "") {
      delete search.search;
      let request = "";
      const length = Object.keys(search).length;
      if (length > 0) {
        Object.keys(search).map((key, index) => {
          request +=
            "(" +
            (key !== "search" ? key + ":" : "") +
            search[key] +
            "*)" +
            (index !== length - 1 ? " AND " : "");
        });
      }
      getPhoneBook({ request, search });
    } else if (e.target.value.length > 3) {
      search = { ...search, search: e.target.value };
      let request = "";
      const length = Object.keys(search).length;
      Object.keys(search).map((key, index) => {
        request +=
          "(" +
          (key !== "search" ? key + ":" : "") +
          search[key] +
          "*)" +
          (index !== length - 1 ? " AND " : "");
      });
      getPhoneBook({ request, search });
    }
  };  
  render() {
    return (
      <Fragment>
        <Search
          placeholder="input search text"
          className={"search-field"}
          onSearch={this.handleSearch}
          onChange={this.handleChange}
          allowClear
          style={{ width: "100%" }}
        />
      </Fragment>
    );
  }
}

export default connect(
  state => ({
    search: state.search
  }),
  { getPhoneBook }
)(PhoneSearch);
