import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import Chaos from "./pages/Chaos";
import Fire from './pages/Fire';
import Sandbox from './pages/Sandbox';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />}/>
				<Route path="/chaos" element={<Chaos />}/>
				<Route path="/fire" element={<Fire />}/>
				<Route path="/sandbox" element={<Sandbox />}/>
			</Routes>
		</BrowserRouter>
	);
}


export default App;
