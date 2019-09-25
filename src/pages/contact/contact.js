import React, { PureComponent, Fragment } from "react";
import { connect } from "react-redux";
import * as userActions from "../../actions/user";
import * as phoneBookActions from "../../actions/phonebook";
import ContactList from "../../components/contactList";
import { Layout, Breadcrumb } from "antd";
import { urlDefault } from "../../constants/config";
const { Content } = Layout;

const { getUser } = userActions;
const { getPhoneBook } = phoneBookActions;
class Contact extends PureComponent {
  state = {};
  componentDidMount() {
    const { getPhoneBook } = this.props;
    let params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    getPhoneBook({ID:id});
  }
  render() {
    return (
      <Fragment>
        <Content className="breadContent">
          <Breadcrumb>
            <Breadcrumb.Item href={urlDefault + "/default.aspx"}>
              Main
            </Breadcrumb.Item>
            <Breadcrumb.Item>Contact</Breadcrumb.Item>
          </Breadcrumb>
        </Content>
        <Content className="pageContent">
          <ContactList></ContactList>
        </Content>
      </Fragment>
    );
  }
}

export default connect(
  state => ({
    user: state.user
  }),
  { getUser, getPhoneBook }
)(Contact);
