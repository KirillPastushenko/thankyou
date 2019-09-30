import React, { PureComponent, Fragment } from "react";
import BadgeSidebar from  "../badgesidebar";
	class Whom extends PureComponent {
	state = {};
	render() {
		return(
			<Fragment>
				<div id="thx-whom">
					<div className="head-green angle-right">
						<h4>КОГО БЛАГОДАРЯТ</h4>
						<div className="flex-c-c relative">
							{/* <div id="thx-whom-1-m" data-days="30" data-id="1" className="btn-filter">ЗА 1 МЕСЯЦ</div>
							<div id="thx-whom-3-m" data-days="90" data-id="1" className="btn-filter">ЗА 3 МЕСЯЦА</div> */}
						</div>
					</div>
					<div className="whom reduced">
						<BadgeSidebar/>
					</div>
					{/* <div id="thx-whom-more" className="btn-more">ЕЩЁ...</div> */}
				</div>
			</Fragment>
		); 
	}  
}

export default Whom;
