import { useState, useReducer } from "react";
import Card from "../../components/Card";
import "./todolist.css";

const ToDoList = () => {
	const tareas = [
		{ id: 1, texto: "Aprender useReducer", completado: false },
		{ id: 2, texto: "Hacer proyectitos", completado: true },
		{ id: 3, texto: "Mascar estados para entender", completado: false },
		{ id: 4, texto: "Entendido mini Redux", completado: false },
	];

	const reducer = (state, action) => {
		switch (action.type) {
			case "añadirTarea":
				return [...state, action.payload]; // Agrega nueva tarea
			case "eliminarTarea":
				return state.filter((tarea) => tarea.id !== action.payload); // Filtra por ID
			case "completarTarea":
				return state.map((tarea) => (tarea.id === action.payload ? { ...tarea, completado: !tarea.completado } : tarea)); // Alterna estado de completado
			default:
				return state;
		}
	};

	const [state, dispatch] = useReducer(reducer, tareas);
	const [text, setText] = useState("");
	const [mensaje, setMensaje] = useState("");

	// Función para mostrar el mensaje de error temporal
	const mostrarMensaje = (mensaje) => {
		setMensaje(mensaje);
		setTimeout(() => setMensaje(""), 3000); // El mensaje desaparecerá después de 3 segundos
	};

	const handleAddTask = () => {
		const tareaTrim = text.trim();

		if (tareaTrim === "") {
			mostrarMensaje("No puedes añadir una tarea vacía.");
			return;
		}
		if (state.some((tarea) => tarea.texto.toLowerCase() === tareaTrim.toLowerCase())) {
			mostrarMensaje("Esa tarea ya existe.");
			return;
		}

		dispatch({
			type: "añadirTarea",
			payload: { id: state.length + 1, texto: tareaTrim, completado: false },
		});
		setText(""); // Limpiar el campo de texto después de agregar
		setMensaje(""); // Limpiar el mensaje
	};

	return (
		<Card title={"ToDo List"}>
			<section className="tareas-section">
				<input
					type="text"
					placeholder="Escribe tu tarea..."
					value={text}
					onChange={(event) => setText(event.target.value)}
					onKeyDown={(event) => {
						if (event.key === "Enter") {
							handleAddTask(); // Al presionar Enter, se ejecuta handleAddTask
						}
					}}
				/>
				<button className="tareas-button" onClick={handleAddTask}>
					Añadir tarea
				</button>
				{mensaje && <p className="mensaje-error">{mensaje}</p>}

				<ul className="tareas-ul">
					{state.map((tarea) => (
						<li className="tareas-li" key={tarea.id}>
							<input
								type="checkbox"
								checked={tarea.completado}
								onChange={() =>
									dispatch({
										type: "completarTarea",
										payload: tarea.id,
									})
								}
							/>
							<span className={`tareas-span ${tarea.completado ? "tarea-completada" : ""}`}>{tarea.texto}</span>
							<button
								className="tareas-eliminar-button"
								onClick={() =>
									dispatch({
										type: "eliminarTarea",
										payload: tarea.id,
									})
								}
							>
								❌
							</button>
						</li>
					))}
				</ul>
			</section>
		</Card>
	);
};

export default ToDoList;
