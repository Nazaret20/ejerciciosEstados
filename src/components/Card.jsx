import React from "react";
import "../styles/card.css";

const Card = ({ title, children }) => {
	return (
		<section className="section-card">
			<h2 className="h2-card">{title}</h2>
			<div>{children}</div>
		</section>
	);
};

export default Card;
