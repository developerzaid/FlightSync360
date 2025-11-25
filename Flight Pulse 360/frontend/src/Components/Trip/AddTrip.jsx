import React, { useState } from "react";
import {
	X,
	Plane,
	Plus,
	ChevronRight,
	ChevronLeft,
	Save,
	Calendar,
	MapPin,
	Building2,
	Users,
	Fuel,
	Settings,
	FileCheck,
	User,
	Hotel,
} from "lucide-react";

// DUMMY DATA
const DUMMY_AIRCRAFT = [
	{
		ac_id: "AC001",
		ac_registrationNumber: "N123AB",
		ac_model: "Gulfstream G650",
		ac_type: "Heavy Jet",
	},
	{
		ac_id: "AC002",
		ac_registrationNumber: "N456CD",
		ac_model: "Bombardier Global 7500",
		ac_type: "Heavy Jet",
	},
	{
		ac_id: "AC003",
		ac_registrationNumber: "N789EF",
		ac_model: "Cessna Citation X",
		ac_type: "Midsize Jet",
	},
	{
		ac_id: "AC004",
		ac_registrationNumber: "N321GH",
		ac_model: "Embraer Phenom 300",
		ac_type: "Light Jet",
	},
	{
		ac_id: "AC005",
		ac_registrationNumber: "N654IJ",
		ac_model: "Dassault Falcon 7X",
		ac_type: "Heavy Jet",
	},
];

const DUMMY_CLIENTS = [
	{
		cl_id: "CL001",
		cl_name: "Global Ventures LLC",
		cl_email: "contact@globalventures.com",
		cl_phone: "+1-555-0101",
	},
	{
		cl_id: "CL002",
		cl_name: "Apex Industries",
		cl_email: "info@apex.com",
		cl_phone: "+1-555-0102",
	},
	{
		cl_id: "CL003",
		cl_name: "Summit Corporation",
		cl_email: "hello@summit.com",
		cl_phone: "+1-555-0103",
	},
	{
		cl_id: "CL004",
		cl_name: "Elite Logistics",
		cl_email: "ops@elitelogistics.com",
		cl_phone: "+1-555-0104",
	},
	{
		cl_id: "CL005",
		cl_name: "Nexus Holdings",
		cl_email: "admin@nexus.com",
		cl_phone: "+1-555-0105",
	},
];

const DUMMY_CREW = [
	{
		cr_id: "CR001",
		cr_name: "Captain James Wilson",
		cr_type: "Captain",
		cr_licenseNo: "ATP-12345",
	},
	{
		cr_id: "CR002",
		cr_name: "First Officer Sarah Chen",
		cr_type: "First Officer",
		cr_licenseNo: "ATP-12346",
	},
	{
		cr_id: "CR003",
		cr_name: "Captain Michael Rodriguez",
		cr_type: "Captain",
		cr_licenseNo: "CPL-12347",
	},
	{
		cr_id: "CR004",
		cr_name: "Flight Attendant Emily Davis",
		cr_type: "Flight Attendant",
		cr_licenseNo: "FA-12348",
	},
	{
		cr_id: "CR005",
		cr_name: "First Officer Robert Martinez",
		cr_type: "First Officer",
		cr_licenseNo: "FE-12349",
	},
	{
		cr_id: "CR006",
		cr_name: "Flight Attendant Jennifer Lee",
		cr_type: "Flight Attendant",
		cr_licenseNo: "FA-12350",
	},
];

const DUMMY_VENDORS = [
	{ vn_id: "VN001", vn_name: "World Fuel Services", vn_type: "Fuel" },
	{
		vn_id: "VN002",
		vn_name: "Signature Flight Support",
		vn_type: "Ground Handling",
	},
	{ vn_id: "VN003", vn_name: "Universal Aviation", vn_type: "Ground Handling" },
	{ vn_id: "VN004", vn_name: "Jeppesen Permit Services", vn_type: "Permits" },
	{ vn_id: "VN005", vn_name: "Marriott Hotels", vn_type: "Accommodation" },
];

