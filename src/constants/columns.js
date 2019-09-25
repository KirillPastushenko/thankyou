import React, { Fragment } from "react";
import Moment from "react-moment";

export const columns = [
  {
    title: "ФИО",
    width: 300,
    dataIndex: "Title",
    key: "Title",
    searchKey: "Title",
    fixed: "left"
  },
  {
    title: "Пол",
    width: 50,
    dataIndex: "Sex",
    key: "Sex",
    searchKey: "SexOWSCHCS"
  },
  {
    title: "Название организации",
    dataIndex: "CompanyName",
    key: "CompanyName",
    searchKey: "CompanyNameOWSMTXT",
    width: 200
  },
  {
    title: "Тип организации",
    dataIndex: "CompanyType",
    key: "CompanyType",
    searchKey: "CompanyTypeOWSTEXT",
    width: 200
  },
  {
    title: "Фамилия",
    dataIndex: "LastName",
    key: "LastName",
    searchKey: "LastNameOWSTEXT",
    width: 200
  },
  {
    title: "Имя",
    dataIndex: "FirstName1",
    key: "FirstName1",
    searchKey: "FirstName1OWSTEXT",
    width: 200
  },
  {
    title: "Должность/отдел",
    dataIndex: "JobTitle1",
    key: "JobTitle1",
    searchKey: "JobTitle1OWSMTXT",
    width: 200
  },
  {
    title: "Адрес",
    dataIndex: "FullAddress",
    key: "FullAddress",
    searchKey: "FullAddressOWSMTXT",
    width: 400
  },
  {
    title: "Телефон (основной)",
    dataIndex: "PhoneMain",
    key: "PhoneMain",
    searchKey: "PhoneMainOWSTEXT",
    width: 200,
    render: phone => {
      if (phone && phone.getURI) {
        return (
          phone && (
            <Fragment>
              <a href={phone.getURI()}>{phone.formatNational()}</a>
            </Fragment>
          )
        );
      } else {
        return phone;
      }
    }
  },
  {
    title: "Телефон (мобильный)",
    dataIndex: "PhoneMobile",
    key: "PhoneMobile",
    searchKey: "PhoneMobileOWSTEXT",
    width: 200,
    render: phone => {
      if (phone && phone.getURI) {
        return (
          phone && (
            <Fragment>
              <a href={phone.getURI()}>{phone.formatNational()}</a>
            </Fragment>
          )
        );
      } else {
        return phone;
      }
    }
  },
  {
    title: "E-mail (основной)",
    dataIndex: "EmailMain",
    key: "EmailMain",
    searchKey: "EmailMainOWSTEXT",
    width: 200,
    render: mail => {
      return mail && <a href={"mailto:" + mail}>{mail}</a>;
    }
  },
  {
    title: "Сайт организации",
    key: "CompanySite",
    dataIndex: "CompanySite",
    searchKey: "CompanySiteOWSTEXT",
    width: 300
  },
  {
    title: "ДР",
    key: "BirthDayDate",
    dataIndex: "BirthDayDate",
    searchKey: "BirthDayDateOWSDATE",
    width: 200,
    render: date => {
      return date && <Moment format="DD MMMM">{date}</Moment>;
    }
  },
  {
    title: "Подарок",
    key: "Gift",
    dataIndex: "Gift",
    searchKey: "GiftOWSCHCS",
    width: 100
  }
];
