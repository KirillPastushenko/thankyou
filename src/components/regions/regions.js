import React, { PureComponent, Fragment } from "react";
import "./regions.css";
	class Regions extends PureComponent {
	state = {};
	render() {
		return(
			<Fragment>
			<div className="regionBlock">
				<div className="regionHeader">Регион:</div> 
				<ul className="regionList">
					<li data-region="All">Все <span>(10578)</span></li>
					<li data-id="801c6ac5-617a-4021-94e9-3d94c0dfbe7b" data-region="CSO" >CSO <span>(4597)</span></li>
					<li data-id="46b456c0-583f-477a-8d2e-bbae8efa1e06" data-region="Moscow" >Москва <span>(523)</span></li>
					<li data-id="699e9748-6155-453c-92d9-fc1e2018ed67" data-region="North-West" className="active">Северо-Запад <span>(367)</span></li>
					<li data-id="46eb1c7d-37c1-4f7b-af5b-07b423c3c9a9" data-region="Center">Центр <span></span></li>
					<li data-id="1021ac87-0a38-4f2f-96bd-43987d130463" data-region="South">Юг <span></span></li>
					<li data-id="8e672c2b-d67a-4b41-acb7-37bea373272d" data-region="Ural">Урал <span></span></li>
					<li data-id="688f7558-5d49-45ce-a8e8-e4fa6fc118a6" data-region="SFE">Сибирь и Дальний Восток <span></span></li>
					<li data-id="f2f52e38-3403-40d3-9140-1f4c55e0408c" data-region="Multon">Мултон <span></span></li>
				</ul>
			</div>
			</Fragment>
		); 
	}
}

export default Regions;
