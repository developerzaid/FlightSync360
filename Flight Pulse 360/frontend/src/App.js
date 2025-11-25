import "./App.css";
import "./index.css";

import Layout from "./FixedComponents/Layout";
import AircraftManagement from "./Components/Entity/Aircraft/AircraftManagement";
import VendorManagement from "./Components/Entity/Vendor/VendorManagement";
import CrewManagement from "./Components/Entity/Crew/CrewManagement";
import ClientManagement from "./Components/Entity/Client/ClientManagement";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import TripForm from "./Components/Trip/AddTrip";
import TripManagement from "./Components/Trip/TripManagement";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				{/* MAIN LAYOUT WRAPPER */}
				<Route path="/" element={<Layout />}>
					<Route path="/aircrafts" element={<AircraftManagement />} />
					<Route path="/vendors" element={<VendorManagement />} />
					<Route path="/crews" element={<CrewManagement />} />
					<Route path="/clients" element={<ClientManagement />} />
					<Route path="/trips" element={<TripManagement />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
