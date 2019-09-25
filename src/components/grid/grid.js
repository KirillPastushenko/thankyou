import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { Row } from "antd";
import { selectPhoneBook, selectPhoneBookStatus } from "../../selectors";
import PhoneCard from "../card";
import "./grid.css";

class PhoneGrid extends PureComponent {
  state = {};

  render() {
    const { phonebook, loading, handleView, handleEdit } = this.props;
    return (
      <Row type="flex" justify="start">
        {phonebook.map(item => (
          <PhoneCard
            handleView={handleView}
            handleEdit={handleEdit}
            loading={loading}
            key={item.key}
            item={item}
          ></PhoneCard>
        ))}
      </Row>
    );
  }
}

export default connect(
  state => ({
    phonebook: selectPhoneBook(state),
    loading: selectPhoneBookStatus(state)
  }),
  {}
)(PhoneGrid);
