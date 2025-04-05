import React from "react";
import "../styles/card.css";

const Card = ({ title, children }) => {
	return (
		<div className="card">
			<h2 className="h2-card">{title}</h2>
			<div>{children}</div>
		</div>
	);
};

export default Card;
