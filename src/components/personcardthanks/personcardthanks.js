import React, { PureComponent, Fragment } from "react";
	class PersonCardThanks extends PureComponent {
	state = {};
	render() {
		return(
			<Fragment>
				<h5>БЛАГОДАРНОСТИ:</h5>
				<div className="flex-spb-t">
					<div className="flex-col-c-t">
						<div className="thanks-available num-red">10</div>
						<span className="desc">ДОСТУПНО</span>
					</div>
					<div className="flex-col-c-t">
						<div className="thanks-today num-green">100</div>
						<span className="desc">ПОЛУЧЕНО <br/>СЕГОДНЯ</span>
					</div>
					<div className="flex-col-c-t">
						<div className="thanks-month num-green">1 000</div>
						<span className="desc">ПОЛУЧЕНО <br/>В ЭТОМ МЕСЯЦЕ</span>
					</div>
					<div className="flex-col-c-t">
						<div className="thanks-alltime num-green">1 000 000</div>
						<span className="desc">ПОЛУЧЕНО <br/>ЗА ВСЕ ВРЕМЯ</span>
					</div>
				</div>
			</Fragment>
		); 
	}
}

export default PersonCardThanks;
