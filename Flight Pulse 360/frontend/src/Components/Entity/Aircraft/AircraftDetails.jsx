import React, { useState, useEffect } from "react";
import {
	Plane,
	X,
	Edit,
	Trash2,
	ArrowLeft,
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
				<div className="bg-white rounded-2xl p-8">
					<div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
					<p className="mt-4 text-gray-600">Loading aircraft details...</p>
				</div>
			</div>
		);
	}

	const tabs = [
		{ id: "overview", name: "Overview", icon: Plane },
		{ id: "specifications", name: "Specifications", icon: Gauge },
		{ id: "documents", name: "Documents", icon: FileText },
		{ id: "maintenance", name: "Maintenance", icon: Shield },
	];

	return (
		<div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 overflow-y-auto">
			<div className="min-h-screen p-4 md:p-8">
				<div className="max-w-6xl mx-auto">
					{/* Header */}
					<div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-t-2xl shadow-2xl p-8 text-white">
						<div className="flex items-center justify-between mb-6">
							<button
								onClick={onClose}
								className="p-2 hover:bg-white/20 rounded-xl transition-all backdrop-blur-sm"
							>
								<ArrowLeft className="w-6 h-6" />
							</button>
							<div className="flex gap-2">
								<button
									onClick={() => onEdit(aircraft)}
									className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-xl transition-all backdrop-blur-sm flex items-center gap-2 font-semibold"
								>
									<Edit className="w-4 h-4" />
									Edit
								</button>
								<button
									onClick={() => onDelete(aircraft.ac_Id)}
									className="px-4 py-2 bg-red-500/80 hover:bg-red-600 rounded-xl transition-all backdrop-blur-sm flex items-center gap-2 font-semibold"
								>
									<Trash2 className="w-4 h-4" />
									Delete
								</button>
								<button
									onClick={onClose}
									className="p-2 hover:bg-white/20 rounded-xl transition-all backdrop-blur-sm"
								>
									<X className="w-6 h-6" />
								</button>
							</div>
						</div>

						<div className="flex items-center gap-6">
							<div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
								<Plane className="w-10 h-10 text-white transform -rotate-45" />
							</div>
							<div className="flex-1">
								<div className="flex items-center gap-3 mb-2">
									<h1 className="text-4xl font-bold">{aircraft.ac_TailNo}</h1>
									<span
										className={`px-3 py-1 rounded-full text-sm font-semibold ${
											aircraft.status === "Active"
												? "bg-green-500/20 text-green-100"
												: "bg-orange-500/20 text-orange-100"
										}`}
									>
										{aircraft.status}
									</span>
								</div>
								<p className="text-xl text-blue-100">
									{aircraft.ac_Manufacturer} {aircraft.ac_Model}
								</p>
								<p className="text-blue-200 text-sm mt-2">
									Year: {aircraft.ac_YearManufactured} • Type:{" "}
									{aircraft.ac_Type}
								</p>
							</div>
						</div>
					</div>

					{/* Quick Stats */}
					<div className="bg-white shadow-lg px-8 py-6 border-b">
						<div className="grid grid-cols-2 md:grid-cols-4 gap-6">
							<div className="text-center">
								<div className="text-3xl font-bold text-blue-600 mb-1">
									{aircraft.ac_PassengerCapacity}
								</div>
								<div className="text-sm text-gray-600">Passengers</div>
							</div>
							<div className="text-center">
								<div className="text-3xl font-bold text-green-600 mb-1">
									{aircraft.ac_MaxRange}
								</div>
								<div className="text-sm text-gray-600">Range (NM)</div>
							</div>
							<div className="text-center">
								<div className="text-3xl font-bold text-purple-600 mb-1">
									{aircraft.ac_CruiseSpeed}
								</div>
								<div className="text-sm text-gray-600">Speed (kts)</div>
							</div>
							<div className="text-center">
								<div className="text-3xl font-bold text-orange-600 mb-1">
									{aircraft.ac_HomeBase}
								</div>
								<div className="text-sm text-gray-600">Home Base</div>
							</div>
						</div>
					</div>

					{/* Tabs */}
					<div className="bg-white shadow-lg px-8 border-b">
						<div className="flex gap-1">
							{tabs.map((tab) => (
								<button
									key={tab.id}
									onClick={() => setActiveTab(tab.id)}
									className={`px-6 py-4 font-semibold transition-all flex items-center gap-2 ${
										activeTab === tab.id
											? "text-blue-600 border-b-3 border-blue-600"
											: "text-gray-600 hover:text-gray-900 border-b-3 border-transparent"
									}`}
								>
									<tab.icon className="w-5 h-5" />
									{tab.name}
								</button>
							))}
						</div>
					</div>

					{/* Tab Content */}
					<div className="bg-white rounded-b-2xl shadow-2xl p-8">
						{/* Overview Tab */}
						{activeTab === "overview" && (
							<div className="space-y-8">
								<div>
									<h3 className="text-xl font-bold text-gray-900 mb-4">
										Basic Information
									</h3>
									<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
										<h3 className="text-xl font-bold text-gray-900 mb-4">
											Additional Notes
										</h3>
										<div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
											<p className="text-gray-700 whitespace-pre-wrap">
												{aircraft.ac_Notes}
											</p>
										</div>
									</div>
								)}
							</div>
						)}

						{/* Specifications Tab */}
						{activeTab === "specifications" && (
							<div className="space-y-8">
								<div>
									<h3 className="text-xl font-bold text-gray-900 mb-4">
										Performance
									</h3>
									<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
									<h3 className="text-xl font-bold text-gray-900 mb-4">
										Registration & Insurance
									</h3>
									<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
										<div className="mt-6 bg-green-50 border-2 border-green-200 rounded-xl p-6">
											<h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
												<Shield className="w-5 h-5 text-green-600" />
												Insurance Details
											</h4>
											<p className="text-gray-700 whitespace-pre-wrap">
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
								<div className="flex items-center justify-between mb-6">
									<h3 className="text-xl font-bold text-gray-900">
										Aircraft Documents
									</h3>
									<button className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all flex items-center gap-2 font-semibold">
										<Download className="w-5 h-5" />
										Download All
									</button>
								</div>

								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									{aircraft.documents.map((doc) => (
										<div
											key={doc.id}
											className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border-2 border-gray-200 hover:border-blue-300 transition-all group"
										>
											<div className="flex items-center gap-3 flex-1">
												<div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
													<FileText className="w-6 h-6 text-blue-600" />
												</div>
												<div className="flex-1 min-w-0">
													<p className="font-semibold text-gray-900 truncate">
														{doc.name}
													</p>
													<div className="flex items-center gap-2 text-sm text-gray-500">
														<span>{doc.category}</span>
														<span>•</span>
														<span>{doc.size}</span>
													</div>
												</div>
											</div>
											<div className="flex gap-2">
												<button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
													<Eye className="w-5 h-5" />
												</button>
												<button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-all">
													<Download className="w-5 h-5" />
												</button>
											</div>
										</div>
									))}
								</div>

								{aircraft.documents.length === 0 && (
									<div className="text-center py-12">
										<div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
											<FileText className="w-8 h-8 text-gray-400" />
										</div>
										<p className="text-gray-600">No documents uploaded yet</p>
									</div>
								)}
							</div>
						)}

						{/* Maintenance Tab */}
						{activeTab === "maintenance" && (
							<div className="text-center py-12">
								<div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
									<Shield className="w-8 h-8 text-gray-400" />
								</div>
								<h3 className="text-xl font-bold text-gray-900 mb-2">
									Maintenance Logs
								</h3>
								<p className="text-gray-600 mb-6">
									Maintenance tracking coming soon
								</p>
								<button className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all font-semibold">
									Schedule Maintenance
								</button>
							</div>
						)}
					</div>

					{/* Footer */}
					<div className="bg-gray-50 rounded-b-2xl p-6 mt-px">
						<div className="flex items-center justify-between text-sm text-gray-500">
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
	<div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl border-2 border-gray-200">
		<div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
			<Icon className="w-5 h-5 text-blue-600" />
		</div>
		<div className="flex-1 min-w-0">
			<p className="text-sm text-gray-600 mb-1">{label}</p>
			<p className="text-base font-semibold text-gray-900">{value || "N/A"}</p>
		</div>
	</div>
);

export default AircraftDetails;
