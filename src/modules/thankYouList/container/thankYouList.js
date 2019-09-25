import React, { PureComponent, Fragment } from "react";
import { connect } from "react-redux";
import "./thankYouList.css";
import PersonCard from  "../../../components/personcard"
import { getThankYou } from "../actions";
import { selectThankYou } from "../selectors";

class ThankYouList extends PureComponent {
  componentDidMount() {
    const { getThankYou } = this.props;
    getThankYou();
  }
  render() {
    const { thankYou } = this.props;
    console.log(thankYou);
    return (
      <Fragment>
        <div id="thx-news" className="col-8">
					<div className="head-red angle-left">
						<h4>ДОСКА БЛАГОДАРНОСТЕЙ</h4>
					</div> 
					<div className="thanks here">
            {thankYou && thankYou.map(item => <div key={item.key}>{item.To}</div> )}
          </div>
					<div id="thx-news-more" className="btn-more all">ЕЩЁ...</div>
				</div> 
      </Fragment> 
    );
  }
}

export default connect(
  state => ({
    thankYou: selectThankYou(state)
  }),
  { getThankYou }
)(ThankYouList);
