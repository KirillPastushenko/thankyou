import React, { PureComponent, Fragment } from "react";
import { connect } from "react-redux";
import { addThankYou } from "../../actions";

import { ThankYouList } from "../../modules/thankYouList";
import  Regions  from "../../components/regions";
import  Whom  from "../../components/whom";
import  Who  from "../../components/who";
import "./default.css";
 

class Default extends PureComponent {
  state = {};
  componentDidMount() {}

  render() {
    return (
      <div className="container">
        <Fragment>
          <section>
		        <div className="container">
              <Regions/>
              <div className="flex-spb-t">
                <ThankYouList />
                <div className="sidebar col-4">
                  <Whom/>
                  <Who/>
                </div>
              </div>
            </div>
          </section>
        </Fragment>
      </div>
    );
  }
} 

export default connect(
  state => ({
    user: state.user
  }),
  {}
)(Default);
