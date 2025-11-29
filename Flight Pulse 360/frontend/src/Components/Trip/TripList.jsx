import React, { useState } from "react";
import { Search, Eye, Edit, Trash2, ArrowRight } from "lucide-react";

const TripList = ({ trips, onViewDetails, onEdit, onDelete }) => {
	const [filters, setFilters] = useState({
		search: "",
		status: "all",
		client: "all",
		aircraft: "all",
		fromAirport: "all",
		toAirport: "all",
		dateFrom: "",
		dateTo: "",
		tripType: "all",
		crewMember: "all",
		service: "all",
	});

	const getStatusBadge = (status) => {
		const badges = {
			confirmed: "bg-green-100 text-green-700",
			"in-progress": "bg-blue-100 text-blue-700",
			pending: "bg-orange-100 text-orange-700",
			completed: "bg-gray-100 text-gray-700",
			cancelled: "bg-red-100 text-red-700",
		};
		return badges[status] || badges.pending;
	};

	const handleFilterChange = (key, value) => {
		setFilters({ ...filters, [key]: value });
	};

	const clearFilters = () => {
		setFilters({
			search: "",
			status: "all",
			client: "all",
			aircraft: "all",
			fromAirport: "all",
			toAirport: "all",
			dateFrom: "",
			dateTo: "",
			tripType: "all",
			crewMember: "all",
			service: "all",
		});
	};

	const filteredTrips = trips.filter((trip) => {
		if (filters.search) {
			const searchLower = filters.search.toLowerCase();
			if (
				!trip.tripNumber.toLowerCase().includes(searchLower) &&
				!trip.flightNumber.toLowerCase().includes(searchLower) &&
				!trip.client.name.toLowerCase().includes(searchLower) &&
				!trip.fromAirport.toLowerCase().includes(searchLower) &&
				!trip.toAirport.toLowerCase().includes(searchLower)
			)
				return false;
		}
		if (filters.status !== "all" && trip.status !== filters.status)
			return false;
		if (
			filters.client !== "all" &&
			trip.client.id.toString() !== filters.client
		)
			return false;
		if (
			filters.aircraft !== "all" &&
			trip.aircraft.id.toString() !== filters.aircraft
		)
			return false;
		if (
			filters.fromAirport !== "all" &&
			trip.fromAirport !== filters.fromAirport
		)
			return false;
		if (filters.toAirport !== "all" && trip.toAirport !== filters.toAirport)
			return false;
		if (filters.tripType !== "all" && trip.tripType !== filters.tripType)
			return false;
		return true;
	});

	// Extract unique values for filters
	const uniqueClients = [...new Set(trips.map((t) => t.client))];
	const uniqueAircraft = [...new Set(trips.map((t) => t.aircraft))];
	const uniqueAirports = [
		...new Set(trips.flatMap((t) => [t.fromAirport, t.toAirport])),
	];

	return (
		<div className="bg-white rounded-xl shadow-md p-5">
			{/* Filters Section */}
			<div className="mb-4 p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
				<h3 className="text-sm font-bold text-blue-900 mb-3">FILTERS</h3>
				<div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
					<div>
						<label className="block text-xs font-medium text-gray-700 mb-1">
							Search
						</label>
						<input
							type="text"
							value={filters.search}
							onChange={(e) => handleFilterChange("search", e.target.value)}
							placeholder="Search..."
							className="w-full px-2 py-1 text-xs border border-gray-300 rounded"
						/>
					</div>

					<div>
						<label className="block text-xs font-medium text-gray-700 mb-1">
							Status
						</label>
						<select
							value={filters.status}
							onChange={(e) => handleFilterChange("status", e.target.value)}
							className="w-full px-2 py-1 text-xs border border-gray-300 rounded"
						>
							<option value="all">All Status</option>
							<option value="confirmed">Confirmed</option>
							<option value="in-progress">In Progress</option>
							<option value="pending">Pending</option>
							<option value="completed">Completed</option>
							<option value="cancelled">Cancelled</option>
						</select>
					</div>

					<div>
						<label className="block text-xs font-medium text-gray-700 mb-1">
							Client
						</label>
						<select
							value={filters.client}
							onChange={(e) => handleFilterChange("client", e.target.value)}
							className="w-full px-2 py-1 text-xs border border-gray-300 rounded"
						>
							<option value="all">All Clients</option>
							{uniqueClients.map((client) => (
								<option key={client.id} value={client.id}>
									{client.name}
								</option>
							))}
						</select>
					</div>

					<div>
						<label className="block text-xs font-medium text-gray-700 mb-1">
							Aircraft
						</label>
						<select
							value={filters.aircraft}
							onChange={(e) => handleFilterChange("aircraft", e.target.value)}
							className="w-full px-2 py-1 text-xs border border-gray-300 rounded"
						>
							<option value="all">All Aircraft</option>
							{uniqueAircraft.map((aircraft) => (
								<option key={aircraft.id} value={aircraft.id}>
									{aircraft.registration}
								</option>
							))}
						</select>
					</div>

					<div>
						<label className="block text-xs font-medium text-gray-700 mb-1">
							From Airport
						</label>
						<select
							value={filters.fromAirport}
							onChange={(e) =>
								handleFilterChange("fromAirport", e.target.value)
							}
							className="w-full px-2 py-1 text-xs border border-gray-300 rounded"
						>
							<option value="all">All</option>
							{uniqueAirports.map((airport) => (
								<option key={airport} value={airport}>
									{airport}
								</option>
							))}
						</select>
					</div>

					<div>
						<label className="block text-xs font-medium text-gray-700 mb-1">
							To Airport
						</label>
						<select
							value={filters.toAirport}
							onChange={(e) => handleFilterChange("toAirport", e.target.value)}
							className="w-full px-2 py-1 text-xs border border-gray-300 rounded"
						>
							<option value="all">All</option>
							{uniqueAirports.map((airport) => (
								<option key={airport} value={airport}>
									{airport}
								</option>
							))}
						</select>
					</div>

					<div>
						<label className="block text-xs font-medium text-gray-700 mb-1">
							Date From
						</label>
						<input
							type="date"
							value={filters.dateFrom}
							onChange={(e) => handleFilterChange("dateFrom", e.target.value)}
							className="w-full px-2 py-1 text-xs border border-gray-300 rounded"
						/>
					</div>

					<div>
						<label className="block text-xs font-medium text-gray-700 mb-1">
							Date To
						</label>
						<input
							type="date"
							value={filters.dateTo}
							onChange={(e) => handleFilterChange("dateTo", e.target.value)}
							className="w-full px-2 py-1 text-xs border border-gray-300 rounded"
						/>
					</div>

					<div>
						<label className="block text-xs font-medium text-gray-700 mb-1">
							Trip Type
						</label>
						<select
							value={filters.tripType}
							onChange={(e) => handleFilterChange("tripType", e.target.value)}
							className="w-full px-2 py-1 text-xs border border-gray-300 rounded"
						>
							<option value="all">All Types</option>
							<option value="Charter">Charter</option>
							<option value="Private">Private</option>
							<option value="Medical">Medical</option>
							<option value="Cargo">Cargo</option>
						</select>
					</div>

					<div>
						<label className="block text-xs font-medium text-gray-700 mb-1">
							Service
						</label>
						<select
							value={filters.service}
							onChange={(e) => handleFilterChange("service", e.target.value)}
							className="w-full px-2 py-1 text-xs border border-gray-300 rounded"
						>
							<option value="all">All Services</option>
							<option value="Fuel">Fuel</option>
							<option value="Ground">Ground Handling</option>
							<option value="Permits">Permits</option>
							<option value="Catering">Catering</option>
						</select>
					</div>

					<div className="flex items-end">
						<button
							onClick={clearFilters}
							className="w-full px-3 py-1 bg-red-500 text-white rounded text-xs font-bold hover:bg-red-600"
						>
							Clear
						</button>
					</div>
				</div>
			</div>

			{/* Table */}
			<div className="overflow-x-auto">
				<table className="w-full text-xs">
					<thead className="bg-gray-100 border-b-2 border-gray-300">
						<tr>
							<th className="px-2 py-2 text-left font-bold text-gray-700">
								Trip No
							</th>
							<th className="px-2 py-2 text-left font-bold text-gray-700">
								Flight No
							</th>
							<th className="px-2 py-2 text-left font-bold text-gray-700">
								Date
							</th>
							<th className="px-2 py-2 text-left font-bold text-gray-700">
								Route
							</th>
							<th className="px-2 py-2 text-left font-bold text-gray-700">
								Client
							</th>
							<th className="px-2 py-2 text-left font-bold text-gray-700">
								Aircraft
							</th>
							<th className="px-2 py-2 text-left font-bold text-gray-700">
								Crew
							</th>
							<th className="px-2 py-2 text-left font-bold text-gray-700">
								Services
							</th>
							<th className="px-2 py-2 text-left font-bold text-gray-700">
								Status
							</th>
							<th className="px-2 py-2 text-center font-bold text-gray-700">
								Actions
							</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-gray-200">
						{filteredTrips.map((trip) => (
							<tr key={trip.id} className="hover:bg-gray-50">
								<td className="px-2 py-2 font-mono font-bold text-blue-700">
									{trip.tripNumber}
								</td>
								<td className="px-2 py-2 font-mono">{trip.flightNumber}</td>
								<td className="px-2 py-2">
									{new Date(trip.scheduledDeparture).toLocaleDateString(
										"en-US",
										{
											month: "short",
											day: "numeric",
											year: "numeric",
										}
									)}
								</td>
								<td className="px-2 py-2">
									<span className="font-bold">{trip.fromAirport}</span>
									<ArrowRight className="w-3 h-3 inline mx-1" />
									<span className="font-bold">{trip.toAirport}</span>
								</td>
								<td className="px-2 py-2">{trip.client.name}</td>
								<td className="px-2 py-2">
									{trip.aircraft.registration} - {trip.aircraft.type}
								</td>
								<td className="px-2 py-2">
									{trip.crew.pilots.map((p) => p.name.split(" ")[1]).join(", ")}
								</td>
								<td className="px-2 py-2">
									{trip.services.slice(0, 2).map((service, idx) => (
										<span
											key={idx}
											className="px-1 py-0.5 bg-blue-100 text-blue-700 rounded text-xs mr-1"
										>
											{service}
										</span>
									))}
									{trip.services.length > 2 && (
										<span className="text-gray-500">
											+{trip.services.length - 2}
										</span>
									)}
								</td>
								<td className="px-2 py-2">
									<span
										className={`px-2 py-0.5 rounded-full text-xs font-bold ${getStatusBadge(
											trip.status
										)}`}
									>
										{trip.status.toUpperCase()}
									</span>
								</td>
								<td className="px-2 py-2 text-center">
									<button
										onClick={() => onViewDetails(trip)}
										className="p-1 hover:bg-blue-50 rounded"
										title="View Details"
									>
										<Eye className="w-4 h-4 text-gray-600" />
									</button>
									<button
										onClick={() => onEdit(trip)}
										className="p-1 hover:bg-orange-50 rounded ml-1"
										title="Edit"
									>
										<Edit className="w-4 h-4 text-gray-600" />
									</button>
									<button
										onClick={() => onDelete(trip.id)}
										className="p-1 hover:bg-red-50 rounded ml-1"
										title="Delete"
									>
										<Trash2 className="w-4 h-4 text-gray-600" />
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			{filteredTrips.length === 0 && (
				<div className="text-center py-8 text-sm text-gray-500">
					No trips found matching your filters
				</div>
			)}

			<div className="mt-3 text-xs text-gray-600">
				Showing {filteredTrips.length} of {trips.length} trips
			</div>
		</div>
	);
};

export default TripList;
