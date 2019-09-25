import React, { PureComponent, Fragment } from "react";
import PersonCardAwards from "../personcardawards";
import PersonCardThanks from "../personcardthanks"
import "./personcard.css";
class PersonCard extends PureComponent {
  state = {};
  render() {
    return(
      <Fragment>
		<div className="person">
			<div className="flex-l-c">
				<div className="person-photo">
					<img src="images/pers1.png" alt=""/>
				</div>
				<div className="preson-info">
					<div className="person-name">Константин Константиновский</div>
					<div className="person-data">
						<span className="person-job">ДОЛЖНОСТЬ</span>/<span className="person-loc">РЕГИОН</span>
					</div>
				</div>
			</div>
			<PersonCardThanks/>
			<PersonCardAwards/>
		</div>
      </Fragment>
    ); 
  } 
}

export default PersonCard;
