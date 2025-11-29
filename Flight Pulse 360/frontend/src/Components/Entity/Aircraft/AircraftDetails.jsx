import React, { useState, useEffect } from "react";
import {
	Plane,
	X,
	Edit,
	Trash2,
	Calendar,
	MapPin,
	Gauge,
	Users,
	Fuel,
	Wind,
	Weight,
	Ruler,
	FileText,
	Shield,
	Download,
	Eye,
} from "lucide-react";

const AircraftDetails = ({ aircraftId, onClose, onEdit, onDelete }) => {
	const [aircraft, setAircraft] = useState(null);
	const [activeTab, setActiveTab] = useState("overview");

	useEffect(() => {
		// Mock aircraft data with documents
		const mockAircraft = {
			ac_Id: aircraftId,
			ac_TailNo: "N123AB",
			uxUniversalCompanyId: "COMP-001",
			ac_Type: "Jet",
			ac_Manufacturer: "Gulfstream",
			ac_Model: "G650",
			ac_YearManufactured: "2020",
			ac_PassengerCapacity: "12",
			ac_MaxRange: "7000",
			ac_CruiseSpeed: "516",
			ac_FuelCapacity: "4000",
			ac_WingSpan: "99.7",
			ac_maxTakeOffWeight: "99600",
			ac_HomeBase: "KJFK",
			ac_RegistrationDate: "2020-01-15",
			ac_InsuranceDetails:
				"Policy #12345 - Full Hull Coverage\nProvider: AIG Aviation\nExpiry: 2025-12-31",
			ac_Notes:
				"VIP configuration with luxury seating and full entertainment system.",
			status: "Active",
			documents: [
				{
					id: 1,
					name: "Aircraft Registration.pdf",
					category: "Registration",
					size: "245 KB",
					uploadDate: "2023-01-15",
				},
				{
					id: 2,
					name: "Insurance Certificate.pdf",
					category: "Insurance",
					size: "189 KB",
					uploadDate: "2023-02-20",
				},
				{
					id: 3,
					name: "Maintenance Log.pdf",
					category: "Maintenance",
					size: "1.2 MB",
					uploadDate: "2023-11-10",
				},
				{
					id: 4,
					name: "Airworthiness Certificate.pdf",
					category: "Registration",
					size: "156 KB",
					uploadDate: "2023-01-15",
				},
			],
		};

		setAircraft(mockAircraft);
	}, [aircraftId]);

	if (!aircraft) {
		return (
			<div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
				<div className="bg-white rounded-xl p-6">
					<div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
					<p className="mt-3 text-sm text-gray-600">
						Loading aircraft details...
					</p>
				</div>
			</div>
		);
	}

	const tabs = [
		{ id: "overview", name: "Overview", icon: Plane },
		{ id: "specifications", name: "Specifications", icon: Gauge },
		{ id: "documents", name: "Documents", icon: FileText },
	];

	return (
		<div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 overflow-y-auto">
			<div className="min-h-screen p-4">
				<div className="max-w-6xl mx-auto">
					{/* Header */}
					<div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-t-xl shadow-2xl p-5 text-white">
						<div className="flex items-center justify-between mb-4">
							<div className="flex items-center gap-3">
								<div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
									<Plane className="w-6 h-6 text-white transform -rotate-45" />
								</div>
								<div>
									<div className="flex items-center gap-2">
										<h1 className="text-2xl font-bold">{aircraft.ac_TailNo}</h1>
										<span
											className={`px-2 py-0.5 rounded-full text-xs font-bold ${
												aircraft.status === "Active"
													? "bg-green-500/20 text-green-100"
													: "bg-orange-500/20 text-orange-100"
											}`}
										>
											{aircraft.status}
										</span>
									</div>
									<p className="text-base text-blue-100">
										{aircraft.ac_Manufacturer} {aircraft.ac_Model}
									</p>
									<p className="text-blue-200 text-xs mt-1">
										Year: {aircraft.ac_YearManufactured} • Type:{" "}
										{aircraft.ac_Type}
									</p>
								</div>
							</div>
							<div className="flex gap-2">
								<button
									onClick={() => onEdit(aircraft)}
									className="px-3 py-1.5 text-sm bg-white/20 hover:bg-white/30 rounded-lg transition-all backdrop-blur-sm flex items-center gap-1 font-medium"
								>
									<Edit className="w-4 h-4" />
									Edit
								</button>
								<button
									onClick={() => onDelete(aircraft.ac_Id)}
									className="px-3 py-1.5 text-sm bg-red-500/80 hover:bg-red-600 rounded-lg transition-all backdrop-blur-sm flex items-center gap-1 font-medium"
								>
									<Trash2 className="w-4 h-4" />
									Delete
								</button>
								<button
									onClick={onClose}
									className="p-1.5 hover:bg-white/20 rounded-lg transition-all backdrop-blur-sm"
								>
									<X className="w-5 h-5" />
								</button>
							</div>
						</div>
					</div>

					{/* Quick Stats */}
					<div className="bg-white shadow-lg px-5 py-4 border-b">
						<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
							<div className="text-center">
								<div className="text-2xl font-bold text-blue-600 mb-0.5">
									{aircraft.ac_PassengerCapacity}
								</div>
								<div className="text-xs text-gray-600">Passengers</div>
							</div>
							<div className="text-center">
								<div className="text-2xl font-bold text-green-600 mb-0.5">
									{aircraft.ac_MaxRange}
								</div>
								<div className="text-xs text-gray-600">Range (NM)</div>
							</div>
							<div className="text-center">
								<div className="text-2xl font-bold text-purple-600 mb-0.5">
									{aircraft.ac_CruiseSpeed}
								</div>
								<div className="text-xs text-gray-600">Speed (kts)</div>
							</div>
							<div className="text-center">
								<div className="text-2xl font-bold text-orange-600 mb-0.5">
									{aircraft.ac_HomeBase}
								</div>
								<div className="text-xs text-gray-600">Home Base</div>
							</div>
						</div>
					</div>

					{/* Tabs */}
					<div className="bg-white shadow-lg px-5 border-b">
						<div className="flex gap-1">
							{tabs.map((tab) => (
								<button
									key={tab.id}
									onClick={() => setActiveTab(tab.id)}
									className={`px-4 py-2 text-sm font-bold transition-all flex items-center gap-2 ${
										activeTab === tab.id
											? "text-blue-600 border-b-2 border-blue-600"
											: "text-gray-600 hover:text-gray-900"
									}`}
								>
									<tab.icon className="w-4 h-4" />
									{tab.name}
								</button>
							))}
						</div>
					</div>

					{/* Tab Content */}
					<div className="bg-white rounded-b-xl shadow-2xl p-5">
						{/* Overview Tab */}
						{activeTab === "overview" && (
							<div className="space-y-4">
								<div>
									<h3 className="text-base font-bold text-gray-900 mb-3">
										Basic Information
									</h3>
									<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
										<InfoCard
											icon={Plane}
											label="Tail Number"
											value={aircraft.ac_TailNo}
										/>
										<InfoCard
											icon={FileText}
											label="Manufacturer"
											value={aircraft.ac_Manufacturer}
										/>
										<InfoCard
											icon={FileText}
											label="Model"
											value={aircraft.ac_Model}
										/>
										<InfoCard
											icon={Calendar}
											label="Year"
											value={aircraft.ac_YearManufactured}
										/>
										<InfoCard
											icon={Users}
											label="Capacity"
											value={`${aircraft.ac_PassengerCapacity} passengers`}
										/>
										<InfoCard
											icon={MapPin}
											label="Home Base"
											value={aircraft.ac_HomeBase}
										/>
									</div>
								</div>

								{aircraft.ac_Notes && (
									<div>
										<h3 className="text-base font-bold text-gray-900 mb-3">
											Additional Notes
										</h3>
										<div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
											<p className="text-sm text-gray-700 whitespace-pre-wrap">
												{aircraft.ac_Notes}
											</p>
										</div>
									</div>
								)}
							</div>
						)}

						{/* Specifications Tab */}
						{activeTab === "specifications" && (
							<div className="space-y-4">
								<div>
									<h3 className="text-base font-bold text-gray-900 mb-3">
										Performance
									</h3>
									<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
										<InfoCard
											icon={Gauge}
											label="Maximum Range"
											value={`${aircraft.ac_MaxRange} NM`}
										/>
										<InfoCard
											icon={Wind}
											label="Cruise Speed"
											value={`${aircraft.ac_CruiseSpeed} knots`}
										/>
										<InfoCard
											icon={Fuel}
											label="Fuel Capacity"
											value={`${aircraft.ac_FuelCapacity} gallons`}
										/>
										<InfoCard
											icon={Ruler}
											label="Wing Span"
											value={`${aircraft.ac_WingSpan} ft`}
										/>
										<InfoCard
											icon={Weight}
											label="Max Takeoff Weight"
											value={`${aircraft.ac_maxTakeOffWeight} lbs`}
										/>
									</div>
								</div>

								<div>
									<h3 className="text-base font-bold text-gray-900 mb-3">
										Registration & Insurance
									</h3>
									<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
										<InfoCard
											icon={Calendar}
											label="Registration Date"
											value={new Date(
												aircraft.ac_RegistrationDate
											).toLocaleDateString()}
										/>
										<InfoCard
											icon={Shield}
											label="Insurance Status"
											value="Active"
										/>
									</div>

									{aircraft.ac_InsuranceDetails && (
										<div className="mt-3 bg-green-50 border-2 border-green-200 rounded-lg p-4">
											<h4 className="text-sm font-bold text-gray-900 mb-2 flex items-center gap-2">
												<Shield className="w-4 h-4 text-green-600" />
												Insurance Details
											</h4>
											<p className="text-sm text-gray-700 whitespace-pre-wrap">
												{aircraft.ac_InsuranceDetails}
											</p>
										</div>
									)}
								</div>
							</div>
						)}

						{/* Documents Tab */}
						{activeTab === "documents" && (
							<div>
								<div className="flex items-center justify-between mb-4">
									<h3 className="text-base font-bold text-gray-900">
										Aircraft Documents ({aircraft.documents.length})
									</h3>
									<button className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all flex items-center gap-2 font-medium">
										<Download className="w-4 h-4" />
										Download All
									</button>
								</div>

								<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
									{aircraft.documents.map((doc) => (
										<div
											key={doc.id}
											className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200 hover:border-blue-300 transition-all group"
										>
											<div className="flex items-center gap-3 flex-1 min-w-0">
												<div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
													<FileText className="w-5 h-5 text-blue-600" />
												</div>
												<div className="flex-1 min-w-0">
													<p className="text-sm font-bold text-gray-900 truncate">
														{doc.name}
													</p>
													<div className="flex items-center gap-2 text-xs text-gray-500">
														<span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded font-medium">
															{doc.category}
														</span>
														<span>•</span>
														<span>{doc.size}</span>
													</div>
												</div>
											</div>
											<div className="flex gap-1">
												<button className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
													<Eye className="w-4 h-4" />
												</button>
												<button className="p-1.5 text-gray-600 hover:bg-gray-100 rounded-lg transition-all">
													<Download className="w-4 h-4" />
												</button>
											</div>
										</div>
									))}
								</div>

								{aircraft.documents.length === 0 && (
									<div className="text-center py-8">
										<div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
											<FileText className="w-6 h-6 text-gray-400" />
										</div>
										<p className="text-sm text-gray-600">
											No documents uploaded yet
										</p>
									</div>
								)}
							</div>
						)}
					</div>

					{/* Footer */}
					<div className="bg-gray-50 rounded-b-xl p-4 mt-px">
						<div className="flex items-center justify-between text-xs text-gray-500">
							<div>
								Aircraft ID: <span className="font-mono">{aircraft.ac_Id}</span>
							</div>
							{aircraft.uxUniversalCompanyId && (
								<div>
									Company ID:{" "}
									<span className="font-mono">
										{aircraft.uxUniversalCompanyId}
									</span>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

const InfoCard = ({ icon: Icon, label, value }) => (
	<div className="flex items-start gap-2 p-3 bg-gray-50 rounded-lg border border-gray-200">
		<div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
			<Icon className="w-4 h-4 text-blue-600" />
		</div>
		<div className="flex-1 min-w-0">
			<p className="text-xs text-gray-600 mb-0.5">{label}</p>
			<p className="text-sm font-bold text-gray-900">{value || "N/A"}</p>
		</div>
	</div>
);

export default AircraftDetails;
