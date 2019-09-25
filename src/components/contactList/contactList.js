import React, { PureComponent, Fragment } from "react";
import { connect } from "react-redux";
import { selectPhoneBook, selectPhoneBookStatus } from "../../selectors";
import { Descriptions, Icon } from "antd";
import Moment from "react-moment";
import { columns } from "../../constants/columns";
import "./contactList.css";
import wa from "../../images/wa.svg";
// const wa = "https://image.flaticon.com/icons/svg/33/33447.svg";
class ContactList extends PureComponent {
  state = {};
  render() {
    const { phonebook } = this.props;
    return (
      <Fragment>
        {phonebook &&
          phonebook.map(item => (
            <Descriptions title={item.Title} key={item.key} bordered>
              {columns &&
                columns.map(
                  column =>
                    item[column.key] && (
                      <Descriptions.Item
                        span={3}
                        key={column.key}
                        label={column.title}
                      >
                        {column.key === "EmailMain" && (
                          <Fragment>
                            {item[column.key] && (
                              <Fragment>
                                <Icon type="mail" className="mailIcon" />
                                <a
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  href={
                                    "https://outlook.office.com/owa/?path=/mail/action/compose&to=" +
                                    item[column.key]
                                  }
                                >
                                  {item[column.key]}
                                </a>
                              </Fragment>
                            )}
                          </Fragment>
                        )}
                        {column.key.indexOf("Phone") > -1 && (
                          <Fragment>
                            <Icon type="phone" className="phoneIcon" />
                            {item[column.key] && item[column.key].getURI && (
                              <a href={item[column.key].getURI()}>
                                {item[column.key].formatNational()}
                              </a>
                            )}
                            {item[column.key] &&
                              !item[column.key].getURI &&
                              item[column.key]}
                          </Fragment>
                        )}
                        {column.key.indexOf("PhoneMobile") > -1 && (
                          <Fragment>
                            <img src={wa} className="waIcon" />
                            {item[column.key] && item[column.key].getURI && (
                              <a
                                target="_blank"
                                rel="noopener noreferrer"
                                href={
                                  "https://wa.me/" +
                                  item[column.key].countryCallingCode +
                                  item[column.key].nationalNumber
                                }
                              >
                                {item[column.key].formatNational()}
                              </a>
                            )}
                            {item[column.key] &&
                              !item[column.key].getURI &&
                              item[column.key]}
                          </Fragment>
                        )}
                        {column.key === "BirthDayDate" && (
                          <Fragment>
                            {item[column.key] && (
                              <Moment format="DD MMMM">
                                {item[column.key]}
                              </Moment>
                            )}
                          </Fragment>
                        )}
                        {column.key !== "PhoneBirthDayDateMain" &&
                          column.key !== "EmailMain" &&
                          column.key.indexOf("Phone") === -1 &&
                          column.key !== "BirthDayDate" &&
                          item[column.key]}
                      </Descriptions.Item>
                    )
                )}
              <Descriptions.Item
                span={3}
                key="share"
                label="Поделиться контактом"
              >
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={
                    "https://outlook.office.com/owa/?path=/mail/action/compose&subject=Контакт&body=" +
                    item.Title +
                    "+" +
                    (item.PhoneMobile
                      ? item.PhoneMobile.formatNational()
                      : "") +
                    "+" +
                    (item.EmailMain ? item.EmailMain : "")
                  }
                >
                  <Icon type="mail" className="mailIcon" />
                </a>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={
                    "https://wa.me/?text=" +
                    item.Title +
                    " " +
                    (item.PhoneMobile
                      ? item.PhoneMobile.formatNational()
                      : "") +
                    " " +
                    (item.EmailMain ? item.EmailMain : "")
                  }
                >
                  <img src={wa} className="waIcon" />
                </a>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={
                    "https://outlook.office.com/owa/?path=calendar/view/month&rru=addevent&body=" +
                    (item.EmailMain ? item.EmailMain : "")
                  }
                >
                  <Icon type="calendar" className="calendarIcon" />
                </a>
              </Descriptions.Item>
            </Descriptions>
          ))}
      </Fragment>
    );
  }
}

export default connect(
  state => ({
    phonebook: selectPhoneBook(state),
    loading: selectPhoneBookStatus(state)
  }),
  {}
)(ContactList);
