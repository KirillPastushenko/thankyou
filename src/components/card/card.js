import React, { PureComponent, Fragment } from "react";
import { Col, Card, Icon } from "antd";
const { Meta } = Card;

class PhoneCard extends PureComponent {
  state = {};
  render() {
    const { item, loading, handleView, handleEdit } = this.props;
    return (
      <Col span={8} className="flex">
        <Card
          loading={loading}
          key={item.key}
          style={{ margin: "0 0 20px 0" }}
          actions={[
            <Icon type="eye" onClick={e => handleView(item.key)} />,
            <Icon type="edit" onClick={e => handleEdit(item.key)} key="edit" />
          ]}
        >
          <Meta
            title={item.Title}
            description={
              <Fragment>
                <div className="phoneCard">
                  <p className="JobTitle">{item.JobTitle1}</p>
                  <p className="CompanyName">{item.CompanyName}</p>
                  {item.PhoneMain && (
                    <p className="PhoneMain">
                      <Icon type="phone" />{" "}
                      {item.PhoneMain && item.PhoneMain.getURI && (
                        <a href={item.PhoneMain.getURI()}>
                          {item.PhoneMain.formatNational()}
                        </a>
                      )}
                      {item.PhoneMain &&
                        !item.PhoneMain.getURI &&
                        item.PhoneMain}
                    </p>
                  )}
                  {item.PhoneMobile && (
                    <p className="PhoneMobile">
                      <Icon type="phone" />{" "}
                      {item.PhoneMobile && item.PhoneMobile.getURI && (
                        <a href={item.PhoneMobile.getURI()}>
                          {item.PhoneMobile.formatNational()}
                        </a>
                      )}
                      {item.PhoneMobile &&
                        !item.PhoneMobile.getURI &&
                        item.PhoneMobile}
                    </p>
                  )}
                  {item.EmailMain && (
                    <p className="EmailMain">
                      <Icon type="mail" />{" "}
                      <a href={"mailto:" + item.EmailMain}>{item.EmailMain}</a>
                    </p>
                  )}
                </div>
              </Fragment>
            }
          />
        </Card>
      </Col>
    );
  }
}

export default PhoneCard;
