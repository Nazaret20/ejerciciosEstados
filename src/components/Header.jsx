import { Link } from "react-router-dom";
import ReactSVG from "./ReactSVG"
import "../styles/header.css";

const Header = () => {
	return (
		<header>
            <ReactSVG className="svg-header"/>
			<nav>
				<ul className="ul-header">
					<li className="li-header">
						<Link to="/" className="a-header">Home</Link>
					</li>
					<li className="li-header">
						<Link to="/usereducerclass" className="a-header">UseReducer</Link>
					</li>
				</ul>
			</nav>
		</header>
	);
};

export default Header;
