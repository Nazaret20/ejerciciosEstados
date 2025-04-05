import { Link } from "react-router-dom";
import "../styles/home.css";

const Home = () => {
	return (
		<section className="section-home">
			<h1 className="h1-home">Esta es la home de mi proyecto</h1>
			<p className="p-home">Aquí está el primer ejercicio de useReducer</p>
			<Link to="/usereducerpractice" className="a-home">
				Ejercicios con useReducer
			</Link>
		</section>
	);
};

export default Home;
