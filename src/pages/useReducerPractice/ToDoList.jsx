import { useReducer } from "react";

const initialState = {
  tareas: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "añadir":
      return { ...state, tareas: [...state.tareas, action.payload] };
    case "eliminar":
      return { ...state, tareas: state.tareas.filter((tarea) => tarea.id !== action.payload) };
    default:
      return state;
  }
};

const ToDoList = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [tarea, setTarea] = useState("");

  const handleAdd = () => {
    dispatch({ type: "añadir", payload: { id: Date.now(), texto: tarea } });
    setTarea("");
  };

  return (
    <div>
      <input
        type="text"
        value={tarea}
        onChange={(e) => setTarea(e.target.value)}
        placeholder="Añadir tarea"
      />
      <button onClick={handleAdd}>Añadir</button>
      <ul>
        {state.tareas.map((t) => (
          <li key={t.id}>
            {t.texto} <button onClick={() => dispatch({ type: "eliminar", payload: t.id })}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ToDoList;
