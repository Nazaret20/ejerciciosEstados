import useCount from "../../hooks/useCount";
import Card from "../../components/Card";
import "../../styles/customHook.css";

const Counter = () => {
	const [count, add, subtract, reset] = useCount(0);

	return (
		<Card title={"Counter"}>
			<section className="section-counter">
				<p className="p-counter">Puedes sumar, restar y resetear</p>
				<p className="p-counter-resultado">Resultado: {count}</p>

				<div className="div-counter">
					<button onClick={add} className="boton-counter-suma">Sumar</button>
					<button onClick={subtract} className="boton-counter-resta">Restar</button>
					<button onClick={reset} className="boton-counter-reset">Resetear</button>
				</div>
			</section>
		</Card>
	);
};

export default Counter;
