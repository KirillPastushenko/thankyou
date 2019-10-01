import React, { PureComponent, Fragment } from "react";
import { connect } from "react-redux";
import { addThankYou } from "../../actions";
import { ThankYouList } from "../../modules/thankYouList";
import { Who } from "../../modules/who";
import { Whom } from "../../modules/whom";
import Clouds from "../../components/clouds"
import Regions from "../../components/regions";
import "./default.css";
 

class Default extends PureComponent {
  state = {};
  componentDidMount() {}

  render() {
    return (
     
        <Fragment>
          <section>
		        <div className="container" style={{position:"relative",zIndex:1}}>
              {/* <Regions/> */}
              <div className="flex-spb-t">
                <ThankYouList />
                <div className="sidebar col-4">
                  <Whom/>
                  <Who/>
                </div>
              </div>
            </div>
            <Clouds/>
          </section>
        </Fragment>
    
    );
  }
} 

export default connect(
  state => ({
    user: state.user
  }),{}
)(Default);
