import React, { PureComponent, Fragment } from "react";
import "./personcardawards.css";
class PersonCardAwards extends PureComponent {
  state = {};
  render() {
    return(
      <Fragment>
		<h5>НАГРАДЫ:</h5>
		<div className="rewards flex-spb-t">
			<div className="flex-col-c-t">
				<div className="reward reward-year-25"></div>
				<span className="desc">25 ЛЕТ В КОМПАНИИ</span>
			</div>
			<div className="flex-col-c-t">
				<div className="reward reward-get-30"></div>
				<span className="desc">ЛИДЕР <br/>МЕСЯЦА</span>
			</div>
			<div className="flex-col-c-t">
				<div className="reward reward-gave-30"></div>
				<span className="desc">БЛАГОДАРНЫЙ <br/>СОТРУДНИК</span>
			</div>
			<div className="flex-col-c-t">
				<div className="reward reward-lider-10"></div>
				<span className="desc">ЛИДЕР <br/>В НОМИНАЦИИ</span>
			</div>
		</div>
      </Fragment>
    ); 
  }
}

export default PersonCardAwards;
