import React, { useState } from "react";
import {
	Plane,
	Plus,
	Search,
	Eye,
	Edit,
	Trash2,
	Filter,
	LayoutGrid,
	List,
} from "lucide-react";

const AircraftList = ({ onViewDetails, onEdit, onAdd }) => {
	const [aircraft] = useState([
		{
			ac_Id: "AC-001",
			ac_TailNo: "N123AB",
			ac_Type: "Jet",
			ac_Manufacturer: "Gulfstream",
			ac_Model: "G650",
			ac_YearManufactured: "2020",
			ac_PassengerCapacity: "12",
			ac_HomeBase: "KJFK",
			ac_MaxRange: "7000",
			ac_CruiseSpeed: "516",
			status: "Active",
		},
		{
			ac_Id: "AC-002",
			ac_TailNo: "N456CD",
			ac_Type: "Jet",
			ac_Manufacturer: "Bombardier",
			ac_Model: "Global 7500",
			ac_YearManufactured: "2021",
			ac_PassengerCapacity: "14",
			ac_HomeBase: "KLAX",
			ac_MaxRange: "7700",
			ac_CruiseSpeed: "490",
			status: "Active",
		},
		{
			ac_Id: "AC-003",
			ac_TailNo: "N789EF",
			ac_Type: "Turboprop",
			ac_Manufacturer: "Cessna",
			ac_Model: "Citation X+",
			ac_YearManufactured: "2019",
			ac_PassengerCapacity: "8",
			ac_HomeBase: "KDXB",
			ac_MaxRange: "3408",
			ac_CruiseSpeed: "527",
			status: "Maintenance",
		},
		{
			ac_Id: "AC-004",
			ac_TailNo: "N321GH",
			ac_Type: "Jet",
			ac_Manufacturer: "Dassault",
			ac_Model: "Falcon 8X",
			ac_YearManufactured: "2022",
			ac_PassengerCapacity: "10",
			ac_HomeBase: "EGLL",
			ac_MaxRange: "6450",
			ac_CruiseSpeed: "488",
			status: "Active",
		},
		{
			ac_Id: "AC-005",
			ac_TailNo: "N654IJ",
			ac_Type: "Helicopter",
			ac_Manufacturer: "Airbus",
			ac_Model: "H145",
			ac_YearManufactured: "2023",
			ac_PassengerCapacity: "6",
			ac_HomeBase: "LFPG",
			ac_MaxRange: "416",
			ac_CruiseSpeed: "137",
			status: "Active",
		},
	]);

	const [searchTerm, setSearchTerm] = useState("");
	const [filterType, setFilterType] = useState("all");
	const [deleteConfirm, setDeleteConfirm] = useState(null);
	const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'list'

	const handleDelete = (id) => {
		console.log("Delete aircraft:", id);
		setDeleteConfirm(null);
	};

	// Filter aircraft
	const filteredAircraft = aircraft.filter((ac) => {
		const matchesSearch =
			ac.ac_TailNo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
			ac.ac_Manufacturer?.toLowerCase().includes(searchTerm.toLowerCase()) ||
			ac.ac_Model?.toLowerCase().includes(searchTerm.toLowerCase());

		const matchesType = filterType === "all" || ac.ac_Type === filterType;

		return matchesSearch && matchesType;
	});

	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4">
			<div className="max-w-[1600px] mx-auto">
				{/* Header */}
				<div className="mb-4">
					<div className="flex items-center justify-between mb-4">
						<div>
							<h1 className="text-2xl font-bold text-gray-900">
								Aircraft Fleet
							</h1>
							<p className="text-sm text-gray-600">
								Manage your aircraft inventory
							</p>
						</div>
						<button
							onClick={onAdd}
							className="px-4 py-2 text-sm bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:shadow-lg transition-all flex items-center gap-2 font-medium"
						>
							<Plus className="w-4 h-4" />
							Add Aircraft
						</button>
					</div>
				</div>

				{/* Stats Cards */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
					<div className="bg-white rounded-xl shadow-md p-4">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
									Total Fleet
								</p>
								<p className="text-2xl font-bold text-gray-900 mt-1">
									{aircraft.length}
								</p>
							</div>
							<div className="bg-blue-100 p-2 rounded-lg">
								<Plane className="w-6 h-6 text-blue-600" />
							</div>
						</div>
					</div>
					<div className="bg-white rounded-xl shadow-md p-4">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
									Active
								</p>
								<p className="text-2xl font-bold text-green-600 mt-1">
									{aircraft.filter((ac) => ac.status === "Active").length}
								</p>
							</div>
							<div className="bg-green-100 p-2 rounded-lg">
								<Plane className="w-6 h-6 text-green-600" />
							</div>
						</div>
					</div>
					<div className="bg-white rounded-xl shadow-md p-4">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
									Maintenance
								</p>
								<p className="text-2xl font-bold text-orange-600 mt-1">
									{aircraft.filter((ac) => ac.status === "Maintenance").length}
								</p>
							</div>
							<div className="bg-orange-100 p-2 rounded-lg">
								<Plane className="w-6 h-6 text-orange-600" />
							</div>
						</div>
					</div>
				</div>

				{/* Filters */}
				<div className="bg-white rounded-xl shadow-md p-4 mb-4">
					<div className="flex flex-col md:flex-row gap-3">
						{/* Search */}
						<div className="flex-1 relative">
							<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
							<input
								type="text"
								placeholder="Search by tail number, manufacturer, or model..."
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								className="w-full pl-10 pr-3 py-2 text-sm bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
							/>
						</div>

						{/* Type Filter */}
						<div className="flex items-center gap-2">
							<Filter className="w-4 h-4 text-gray-400" />
							<select
								value={filterType}
								onChange={(e) => setFilterType(e.target.value)}
								className="px-3 py-2 text-sm bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
							>
								<option value="all">All Types</option>
								<option value="Jet">Jet</option>
								<option value="Turboprop">Turboprop</option>
								<option value="Helicopter">Helicopter</option>
								<option value="Piston">Piston</option>
							</select>
						</div>

						{/* View Toggle */}
						<div className="flex gap-2">
							<button
								onClick={() => setViewMode("grid")}
								className={`p-2 rounded-lg transition-all ${
									viewMode === "grid"
										? "bg-blue-600 text-white"
										: "bg-gray-100 text-gray-600 hover:bg-gray-200"
								}`}
							>
								<LayoutGrid className="w-4 h-4" />
							</button>
							<button
								onClick={() => setViewMode("list")}
								className={`p-2 rounded-lg transition-all ${
									viewMode === "list"
										? "bg-blue-600 text-white"
										: "bg-gray-100 text-gray-600 hover:bg-gray-200"
								}`}
							>
								<List className="w-4 h-4" />
							</button>
						</div>
					</div>
				</div>

				{/* Results Count */}
				<div className="mb-3">
					<p className="text-xs text-gray-600">
						Showing <span className="font-bold">{filteredAircraft.length}</span>{" "}
						aircraft
					</p>
				</div>

				{filteredAircraft.length === 0 ? (
					/* Empty State */
					<div className="bg-white rounded-xl shadow-md p-8 text-center">
						<div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
							<Plane className="w-8 h-8 text-gray-400" />
						</div>
						<h3 className="text-base font-bold text-gray-900 mb-2">
							No Aircraft Found
						</h3>
						<p className="text-sm text-gray-600 mb-4">
							{searchTerm
								? "Try adjusting your search or filters."
								: "Get started by adding your first aircraft."}
						</p>
						{!searchTerm && (
							<button
								onClick={onAdd}
								className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all inline-flex items-center gap-2 font-medium"
							>
								<Plus className="w-4 h-4" />
								Add First Aircraft
							</button>
						)}
					</div>
				) : viewMode === "grid" ? (
					/* Grid View */
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
						{filteredAircraft.map((ac) => (
							<div
								key={ac.ac_Id}
								className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all overflow-hidden group"
							>
								{/* Card Header */}
								<div className="bg-gradient-to-r from-blue-600 to-blue-700 p-4 text-white">
									<div className="flex items-start justify-between mb-3">
										<div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
											<Plane className="w-6 h-6 text-white transform -rotate-45" />
										</div>
										<span
											className={`px-2 py-0.5 rounded-full text-xs font-bold ${
												ac.status === "Active"
													? "bg-green-500/20 text-green-100"
													: "bg-orange-500/20 text-orange-100"
											}`}
										>
											{ac.status}
										</span>
									</div>
									<h3 className="text-xl font-bold mb-0.5">{ac.ac_TailNo}</h3>
									<p className="text-blue-100 text-sm">
										{ac.ac_Manufacturer} {ac.ac_Model}
									</p>
								</div>

								{/* Card Body */}
								<div className="p-4">
									<div className="grid grid-cols-2 gap-3 mb-4">
										<div>
											<p className="text-xs text-gray-500 mb-0.5">Type</p>
											<p className="text-sm font-bold text-gray-900">
												{ac.ac_Type}
											</p>
										</div>
										<div>
											<p className="text-xs text-gray-500 mb-0.5">Year</p>
											<p className="text-sm font-bold text-gray-900">
												{ac.ac_YearManufactured}
											</p>
										</div>
										<div>
											<p className="text-xs text-gray-500 mb-0.5">Capacity</p>
											<p className="text-sm font-bold text-gray-900">
												{ac.ac_PassengerCapacity} PAX
											</p>
										</div>
										<div>
											<p className="text-xs text-gray-500 mb-0.5">Home Base</p>
											<p className="text-sm font-bold text-gray-900 font-mono">
												{ac.ac_HomeBase}
											</p>
										</div>
									</div>

									{/* Actions */}
									<div className="flex gap-2">
										<button
											onClick={() => onViewDetails(ac.ac_Id)}
											className="flex-1 px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all flex items-center justify-center gap-1 font-medium"
										>
											<Eye className="w-4 h-4" />
											View
										</button>
										<button
											onClick={() => onEdit(ac)}
											className="px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all"
										>
											<Edit className="w-4 h-4" />
										</button>
										<button
											onClick={() => setDeleteConfirm(ac.ac_Id)}
											className="px-3 py-2 text-sm bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-all"
										>
											<Trash2 className="w-4 h-4" />
										</button>
									</div>
								</div>
							</div>
						))}
					</div>
				) : (
					/* List View */
					<div className="bg-white rounded-xl shadow-md overflow-hidden">
						<table className="w-full text-sm">
							<thead className="bg-gray-50 border-b border-gray-200">
								<tr>
									<th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
										Aircraft
									</th>
									<th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
										Type
									</th>
									<th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
										Capacity
									</th>
									<th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
										Home Base
									</th>
									<th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
										Status
									</th>
									<th className="px-4 py-3 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">
										Actions
									</th>
								</tr>
							</thead>
							<tbody className="divide-y divide-gray-200">
								{filteredAircraft.map((ac) => (
									<tr
										key={ac.ac_Id}
										className="hover:bg-gray-50 transition-colors"
									>
										<td className="px-4 py-3">
											<div className="flex items-center gap-3">
												<div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg flex items-center justify-center flex-shrink-0">
													<Plane className="w-5 h-5 text-white transform -rotate-45" />
												</div>
												<div>
													<p className="text-sm font-bold text-gray-900">
														{ac.ac_TailNo}
													</p>
													<p className="text-xs text-gray-500">
														{ac.ac_Manufacturer} {ac.ac_Model}
													</p>
												</div>
											</div>
										</td>
										<td className="px-4 py-3">
											<span
												className={`px-2 py-0.5 rounded-full text-xs font-bold ${
													ac.ac_Type === "Jet"
														? "bg-blue-100 text-blue-700"
														: ac.ac_Type === "Turboprop"
														? "bg-green-100 text-green-700"
														: ac.ac_Type === "Helicopter"
														? "bg-purple-100 text-purple-700"
														: "bg-gray-100 text-gray-700"
												}`}
											>
												{ac.ac_Type}
											</span>
										</td>
										<td className="px-4 py-3 text-sm text-gray-900 font-medium">
											{ac.ac_PassengerCapacity} PAX
										</td>
										<td className="px-4 py-3 text-sm text-gray-900 font-mono font-medium">
											{ac.ac_HomeBase}
										</td>
										<td className="px-4 py-3">
											<span
												className={`px-2 py-0.5 rounded-full text-xs font-bold ${
													ac.status === "Active"
														? "bg-green-100 text-green-700"
														: "bg-orange-100 text-orange-700"
												}`}
											>
												{ac.status}
											</span>
										</td>
										<td className="px-4 py-3">
											<div className="flex items-center justify-end gap-1">
												<button
													onClick={() => onViewDetails(ac.ac_Id)}
													className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
													title="View Details"
												>
													<Eye className="w-4 h-4" />
												</button>
												<button
													onClick={() => onEdit(ac)}
													className="p-1.5 text-gray-600 hover:bg-gray-100 rounded-lg transition-all"
													title="Edit"
												>
													<Edit className="w-4 h-4" />
												</button>
												<button
													onClick={() => setDeleteConfirm(ac.ac_Id)}
													className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-all"
													title="Delete"
												>
													<Trash2 className="w-4 h-4" />
												</button>
											</div>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				)}

				{/* Delete Confirmation Modal */}
				{deleteConfirm && (
					<div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
						<div className="bg-white rounded-xl max-w-md w-full p-6 shadow-2xl">
							<div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
								<Trash2 className="w-6 h-6 text-red-600" />
							</div>
							<h3 className="text-lg font-bold text-gray-900 text-center mb-2">
								Delete Aircraft?
							</h3>
							<p className="text-sm text-gray-600 text-center mb-4">
								This action cannot be undone. All aircraft data will be
								permanently removed.
							</p>
							<div className="flex gap-2">
								<button
									onClick={() => setDeleteConfirm(null)}
									className="flex-1 px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-all font-medium"
								>
									Cancel
								</button>
								<button
									onClick={() => handleDelete(deleteConfirm)}
									className="flex-1 px-4 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all font-medium"
								>
									Delete
								</button>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default AircraftList;
