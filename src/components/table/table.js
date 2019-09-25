import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { columns } from "../../constants/columns";
import { selectPhoneBook, selectPhoneBookStatus } from "../../selectors";
import * as phoneBookActions from "../../actions/phonebook";
import { Table, Input, Button, Icon } from "antd";
import Highlighter from "react-highlight-words";
import "./table.css";
const { getPhoneBook } = phoneBookActions;

class PhoneTable extends PureComponent {
  state = {
    searchText: {}
  };
  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            this.handleSearch(selectedKeys, confirm, dataIndex)
          }
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button
          onClick={() => this.handleReset(clearFilters, dataIndex)}
          size="small"
          style={{ width: 90 }}
        >
          Reset
        </Button>
      </div>
    ),
    filterIcon: filtered => (
      <Icon type="search" style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: text => (
      <Highlighter
        highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
        searchWords={[this.props.search[dataIndex]]}
        autoEscape
        textToHighlight={text.toString()}
      />
    )
  });
  handleSearch = (selectedKeys, confirm, dataIndex) => {
    let { getPhoneBook, search } = this.props;
    let searchKey = "";
    columns.map(column => {
      if (column.key === dataIndex) searchKey = column.searchKey;
    });
    search = { ...search, [searchKey]: selectedKeys[0] };
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
    confirm();
  };
  handleReset = (clearFilters, dataIndex) => {
    clearFilters();
    let { getPhoneBook, search } = this.props;
    delete search[dataIndex];
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
    console.log(request, search);
    getPhoneBook({ request, search });
  };
  render() {
    const { phonebook, loading, handleView } = this.props;

    let width = 0;
    const newColumns = columns.map(column => {
      if (column.key === "Title") {
        column = { ...column, ...this.getColumnSearchProps("Title") };
      }
      width += column.width;
      return column;
    });
    return (
      <Table
        columns={newColumns}
        dataSource={phonebook}
        loading={loading}
        scroll={{ x: width }}
        onRow={(record, rowIndex) => {
          return {
            onClick: event => {
              handleView(record.key);
            }
          };
        }}
      />
    );
  }
}

export default connect(
  state => ({
    phonebook: selectPhoneBook(state),
    loading: selectPhoneBookStatus(state),
    search: state.search
  }),
  { getPhoneBook }
)(PhoneTable);
