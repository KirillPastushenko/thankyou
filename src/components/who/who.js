import React, { PureComponent, Fragment } from "react";
import BadgeSidebar from  "../badgesidebar";
	class PersonCardThanks extends PureComponent {
	state = {};
	render() {
		return(
			<Fragment>
					<div id="thx-who">
						<div className="head-yellow angle-right">
							<h4>КТО БЛАГОДАРИТ</h4>
							<div className="flex-c-c relative">
								<div id="thx-who-1-m" data-days="30" data-id="2" className="btn-filter">ЗА 1 МЕСЯЦ</div>
								<div id="thx-who-3-m" data-days="90" data-id="2" className="btn-filter">ЗА 3 МЕСЯЦА</div>
							</div>
						</div>
						<div className="who reduced">
							<BadgeSidebar/>
						</div>
						<div id="thx-who-more" className="btn-more">ЕЩЁ...</div>
					</div>
			</Fragment>
		); 
	}
}

export default PersonCardThanks;