const AddTrip = ({ isOpen, onClose, onSave, companyId = "COMP-123" }) => {
	const [currentStep, setCurrentStep] = useState(1);
	const [loading, setLoading] = useState(false);

	// Use dummy data
	const availableAircraft = DUMMY_AIRCRAFT;
	const availableClients = DUMMY_CLIENTS;
	const availableCrew = DUMMY_CREW;
	const availableVendors = DUMMY_VENDORS;

	// Trip data with some pre-filled dummy data
	const [tripData, setTripData] = useState({
		uxCompanyId: companyId,
		mt_tripType: "SINGLE_LEG",
		mt_purpose: "BUSINESS",
		mt_status: "DRAFT",
		mt_fromAirport: "OMDB",
		mt_toAirport: "EGLL",
		mt_scheduledDepartureUtc: "2025-12-15T08:00",
		mt_scheduledArrivalUtc: "2025-12-15T13:30",
		selectedAircraftId: "AC001",
		selectedClientId: "CL001",
		selectedCrewIds: ["CR001", "CR002"],
		mt_additionalNotes: "VIP client - Priority handling required",
	});

	// Selected services with some pre-filled
	const [services, setServices] = useState({
		fuel: {
			enabled: true,
			quantity: "5000",
			unit: "LITERS",
			type: "JET_A1",
			vendorId: "VN001",
			notes: "Request competitive pricing",
		},
		groundHandling: {
			enabled: true,
			parkingPosition: "Stand 12A",
			vendorId: "VN002",
			notes: "GPU and stairs required",
		},
		permits: {
			enabled: false,
			landingPermit: "",
			overflightCountries: "",
			vendorId: "",
		},
		crewConcierge: {
			enabled: true,
			hotelName: "Marriott Airport Hotel",
			rooms: "2",
			transport: "VAN",
			vendorId: "VN005",
		},
		passengerConcierge: {
			enabled: false,
			hotelName: "",
			transport: "SEDAN",
			destination: "",
			vendorId: "",
		},
	});

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setTripData({ ...tripData, [name]: value });
	};

	const handleServiceToggle = (service) => {
		setServices({
			...services,
			[service]: { ...services[service], enabled: !services[service].enabled },
		});
	};

	const handleServiceChange = (service, field, value) => {
		setServices({
			...services,
			[service]: { ...services[service], [field]: value },
		});
	};

	const handleCrewSelect = (crewId) => {
		const current = tripData.selectedCrewIds;
		if (current.includes(crewId)) {
			setTripData({
				...tripData,
				selectedCrewIds: current.filter((id) => id !== crewId),
			});
		} else {
			setTripData({ ...tripData, selectedCrewIds: [...current, crewId] });
		}
	};

	const handleNext = () => {
		if (currentStep < 3) {
			setCurrentStep(currentStep + 1);
		}
	};

	const handleBack = () => {
		if (currentStep > 1) {
			setCurrentStep(currentStep - 1);
		}
	};

	const handleSubmit = async () => {
		setLoading(true);
		try {
			const enabledServices = Object.entries(services)
				.filter(([_, data]) => data.enabled)
				.map(([type, data]) => ({ type, ...data }));

			const completeTripData = { ...tripData, services: enabledServices };

			console.log("Trip Data to Save:", completeTripData);

			if (onSave) {
				await onSave(completeTripData);
			}

			alert(
				"✅ Trip created successfully!\n\nTrip: OMDB → EGLL\nAircraft: N123AB\nClient: Global Ventures LLC"
			);
			onClose();
		} catch (error) {
			console.error("Error saving trip:", error);
			alert("❌ Error creating trip. Please try again.");
		} finally {
			setLoading(false);
		}
	};

	const getSelectedAircraft = () => {
		return availableAircraft.find(
			(a) => a.ac_id === tripData.selectedAircraftId
		);
	};

	const getSelectedClient = () => {
		return availableClients.find((c) => c.cl_id === tripData.selectedClientId);
	};

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
			<div className="w-full max-w-6xl bg-white rounded-2xl shadow-2xl max-h-[90vh] flex flex-col">
				{/* Header */}
				<div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6 flex items-center justify-between rounded-t-2xl">
					<div className="flex items-center gap-4">
						<div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur">
							<Plane className="w-7 h-7 text-white" />
						</div>
						<div>
							<h2 className="text-2xl font-bold text-white">Create New Trip</h2>
							<p className="text-blue-100 mt-1">
								Step {currentStep} of 3 -{" "}
								{currentStep === 1
									? "Trip Details"
									: currentStep === 2
									? "Select Services"
									: "Service Configuration"}
							</p>
						</div>
					</div>
					<button
						onClick={onClose}
						className="text-white hover:bg-white/20 p-2 rounded-lg transition-all"
					>
						<X className="w-6 h-6" />
					</button>
				</div>

				{/* Progress Bar */}
				<div className="h-2 bg-gray-200">
					<div
						className="h-full bg-blue-600 transition-all duration-300 ease-out"
						style={{ width: `${(currentStep / 3) * 100}%` }}
					/>
				</div>

				{/* Trip Summary Bar (Always Visible) */}
				<div className="bg-gradient-to-r from-blue-50 via-white to-blue-50 border-b-2 border-blue-100 px-8 py-4">
					<div className="flex flex-wrap items-center gap-4">
						{tripData.mt_fromAirport && tripData.mt_toAirport && (
							<div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg border-2 border-blue-300 shadow-sm">
								<MapPin className="w-5 h-5 text-blue-600" />
								<span className="font-bold text-gray-900 text-base">
									{tripData.mt_fromAirport} → {tripData.mt_toAirport}
								</span>
							</div>
						)}
						{getSelectedAircraft() && (
							<div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg border-2 border-green-300 shadow-sm">
								<Plane className="w-5 h-5 text-green-600" />
								<span className="text-gray-700">
									<strong className="text-gray-900">
										{getSelectedAircraft().ac_registrationNumber}
									</strong>
									<span className="text-gray-500 ml-1">
										• {getSelectedAircraft().ac_model}
									</span>
								</span>
							</div>
						)}
						{getSelectedClient() && (
							<div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg border-2 border-purple-300 shadow-sm">
								<Building2 className="w-5 h-5 text-purple-600" />
								<span className="font-semibold text-gray-900">
									{getSelectedClient().cl_name}
								</span>
							</div>
						)}
						{tripData.selectedCrewIds.length > 0 && (
							<div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg border-2 border-orange-300 shadow-sm">
								<Users className="w-5 h-5 text-orange-600" />
								<span className="text-gray-700">
									<strong className="text-gray-900">
										{tripData.selectedCrewIds.length}
									</strong>{" "}
									Crew Members
								</span>
							</div>
						)}
					</div>
				</div>

				{/* Content Area - Scrollable */}
				<div className="flex-1 overflow-y-auto px-8 py-6">
					{/* STEP 1: Trip Info & Entities */}
					{currentStep === 1 && (
						<div className="space-y-6">
							{/* Basic Trip Information */}
							<div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 border-2 border-gray-200">
								<h3 className="text-lg font-bold text-gray-900 mb-5 flex items-center gap-3">
									<div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
										<Calendar className="w-5 h-5 text-blue-600" />
									</div>
									Basic Trip Information
								</h3>

								<div className="grid grid-cols-1 md:grid-cols-3 gap-5">
									<div>
										<label className="block text-sm font-semibold text-gray-700 mb-2">
											Trip Type <span className="text-red-500">*</span>
										</label>
										<select
											name="mt_tripType"
											value={tripData.mt_tripType}
											onChange={handleInputChange}
											className="w-full px-4 py-3 text-base border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
										>
											<option value="SINGLE_LEG">Single Leg</option>
											<option value="MULTI_LEG">Multi Leg</option>
										</select>
									</div>

									<div>
										<label className="block text-sm font-semibold text-gray-700 mb-2">
											Purpose <span className="text-red-500">*</span>
										</label>
										<select
											name="mt_purpose"
											value={tripData.mt_purpose}
											onChange={handleInputChange}
											className="w-full px-4 py-3 text-base border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
										>
											<option value="BUSINESS">Business</option>
											<option value="PERSONAL">Personal</option>
											<option value="EVAC">Evacuation</option>
											<option value="MEDICAL">Medical</option>
											<option value="CHARTER">Charter</option>
										</select>
									</div>

									<div>
										<label className="block text-sm font-semibold text-gray-700 mb-2">
											Status <span className="text-red-500">*</span>
										</label>
										<select
											name="mt_status"
											value={tripData.mt_status}
											onChange={handleInputChange}
											className="w-full px-4 py-3 text-base border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
										>
											<option value="DRAFT">Draft</option>
											<option value="PLANNED">Planned</option>
											<option value="CONFIRMED">Confirmed</option>
										</select>
									</div>
								</div>
							</div>

							{/* Route & Schedule */}
							<div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 border-2 border-gray-200">
								<h3 className="text-lg font-bold text-gray-900 mb-5 flex items-center gap-3">
									<div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
										<MapPin className="w-5 h-5 text-blue-600" />
									</div>
									Route & Schedule
								</h3>

								<div className="grid grid-cols-1 md:grid-cols-2 gap-5">
									<div>
										<label className="block text-sm font-semibold text-gray-700 mb-2">
											Departure Airport (ICAO){" "}
											<span className="text-red-500">*</span>
										</label>
										<input
											type="text"
											name="mt_fromAirport"
											value={tripData.mt_fromAirport}
											onChange={handleInputChange}
											placeholder="e.g., OMDB"
											className="w-full px-4 py-3 text-base border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
										/>
										<p className="text-xs text-gray-500 mt-1">
											Dubai International Airport
										</p>
									</div>

									<div>
										<label className="block text-sm font-semibold text-gray-700 mb-2">
											Arrival Airport (ICAO){" "}
											<span className="text-red-500">*</span>
										</label>
										<input
											type="text"
											name="mt_toAirport"
											value={tripData.mt_toAirport}
											onChange={handleInputChange}
											placeholder="e.g., EGLL"
											className="w-full px-4 py-3 text-base border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
										/>
										<p className="text-xs text-gray-500 mt-1">
											London Heathrow Airport
										</p>
									</div>

									<div>
										<label className="block text-sm font-semibold text-gray-700 mb-2">
											Departure Date & Time (UTC){" "}
											<span className="text-red-500">*</span>
										</label>
										<input
											type="datetime-local"
											name="mt_scheduledDepartureUtc"
											value={tripData.mt_scheduledDepartureUtc}
											onChange={handleInputChange}
											className="w-full px-4 py-3 text-base border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
										/>
									</div>

									<div>
										<label className="block text-sm font-semibold text-gray-700 mb-2">
											Arrival Date & Time (UTC)
										</label>
										<input
											type="datetime-local"
											name="mt_scheduledArrivalUtc"
											value={tripData.mt_scheduledArrivalUtc}
											onChange={handleInputChange}
											className="w-full px-4 py-3 text-base border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
										/>
									</div>
								</div>
							</div>

							{/* Aircraft Selection */}
							<div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-300">
								<div className="flex items-center justify-between mb-5">
									<h3 className="text-lg font-bold text-gray-900 flex items-center gap-3">
										<div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
											<Plane className="w-5 h-5 text-white" />
										</div>
										Select Aircraft
									</h3>
									<button
										type="button"
										onClick={() =>
											alert("Add New Aircraft - This would open a popup form")
										}
										className="px-4 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all flex items-center gap-2 font-semibold shadow-md"
									>
										<Plus className="w-4 h-4" />
										Add New Aircraft
									</button>
								</div>

								<select
									value={tripData.selectedAircraftId}
									onChange={(e) =>
										setTripData({
											...tripData,
											selectedAircraftId: e.target.value,
										})
									}
									className="w-full px-4 py-3 text-base border-2 border-green-400 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all bg-white font-medium"
								>
									<option value="">-- Select Aircraft --</option>
									{availableAircraft.map((ac) => (
										<option key={ac.ac_id} value={ac.ac_id}>
											{ac.ac_registrationNumber} - {ac.ac_model} ({ac.ac_type})
										</option>
									))}
								</select>

								{getSelectedAircraft() && (
									<div className="mt-3 p-3 bg-white rounded-lg border border-green-200">
										<p className="text-sm text-gray-600">
											<strong>Selected:</strong>{" "}
											{getSelectedAircraft().ac_registrationNumber} •{" "}
											{getSelectedAircraft().ac_model} •{" "}
											{getSelectedAircraft().ac_type}
										</p>
									</div>
								)}
							</div>

							{/* Client Selection */}
							<div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl p-6 border-2 border-purple-300">
								<div className="flex items-center justify-between mb-5">
									<h3 className="text-lg font-bold text-gray-900 flex items-center gap-3">
										<div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
											<Building2 className="w-5 h-5 text-white" />
										</div>
										Select Client
									</h3>
									<button
										type="button"
										onClick={() =>
											alert("Add New Client - This would open a popup form")
										}
										className="px-4 py-2.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all flex items-center gap-2 font-semibold shadow-md"
									>
										<Plus className="w-4 h-4" />
										Add New Client
									</button>
								</div>

								<select
									value={tripData.selectedClientId}
									onChange={(e) =>
										setTripData({
											...tripData,
											selectedClientId: e.target.value,
										})
									}
									className="w-full px-4 py-3 text-base border-2 border-purple-400 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all bg-white font-medium"
								>
									<option value="">-- Select Client --</option>
									{availableClients.map((cl) => (
										<option key={cl.cl_id} value={cl.cl_id}>
											{cl.cl_name} - {cl.cl_email}
										</option>
									))}
								</select>

								{getSelectedClient() && (
									<div className="mt-3 p-3 bg-white rounded-lg border border-purple-200">
										<p className="text-sm text-gray-600">
											<strong>Selected:</strong> {getSelectedClient().cl_name} •{" "}
											{getSelectedClient().cl_email} •{" "}
											{getSelectedClient().cl_phone}
										</p>
									</div>
								)}
							</div>

							{/* Crew Selection */}
							<div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-6 border-2 border-orange-300">
								<div className="flex items-center justify-between mb-5">
									<h3 className="text-lg font-bold text-gray-900 flex items-center gap-3">
										<div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
											<Users className="w-5 h-5 text-white" />
										</div>
										Select Crew Members
									</h3>
									<button
										type="button"
										onClick={() =>
											alert(
												"Add New Crew Member - This would open a popup form"
											)
										}
										className="px-4 py-2.5 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-all flex items-center gap-2 font-semibold shadow-md"
									>
										<Plus className="w-4 h-4" />
										Add New Crew
									</button>
								</div>

								<div className="bg-white border-2 border-orange-300 rounded-lg p-4 max-h-64 overflow-y-auto">
									<div className="space-y-2">
										{availableCrew.map((crew) => (
											<label
												key={crew.cr_id}
												className={`flex items-center gap-3 p-4 rounded-lg cursor-pointer transition-all border-2 ${
													tripData.selectedCrewIds.includes(crew.cr_id)
														? "bg-orange-100 border-orange-400"
														: "bg-gray-50 border-gray-200 hover:border-orange-300 hover:bg-orange-50"
												}`}
											>
												<input
													type="checkbox"
													checked={tripData.selectedCrewIds.includes(
														crew.cr_id
													)}
													onChange={() => handleCrewSelect(crew.cr_id)}
													className="w-5 h-5 text-orange-600 rounded focus:ring-2 focus:ring-orange-500"
												/>
												<div className="flex-1">
													<p className="font-bold text-gray-900">
														{crew.cr_name}
													</p>
													<p className="text-sm text-gray-600">
														{crew.cr_type} • License: {crew.cr_licenseNo}
													</p>
												</div>
											</label>
										))}
									</div>
								</div>

								<p className="text-sm text-gray-600 mt-3">
									<strong>{tripData.selectedCrewIds.length}</strong> crew
									member(s) selected
								</p>
							</div>

							{/* Additional Notes */}
							<div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 border-2 border-gray-200">
								<h3 className="text-lg font-bold text-gray-900 mb-4">
									Additional Notes
								</h3>
								<textarea
									name="mt_additionalNotes"
									value={tripData.mt_additionalNotes}
									onChange={handleInputChange}
									rows="4"
									placeholder="Any special requirements, notes, or instructions..."
									className="w-full px-4 py-3 text-base border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
								/>
							</div>
						</div>
					)}

					{/* STEP 2: Service Selection */}
					{currentStep === 2 && (
						<div className="space-y-5">
							<div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-5">
								<p className="text-blue-900 font-medium">
									ℹ️ Select the services you need for this trip. You'll
									configure details in the next step.
								</p>
							</div>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-5">
								{/* Fuel Service */}
								<div
									onClick={() => handleServiceToggle("fuel")}
									className={`p-6 rounded-xl border-2 cursor-pointer transition-all ${
										services.fuel.enabled
											? "border-blue-500 bg-blue-50 shadow-lg scale-105"
											: "border-gray-300 bg-white hover:border-blue-400 hover:shadow-md hover:scale-102"
									}`}
								>
									<div className="flex items-start gap-4">
										<div
											className={`w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 ${
												services.fuel.enabled
													? "bg-blue-600 shadow-md"
													: "bg-gray-100"
											}`}
										>
											<Fuel
												className={`w-7 h-7 ${
													services.fuel.enabled ? "text-white" : "text-gray-600"
												}`}
											/>
										</div>
										<div className="flex-1">
											<h4 className="text-lg font-bold text-gray-900 mb-2">
												Fuel Service
											</h4>
											<p className="text-sm text-gray-600">
												Aircraft refueling, fuel type selection, and quantity
												management
											</p>
										</div>
										{services.fuel.enabled && (
											<div className="w-7 h-7 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
												<svg
													className="w-5 h-5 text-white"
													fill="none"
													viewBox="0 0 24 24"
													stroke="currentColor"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth={3}
														d="M5 13l4 4L19 7"
													/>
												</svg>
											</div>
										)}
									</div>
								</div>

								{/* Ground Handling */}
								<div
									onClick={() => handleServiceToggle("groundHandling")}
									className={`p-6 rounded-xl border-2 cursor-pointer transition-all ${
										services.groundHandling.enabled
											? "border-green-500 bg-green-50 shadow-lg scale-105"
											: "border-gray-300 bg-white hover:border-green-400 hover:shadow-md hover:scale-102"
									}`}
								>
									<div className="flex items-start gap-4">
										<div
											className={`w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 ${
												services.groundHandling.enabled
													? "bg-green-600 shadow-md"
													: "bg-gray-100"
											}`}
										>
											<Settings
												className={`w-7 h-7 ${
													services.groundHandling.enabled
														? "text-white"
														: "text-gray-600"
												}`}
											/>
										</div>
										<div className="flex-1">
											<h4 className="text-lg font-bold text-gray-900 mb-2">
												Ground Handling
											</h4>
											<p className="text-sm text-gray-600">
												Parking, ramp services, ground support equipment, and
												assistance
											</p>
										</div>
										{services.groundHandling.enabled && (
											<div className="w-7 h-7 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
												<svg
													className="w-5 h-5 text-white"
													fill="none"
													viewBox="0 0 24 24"
													stroke="currentColor"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth={3}
														d="M5 13l4 4L19 7"
													/>
												</svg>
											</div>
										)}
									</div>
								</div>

								{/* Permits & Clearance */}
								<div
									onClick={() => handleServiceToggle("permits")}
									className={`p-6 rounded-xl border-2 cursor-pointer transition-all ${
										services.permits.enabled
											? "border-purple-500 bg-purple-50 shadow-lg scale-105"
											: "border-gray-300 bg-white hover:border-purple-400 hover:shadow-md hover:scale-102"
									}`}
								>
									<div className="flex items-start gap-4">
										<div
											className={`w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 ${
												services.permits.enabled
													? "bg-purple-600 shadow-md"
													: "bg-gray-100"
											}`}
										>
											<FileCheck
												className={`w-7 h-7 ${
													services.permits.enabled
														? "text-white"
														: "text-gray-600"
												}`}
											/>
										</div>
										<div className="flex-1">
											<h4 className="text-lg font-bold text-gray-900 mb-2">
												Permits & Clearance
											</h4>
											<p className="text-sm text-gray-600">
												Landing permits, overflight clearances, and diplomatic
												approvals
											</p>
										</div>
										{services.permits.enabled && (
											<div className="w-7 h-7 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
												<svg
													className="w-5 h-5 text-white"
													fill="none"
													viewBox="0 0 24 24"
													stroke="currentColor"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth={3}
														d="M5 13l4 4L19 7"
													/>
												</svg>
											</div>
										)}
									</div>
								</div>

								{/* Crew Concierge */}
								<div
									onClick={() => handleServiceToggle("crewConcierge")}
									className={`p-6 rounded-xl border-2 cursor-pointer transition-all ${
										services.crewConcierge.enabled
											? "border-orange-500 bg-orange-50 shadow-lg scale-105"
											: "border-gray-300 bg-white hover:border-orange-400 hover:shadow-md hover:scale-102"
									}`}
								>
									<div className="flex items-start gap-4">
										<div
											className={`w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 ${
												services.crewConcierge.enabled
													? "bg-orange-600 shadow-md"
													: "bg-gray-100"
											}`}
										>
											<User
												className={`w-7 h-7 ${
													services.crewConcierge.enabled
														? "text-white"
														: "text-gray-600"
												}`}
											/>
										</div>
										<div className="flex-1">
											<h4 className="text-lg font-bold text-gray-900 mb-2">
												Crew Concierge
											</h4>
											<p className="text-sm text-gray-600">
												Hotel accommodations, transportation, and crew support
												services
											</p>
										</div>
										{services.crewConcierge.enabled && (
											<div className="w-7 h-7 bg-orange-600 rounded-full flex items-center justify-center flex-shrink-0">
												<svg
													className="w-5 h-5 text-white"
													fill="none"
													viewBox="0 0 24 24"
													stroke="currentColor"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth={3}
														d="M5 13l4 4L19 7"
													/>
												</svg>
											</div>
										)}
									</div>
								</div>

								{/* Passenger Concierge */}
								<div
									onClick={() => handleServiceToggle("passengerConcierge")}
									className={`p-6 rounded-xl border-2 cursor-pointer transition-all ${
										services.passengerConcierge.enabled
											? "border-pink-500 bg-pink-50 shadow-lg scale-105"
											: "border-gray-300 bg-white hover:border-pink-400 hover:shadow-md hover:scale-102"
									}`}
								>
									<div className="flex items-start gap-4">
										<div
											className={`w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 ${
												services.passengerConcierge.enabled
													? "bg-pink-600 shadow-md"
													: "bg-gray-100"
											}`}
										>
											<Hotel
												className={`w-7 h-7 ${
													services.passengerConcierge.enabled
														? "text-white"
														: "text-gray-600"
												}`}
											/>
										</div>
										<div className="flex-1">
											<h4 className="text-lg font-bold text-gray-900 mb-2">
												Passenger Concierge
											</h4>
											<p className="text-sm text-gray-600">
												VIP transportation, luxury hotels, and premium passenger
												services
											</p>
										</div>
										{services.passengerConcierge.enabled && (
											<div className="w-7 h-7 bg-pink-600 rounded-full flex items-center justify-center flex-shrink-0">
												<svg
													className="w-5 h-5 text-white"
													fill="none"
													viewBox="0 0 24 24"
													stroke="currentColor"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth={3}
														d="M5 13l4 4L19 7"
													/>
												</svg>
											</div>
										)}
									</div>
								</div>
							</div>

							{/* Services Summary */}
							<div className="bg-gray-50 border-2 border-gray-200 rounded-xl p-5">
								<h4 className="font-bold text-gray-900 mb-2">
									Selected Services Summary:
								</h4>
								<div className="flex flex-wrap gap-2">
									{Object.entries(services).filter(([_, data]) => data.enabled)
										.length === 0 ? (
										<p className="text-gray-600">No services selected yet</p>
									) : (
										Object.entries(services)
											.filter(([_, data]) => data.enabled)
											.map(([key, _]) => (
												<span
													key={key}
													className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold"
												>
													{key === "fuel"
														? "Fuel Service"
														: key === "groundHandling"
														? "Ground Handling"
														: key === "permits"
														? "Permits & Clearance"
														: key === "crewConcierge"
														? "Crew Concierge"
														: "Passenger Concierge"}
												</span>
											))
									)}
								</div>
							</div>
						</div>
					)}

					{/* STEP 3: Service Details */}
					{currentStep === 3 && (
						<div className="space-y-6">
							{/* Fuel Service Details */}
							{services.fuel.enabled && (
								<div className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-6 border-2 border-blue-300">
									<h3 className="text-lg font-bold text-gray-900 mb-5 flex items-center gap-3">
										<div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
											<Fuel className="w-5 h-5 text-white" />
										</div>
										Fuel Service Configuration
									</h3>
									<div className="grid grid-cols-1 md:grid-cols-2 gap-5">
										<div>
											<label className="block text-sm font-semibold text-gray-700 mb-2">
												Fuel Quantity
											</label>
											<input
												type="number"
												value={services.fuel.quantity}
												onChange={(e) =>
													handleServiceChange(
														"fuel",
														"quantity",
														e.target.value
													)
												}
												placeholder="e.g., 5000"
												className="w-full px-4 py-3 text-base border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all"
											/>
										</div>

										<div>
											<label className="block text-sm font-semibold text-gray-700 mb-2">
												Measurement Unit
											</label>
											<select
												value={services.fuel.unit}
												onChange={(e) =>
													handleServiceChange("fuel", "unit", e.target.value)
												}
												className="w-full px-4 py-3 text-base border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all"
											>
												<option value="LITERS">Liters</option>
												<option value="GALLONS">US Gallons</option>
												<option value="KG">Kilograms</option>
											</select>
										</div>

										<div>
											<label className="block text-sm font-semibold text-gray-700 mb-2">
												Fuel Type
											</label>
											<select
												value={services.fuel.type}
												onChange={(e) =>
													handleServiceChange("fuel", "type", e.target.value)
												}
												className="w-full px-4 py-3 text-base border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all"
											>
												<option value="JET_A1">Jet A-1</option>
												<option value="JET_A">Jet A</option>
												<option value="AVGAS">AvGas 100LL</option>
											</select>
										</div>

										<div>
											<label className="block text-sm font-semibold text-gray-700 mb-2">
												Fuel Vendor
											</label>
											<div className="flex gap-2">
												<select
													value={services.fuel.vendorId}
													onChange={(e) =>
														handleServiceChange(
															"fuel",
															"vendorId",
															e.target.value
														)
													}
													className="flex-1 px-4 py-3 text-base border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all"
												>
													<option value="">-- Select Vendor --</option>
													{availableVendors
														.filter((v) => v.vn_type === "Fuel")
														.map((v) => (
															<option key={v.vn_id} value={v.vn_id}>
																{v.vn_name}
															</option>
														))}
												</select>
												<button
													type="button"
													onClick={() => alert("Add New Vendor")}
													className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
												>
													<Plus className="w-5 h-5" />
												</button>
											</div>
										</div>

										<div className="md:col-span-2">
											<label className="block text-sm font-semibold text-gray-700 mb-2">
												Additional Notes
											</label>
											<textarea
												value={services.fuel.notes}
												onChange={(e) =>
													handleServiceChange("fuel", "notes", e.target.value)
												}
												rows="2"
												placeholder="Special requests, pricing notes, etc..."
												className="w-full px-4 py-3 text-base border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all"
											/>
										</div>
									</div>
								</div>
							)}

							{/* Ground Handling Details */}
							{services.groundHandling.enabled && (
								<div className="bg-gradient-to-br from-green-50 to-white rounded-xl p-6 border-2 border-green-300">
									<h3 className="text-lg font-bold text-gray-900 mb-5 flex items-center gap-3">
										<div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
											<Settings className="w-5 h-5 text-white" />
										</div>
										Ground Handling Configuration
									</h3>
									<div className="grid grid-cols-1 md:grid-cols-2 gap-5">
										<div>
											<label className="block text-sm font-semibold text-gray-700 mb-2">
												Parking Position
											</label>
											<input
												type="text"
												value={services.groundHandling.parkingPosition}
												onChange={(e) =>
													handleServiceChange(
														"groundHandling",
														"parkingPosition",
														e.target.value
													)
												}
												placeholder="e.g., Stand 12A, Gate B5"
												className="w-full px-4 py-3 text-base border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 transition-all"
											/>
										</div>

										<div>
											<label className="block text-sm font-semibold text-gray-700 mb-2">
												Ground Handling Vendor
											</label>
											<div className="flex gap-2">
												<select
													value={services.groundHandling.vendorId}
													onChange={(e) =>
														handleServiceChange(
															"groundHandling",
															"vendorId",
															e.target.value
														)
													}
													className="flex-1 px-4 py-3 text-base border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 transition-all"
												>
													<option value="">-- Select Vendor --</option>
													{availableVendors
														.filter((v) => v.vn_type === "Ground Handling")
														.map((v) => (
															<option key={v.vn_id} value={v.vn_id}>
																{v.vn_name}
															</option>
														))}
												</select>
												<button
													type="button"
													onClick={() => alert("Add New Vendor")}
													className="px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
												>
													<Plus className="w-5 h-5" />
												</button>
											</div>
										</div>

										<div className="md:col-span-2">
											<label className="block text-sm font-semibold text-gray-700 mb-2">
												Service Notes
											</label>
											<textarea
												value={services.groundHandling.notes}
												onChange={(e) =>
													handleServiceChange(
														"groundHandling",
														"notes",
														e.target.value
													)
												}
												rows="2"
												placeholder="GPU required, stairs needed, special equipment, etc..."
												className="w-full px-4 py-3 text-base border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 transition-all"
											/>
										</div>
									</div>
								</div>
							)}

							{/* Permits Details */}
							{services.permits.enabled && (
								<div className="bg-gradient-to-br from-purple-50 to-white rounded-xl p-6 border-2 border-purple-300">
									<h3 className="text-lg font-bold text-gray-900 mb-5 flex items-center gap-3">
										<div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
											<FileCheck className="w-5 h-5 text-white" />
										</div>
										Permits & Clearance Configuration
									</h3>
									<div className="grid grid-cols-1 md:grid-cols-2 gap-5">
										<div>
											<label className="block text-sm font-semibold text-gray-700 mb-2">
												Landing Permit Number
											</label>
											<input
												type="text"
												value={services.permits.landingPermit}
												onChange={(e) =>
													handleServiceChange(
														"permits",
														"landingPermit",
														e.target.value
													)
												}
												placeholder="e.g., LP-2025-12345"
												className="w-full px-4 py-3 text-base border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 transition-all"
											/>
										</div>

										<div>
											<label className="block text-sm font-semibold text-gray-700 mb-2">
												Overflight Countries (ICAO)
											</label>
											<input
												type="text"
												value={services.permits.overflightCountries}
												onChange={(e) =>
													handleServiceChange(
														"permits",
														"overflightCountries",
														e.target.value
													)
												}
												placeholder="e.g., SA, AE, OM, IR"
												className="w-full px-4 py-3 text-base border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 transition-all"
											/>
										</div>
									</div>
								</div>
							)}

							{/* Crew Concierge Details */}
							{services.crewConcierge.enabled && (
								<div className="bg-gradient-to-br from-orange-50 to-white rounded-xl p-6 border-2 border-orange-300">
									<h3 className="text-lg font-bold text-gray-900 mb-5 flex items-center gap-3">
										<div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center">
											<User className="w-5 h-5 text-white" />
										</div>
										Crew Concierge Configuration
									</h3>
									<div className="grid grid-cols-1 md:grid-cols-3 gap-5">
										<div>
											<label className="block text-sm font-semibold text-gray-700 mb-2">
												Hotel Name
											</label>
											<input
												type="text"
												value={services.crewConcierge.hotelName}
												onChange={(e) =>
													handleServiceChange(
														"crewConcierge",
														"hotelName",
														e.target.value
													)
												}
												placeholder="e.g., Marriott Airport"
												className="w-full px-4 py-3 text-base border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 transition-all"
											/>
										</div>

										<div>
											<label className="block text-sm font-semibold text-gray-700 mb-2">
												Number of Rooms
											</label>
											<input
												type="number"
												value={services.crewConcierge.rooms}
												onChange={(e) =>
													handleServiceChange(
														"crewConcierge",
														"rooms",
														e.target.value
													)
												}
												placeholder="e.g., 2"
												className="w-full px-4 py-3 text-base border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 transition-all"
											/>
										</div>

										<div>
											<label className="block text-sm font-semibold text-gray-700 mb-2">
												Transport Type
											</label>
											<select
												value={services.crewConcierge.transport}
												onChange={(e) =>
													handleServiceChange(
														"crewConcierge",
														"transport",
														e.target.value
													)
												}
												className="w-full px-4 py-3 text-base border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 transition-all"
											>
												<option value="VAN">Van</option>
												<option value="SEDAN">Sedan</option>
												<option value="BUS">Bus</option>
											</select>
										</div>
									</div>
								</div>
							)}

							{/* Passenger Concierge Details */}
							{services.passengerConcierge.enabled && (
								<div className="bg-gradient-to-br from-pink-50 to-white rounded-xl p-6 border-2 border-pink-300">
									<h3 className="text-lg font-bold text-gray-900 mb-5 flex items-center gap-3">
										<div className="w-8 h-8 bg-pink-600 rounded-lg flex items-center justify-center">
											<Hotel className="w-5 h-5 text-white" />
										</div>
										Passenger Concierge Configuration
									</h3>
									<div className="grid grid-cols-1 md:grid-cols-3 gap-5">
										<div>
											<label className="block text-sm font-semibold text-gray-700 mb-2">
												Hotel Name
											</label>
											<input
												type="text"
												value={services.passengerConcierge.hotelName}
												onChange={(e) =>
													handleServiceChange(
														"passengerConcierge",
														"hotelName",
														e.target.value
													)
												}
												placeholder="e.g., Four Seasons"
												className="w-full px-4 py-3 text-base border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 transition-all"
											/>
										</div>

										<div>
											<label className="block text-sm font-semibold text-gray-700 mb-2">
												Transport Type
											</label>
											<select
												value={services.passengerConcierge.transport}
												onChange={(e) =>
													handleServiceChange(
														"passengerConcierge",
														"transport",
														e.target.value
													)
												}
												className="w-full px-4 py-3 text-base border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 transition-all"
											>
												<option value="SEDAN">Luxury Sedan</option>
												<option value="LIMO">Limousine</option>
												<option value="SUV">SUV</option>
												<option value="VAN">Van</option>
											</select>
										</div>

										<div>
											<label className="block text-sm font-semibold text-gray-700 mb-2">
												Destination
											</label>
											<input
												type="text"
												value={services.passengerConcierge.destination}
												onChange={(e) =>
													handleServiceChange(
														"passengerConcierge",
														"destination",
														e.target.value
													)
												}
												placeholder="e.g., City Center"
												className="w-full px-4 py-3 text-base border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 transition-all"
											/>
										</div>
									</div>
								</div>
							)}

							{!Object.values(services).some((s) => s.enabled) && (
								<div className="text-center py-16">
									<div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
										<FileCheck className="w-12 h-12 text-gray-400" />
									</div>
									<h3 className="text-xl font-bold text-gray-900 mb-2">
										No Services Selected
									</h3>
									<p className="text-gray-600">
										Go back to Step 2 to select services, or proceed to save the
										trip without services.
									</p>
								</div>
							)}
						</div>
					)}
				</div>

				{/* Footer Actions */}
				<div className="border-t-2 border-gray-200 px-8 py-5 flex items-center justify-between bg-gradient-to-r from-gray-50 to-white rounded-b-2xl">
					<button
						type="button"
						onClick={currentStep === 1 ? onClose : handleBack}
						className="px-6 py-3 text-base border-2 border-gray-300 rounded-lg hover:bg-gray-100 transition-all font-semibold flex items-center gap-2"
					>
						<ChevronLeft className="w-5 h-5" />
						{currentStep === 1 ? "Cancel" : "Previous Step"}
					</button>

					<div className="flex items-center gap-4">
						<div className="text-center">
							<p className="text-sm text-gray-500">Progress</p>
							<p className="text-lg font-bold text-gray-900">
								Step {currentStep} of 3
							</p>
						</div>

						{currentStep < 3 ? (
							<button
								type="button"
								onClick={handleNext}
								className="px-6 py-3 text-base bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all font-semibold flex items-center gap-2 shadow-lg"
							>
								Continue to {currentStep === 1 ? "Services" : "Configuration"}
								<ChevronRight className="w-5 h-5" />
							</button>
						) : (
							<button
								type="button"
								onClick={handleSubmit}
								disabled={loading}
								className="px-8 py-3 text-base bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all font-bold flex items-center gap-2 disabled:opacity-50 shadow-lg"
							>
								{loading ? (
									<>
										<div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
										Creating Trip...
									</>
								) : (
									<>
										<Save className="w-5 h-5" />
										Create Trip
									</>
								)}
							</button>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default AddTrip;
