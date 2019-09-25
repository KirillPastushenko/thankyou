import React, { PureComponent, Fragment } from "react";
	class BadgeSidebar extends PureComponent {
	state = {};
	render() {
		return(
			<Fragment>
				<div className="badge flex-l-c">
					<div className="person-photo" style={{backgroundImage:''}}></div>
					<div className="preson-info">
						<div className="person-rating">232</div>
						<div className="person-name">Константин константиновский</div>
					</div>
				</div>
			</Fragment>
		); 
	}
}

export default BadgeSidebar;
