import React, { PureComponent, Fragment } from "react";
import { connect } from "react-redux";
import { Pagination, Icon } from "antd";
import { getPhoneBook } from "../../actions";
import { tableRowLimit } from "../../constants/config";
import "./paginator.css";

class Paginator extends PureComponent {
  state = {};
  prev = () => {
    const { getPhoneBook, prevPage, searchKey } = this.props;
    getPhoneBook({ request: searchKey, position: prevPage, prev: true });
  };
  next = () => {
    const { getPhoneBook, nextPage, searchKey } = this.props;
    getPhoneBook({ request: searchKey, position: nextPage, next: true });
  };
  paginationRender = (current, type, originalElement) => {
    const currentPage = this.props.current;
    if (type === "prev") {
      return (
        <a className="ant-pagination-item-link" onClick={this.prev}>
          <Icon type="left" />
        </a>
      );
    }
    if (type === "next") {
      return (
        <a className="ant-pagination-item-link" onClick={this.next}>
          <Icon type="right" />
        </a>
      );
    }
    if (type === "page" && currentPage === current) {
      return originalElement;
    }
  };
  render() {
    const { itemsTotal, current } = this.props;
    const pagination = {
      total: itemsTotal,
      current,
      pageSize: tableRowLimit,
      itemRender: this.paginationRender
    };
    return <Pagination {...pagination} />;
  }
}

export default connect(
  state => ({
    itemsTotal: state.phonebook.itemsCount,
    nextPage: state.phonebook.nextPage,
    prevPage: state.phonebook.prevPage,
    searchKey: state.phonebook.searchKey,
    current: state.phonebook.current
  }),
  { getPhoneBook }
)(Paginator);
