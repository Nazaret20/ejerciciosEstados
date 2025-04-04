import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import UseReducerPractice from "./pages/useReducerPractice/UseReducerPractice";
import CustomHookPractice from "./pages/customHookPractice/CustomHookPractice";
import "./styles/app.css";

function App() {
	return (
		<Router>
			<Header />

			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/usereducerpractice" element={<UseReducerPractice />} />
				<Route path="/customhookpractice" element={<CustomHookPractice />} />
			</Routes>
		</Router>
	);
}

export default App;
