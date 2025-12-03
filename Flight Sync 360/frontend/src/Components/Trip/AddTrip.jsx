import React, { useState } from "react";
import {
	ChevronLeft,
	ChevronRight,
	Save,
	CheckCircle,
	Plus,
	Upload,
	X,
	FileText,
} from "lucide-react";

// AVAILABLE DATA
const AVAILABLE_CLIENTS = [
	{
		id: 1,
		name: "Apex Corporation",
		type: "Corporate",
		account: "CL-2024-001",
		contact: "John Davidson",
		phone: "+1-555-0123",
		email: "jdavidson@apex.com",
	},
	{
		id: 2,
		name: "MedAir Services",
		type: "Medical",
		account: "CL-2024-002",
		contact: "Dr. Lisa Anderson",
		phone: "+1-555-0456",
		email: "landerson@medair.com",
	},
	{
		id: 3,
		name: "Sterling Enterprises",
		type: "Private",
		account: "CL-2024-003",
		contact: "Victoria Hayes",
		phone: "+1-555-0789",
		email: "vhayes@sterling.com",
	},
	{
		id: 4,
		name: "Global Logistics Inc",
		type: "Cargo",
		account: "CL-2024-004",
		contact: "Mark Thompson",
		phone: "+1-555-0147",
		email: "mthompson@global.com",
	},
];

const AVAILABLE_AIRCRAFT = [
	{
		id: 1,
		registration: "N123AB",
		type: "Gulfstream G650",
		manufacturer: "Gulfstream",
		year: 2019,
		capacity: 14,
		range: 7000,
	},
	{
		id: 2,
		registration: "N456CD",
		type: "Learjet 45",
		manufacturer: "Bombardier",
		year: 2018,
		capacity: 8,
		range: 2000,
	},
	{
		id: 3,
		registration: "N789EF",
		type: "Citation X",
		manufacturer: "Cessna",
		year: 2020,
		capacity: 12,
		range: 3500,
	},
	{
		id: 4,
		registration: "N901GH",
		type: "Boeing 737F",
		manufacturer: "Boeing",
		year: 2017,
		capacity: 0,
		range: 2935,
	},
];

const AVAILABLE_PILOTS = [
	{
		id: 1,
		name: "Capt. Michael Roberts",
		license: "ATP-001234",
		experience: "15 years",
		typeRating: "G650",
	},
	{
		id: 2,
		name: "FO Sarah Chen",
		license: "CPL-005678",
		experience: "8 years",
		typeRating: "G650",
	},
	{
		id: 3,
		name: "Capt. David Miller",
		license: "ATP-002345",
		experience: "20 years",
		typeRating: "LJ45",
	},
	{
		id: 4,
		name: "FO James Wilson",
		license: "CPL-006789",
		experience: "6 years",
		typeRating: "LJ45",
	},
];

const AVAILABLE_FAS = [
	{
		id: 5,
		name: "Jessica Martinez",
		employeeId: "FA-12345",
		position: "Senior FA",
		experience: "10 years",
	},
	{
		id: 6,
		name: "Emma Thompson",
		employeeId: "FA-67890",
		position: "FA",
		experience: "5 years",
	},
	{
		id: 7,
		name: "Michael Johnson",
		employeeId: "FA-24680",
		position: "FA",
		experience: "7 years",
	},
];

const AVAILABLE_PASSENGERS = [
	{
		id: 1,
		name: "Robert Johnson",
		passport: "US123456",
		dob: "1975-01-15",
		nationality: "USA",
	},
	{
		id: 2,
		name: "Emily White",
		passport: "US789012",
		dob: "1982-03-22",
		nationality: "USA",
	},
	{
		id: 3,
		name: "James Anderson",
		passport: "UK456789",
		dob: "1990-07-08",
		nationality: "UK",
	},
	{
		id: 4,
		name: "Maria Garcia",
		passport: "ES234567",
		dob: "1985-11-30",
		nationality: "Spain",
	},
];

const FUEL_VENDORS = [
	"World Fuel Services - KJFK",
	"Shell Aviation - JFK",
	"Signature Flight Support - JFK",
	"Atlantic Aviation - JFK",
	"Jet Aviation - JFK",
];
const PERMIT_VENDORS = [
	"Universal Weather & Aviation",
	"UVair - Permit Services",
	"Air Routing International",
	"International Trip Support",
	"ARINC Direct",
];
const GROUND_HANDLERS = [
	"Signature Flight Support - KJFK",
	"Swissport - JFK",
	"Menzies Aviation - JFK",
	"dnata - JFK",
	"WFS - JFK",
];
const CATERING_VENDORS = [
	"Gate Gourmet - JFK",
	"DO & CO - JFK",
	"Flying Food Group - JFK",
	"LSG Sky Chefs - JFK",
];
const CREW_HOTELS = [
	"Hilton JFK Airport",
	"Courtyard JFK",
	"Hampton Inn JFK",
	"Hyatt Regency JFK",
];

const SERVICE_STATUSES = [
	"Requested",
	"Quoted",
	"Confirmed",
	"Processing",
	"In Progress",
	"Completed",
	"Ready for Invoice",
	"Invoiced",
	"Paid",
	"Cancelled",
];

const AddTrip = ({ onSave, onCancel }) => {
	const [currentStep, setCurrentStep] = useState(1);
	const [formData, setFormData] = useState({
		tripNumber: "",
		flightNumber: "",
		tripType: "Charter",
		status: "pending",
		fromAirport: "",
		toAirport: "",
		scheduledDeparture: "",
		scheduledArrival: "",
		duration: "",
		purpose: "",
		clientId: "",
		aircraftId: "",
		pilotIds: [],
		faIds: [],
		passengerIds: [],
		services: {
			fuel: false,
			permits: false,
			crewConcierge: false,
			groundHandling: false,
			groundSubServices: {
				aircraftHandling: false,
				catering: false,
				deicing: false,
				lavatory: false,
				ramp: false,
				water: false,
			},
		},
		serviceDetails: {
			fuel: {
				vendor: "",
				contactPerson: "",
				contactPhone: "",
				fuelType: "Jet A",
				quantity: "",
				unitPrice: "",
				totalCost: "",
				currency: "USD",
				paymentTerms: "Credit Card",
				deliveryDateTime: "",
				specialRequirements: "",
				status: "Requested",
				priority: "Normal",
				documents: [],
			},
			permits: {
				vendor: "",
				contactPerson: "",
				contactEmail: "",
				permitType: "Landing Permit",
				countries: "",
				processingFee: "",
				governmentFees: "",
				totalCost: "",
				currency: "USD",
				applicationDate: "",
				approvalStatus: "Pending",
				permitDetails: "",
				status: "Requested",
				documents: [],
			},
			crewConcierge: {
				hotel: "",
				contactPerson: "",
				contactPhone: "",
				checkInDate: "",
				checkOutDate: "",
				numberOfRooms: "",
				roomRate: "",
				totalCost: "",
				currency: "USD",
				transportation: false,
				mealVouchers: false,
				specialRequests: "",
				status: "Requested",
				documents: [],
			},
			aircraftHandling: {
				vendor: "",
				contactPerson: "",
				contactPhone: "",
				servicePackage: "Standard",
				parkingPosition: "",
				gpuRequired: false,
				handlingFee: "",
				parkingFee: "",
				landingFee: "",
				totalCost: "",
				currency: "USD",
				arrivalServices: [],
				departureServices: [],
				specialInstructions: "",
				status: "Requested",
				documents: [],
			},
			catering: {
				vendor: "",
				contactPerson: "",
				contactPhone: "",
				mealType: "Standard",
				numberOfPax: "",
				menuDetails: "",
				specialDietary: "",
				cateringCost: "",
				totalCost: "",
				currency: "USD",
				deliveryTime: "",
				status: "Requested",
				documents: [],
			},
			deicing: {
				vendor: "",
				contactPerson: "",
				contactPhone: "",
				deicingType: "Type I",
				estimatedQuantity: "",
				unitPrice: "",
				totalCost: "",
				currency: "USD",
				weatherConditions: "",
				scheduledTime: "",
				status: "Requested",
				documents: [],
			},
			lavatory: {
				vendor: "",
				contactPerson: "",
				contactPhone: "",
				serviceType: "Full Service",
				serviceFee: "",
				currency: "USD",
				scheduledTime: "",
				specialRequirements: "",
				status: "Requested",
				documents: [],
			},
			ramp: {
				vendor: "",
				contactPerson: "",
				contactPhone: "",
				servicesRequired: [],
				numberOfBags: "",
				cargoWeight: "",
				handlingFee: "",
				totalCost: "",
				currency: "USD",
				status: "Requested",
				documents: [],
			},
			water: {
				vendor: "",
				contactPerson: "",
				contactPhone: "",
				quantityGallons: "",
				potableWater: true,
				serviceFee: "",
				currency: "USD",
				scheduledTime: "",
				status: "Requested",
				documents: [],
			},
		},
	});

	const selectedClient = AVAILABLE_CLIENTS.find(
		(c) => c.id === parseInt(formData.clientId)
	);
	const selectedAircraft = AVAILABLE_AIRCRAFT.find(
		(a) => a.id === parseInt(formData.aircraftId)
	);

	const handleInputChange = (field, value) => {
		setFormData({ ...formData, [field]: value });
	};

	const handleServiceToggle = (service) => {
		setFormData({
			...formData,
			services: {
				...formData.services,
				[service]: !formData.services[service],
			},
		});
	};

	const handleGroundSubServiceToggle = (subService) => {
		setFormData({
			...formData,
			services: {
				...formData.services,
				groundSubServices: {
					...formData.services.groundSubServices,
					[subService]: !formData.services.groundSubServices[subService],
				},
			},
		});
	};

	const handleServiceDetailChange = (service, field, value) => {
		setFormData({
			...formData,
			serviceDetails: {
				...formData.serviceDetails,
				[service]: {
					...formData.serviceDetails[service],
					[field]: value,
				},
			},
		});
	};

	const handleFileUpload = (service, files) => {
		const fileArray = Array.from(files).map((file) => ({
			name: file.name,
			size: file.size,
			type: file.type,
		}));

		setFormData({
			...formData,
			serviceDetails: {
				...formData.serviceDetails,
				[service]: {
					...formData.serviceDetails[service],
					documents: [
						...formData.serviceDetails[service].documents,
						...fileArray,
					],
				},
			},
		});
	};

	const handleRemoveDocument = (service, index) => {
		const updatedDocs = formData.serviceDetails[service].documents.filter(
			(_, i) => i !== index
		);
		setFormData({
			...formData,
			serviceDetails: {
				...formData.serviceDetails,
				[service]: {
					...formData.serviceDetails[service],
					documents: updatedDocs,
				},
			},
		});
	};

	const handleNext = () => {
		if (currentStep < 3) setCurrentStep(currentStep + 1);
	};

	const handlePrevious = () => {
		if (currentStep > 1) setCurrentStep(currentStep - 1);
	};

	const handleSubmit = () => {
		const client = AVAILABLE_CLIENTS.find(
			(c) => c.id === parseInt(formData.clientId)
		);
		const aircraft = AVAILABLE_AIRCRAFT.find(
			(a) => a.id === parseInt(formData.aircraftId)
		);
		const pilots = AVAILABLE_PILOTS.filter((p) =>
			formData.pilotIds.includes(p.id)
		);
		const fas = AVAILABLE_FAS.filter((fa) => formData.faIds.includes(fa.id));
		const passengers = AVAILABLE_PASSENGERS.filter((p) =>
			formData.passengerIds.includes(p.id)
		);

		const tripData = {
			...formData,
			client,
			aircraft,
			crew: { pilots, flightAttendants: fas },
			passengers,
			services: [
				formData.services.fuel && "Fuel",
				formData.services.permits && "Permits",
				formData.services.crewConcierge && "Crew Concierge",
				formData.services.groundHandling && "Ground Handling",
			].filter(Boolean),
		};

		onSave(tripData);
	};

	// STEP 1: Journey Information
	const renderStep1 = () => (
		<div className="space-y-4">
			{/* Flight Information */}
			<div className="p-4 bg-gray-50 rounded-lg">
				<h3 className="text-sm font-bold text-gray-700 mb-3">
					FLIGHT INFORMATION
				</h3>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
					<div>
						<label className="block text-xs font-medium text-gray-700 mb-1">
							Trip Number *
						</label>
						<input
							type="text"
							value={formData.tripNumber}
							onChange={(e) => handleInputChange("tripNumber", e.target.value)}
							placeholder="FP360-2024-XXX"
							className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg"
						/>
					</div>
					<div>
						<label className="block text-xs font-medium text-gray-700 mb-1">
							Flight Number *
						</label>
						<input
							type="text"
							value={formData.flightNumber}
							onChange={(e) =>
								handleInputChange("flightNumber", e.target.value)
							}
							placeholder="BA4512"
							className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg"
						/>
					</div>
					<div>
						<label className="block text-xs font-medium text-gray-700 mb-1">
							Trip Type *
						</label>
						<select
							value={formData.tripType}
							onChange={(e) => handleInputChange("tripType", e.target.value)}
							className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg"
						>
							<option>Charter</option>
							<option>Private</option>
							<option>Medical</option>
							<option>Cargo</option>
						</select>
					</div>
					<div>
						<label className="block text-xs font-medium text-gray-700 mb-1">
							Status
						</label>
						<select
							value={formData.status}
							onChange={(e) => handleInputChange("status", e.target.value)}
							className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg"
						>
							<option value="pending">Pending</option>
							<option value="confirmed">Confirmed</option>
						</select>
					</div>
					<div>
						<label className="block text-xs font-medium text-gray-700 mb-1">
							From Airport *
						</label>
						<input
							type="text"
							value={formData.fromAirport}
							onChange={(e) =>
								handleInputChange("fromAirport", e.target.value.toUpperCase())
							}
							placeholder="KJFK"
							maxLength={4}
							className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg font-mono"
						/>
					</div>
					<div>
						<label className="block text-xs font-medium text-gray-700 mb-1">
							To Airport *
						</label>
						<input
							type="text"
							value={formData.toAirport}
							onChange={(e) =>
								handleInputChange("toAirport", e.target.value.toUpperCase())
							}
							placeholder="EGLL"
							maxLength={4}
							className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg font-mono"
						/>
					</div>
					<div>
						<label className="block text-xs font-medium text-gray-700 mb-1">
							Departure Date/Time *
						</label>
						<input
							type="datetime-local"
							value={formData.scheduledDeparture}
							onChange={(e) =>
								handleInputChange("scheduledDeparture", e.target.value)
							}
							className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg"
						/>
					</div>
					<div>
						<label className="block text-xs font-medium text-gray-700 mb-1">
							Arrival Date/Time
						</label>
						<input
							type="datetime-local"
							value={formData.scheduledArrival}
							onChange={(e) =>
								handleInputChange("scheduledArrival", e.target.value)
							}
							className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg"
						/>
					</div>
					<div>
						<label className="block text-xs font-medium text-gray-700 mb-1">
							Duration
						</label>
						<input
							type="text"
							value={formData.duration}
							onChange={(e) => handleInputChange("duration", e.target.value)}
							placeholder="7h 30m"
							className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg"
						/>
					</div>
					<div className="md:col-span-2 lg:col-span-3">
						<label className="block text-xs font-medium text-gray-700 mb-1">
							Purpose
						</label>
						<input
							type="text"
							value={formData.purpose}
							onChange={(e) => handleInputChange("purpose", e.target.value)}
							placeholder="e.g., Corporate Executive Travel"
							className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg"
						/>
					</div>
				</div>
			</div>

			{/* Client Selection */}
			<div className="p-4 border-2 border-gray-300 rounded-lg">
				<div className="flex items-center justify-between mb-3">
					<h3 className="text-sm font-bold text-gray-700">CLIENT *</h3>
					<button
						type="button"
						className="px-3 py-1 bg-green-500 text-white rounded text-xs font-bold"
					>
						<Plus className="w-3 h-3 inline mr-1" />
						Add New
					</button>
				</div>
				<select
					value={formData.clientId}
					onChange={(e) => handleInputChange("clientId", e.target.value)}
					className="w-full px-3 py-2 text-sm border-2 border-blue-300 rounded-lg bg-blue-50 mb-2"
				>
					<option value="">-- Select Client --</option>
					{AVAILABLE_CLIENTS.map((client) => (
						<option key={client.id} value={client.id}>
							{client.name} | {client.type} | {client.account} |{" "}
							{client.contact}
						</option>
					))}
				</select>
				{selectedClient && (
					<div className="text-xs text-gray-600 bg-blue-50 p-2 rounded grid grid-cols-2 gap-2">
						<div>
							<span className="font-bold">Contact:</span>{" "}
							{selectedClient.contact}
						</div>
						<div>
							<span className="font-bold">Phone:</span> {selectedClient.phone}
						</div>
						<div>
							<span className="font-bold">Email:</span> {selectedClient.email}
						</div>
						<div>
							<span className="font-bold">Account:</span>{" "}
							{selectedClient.account}
						</div>
					</div>
				)}
			</div>

			{/* Aircraft Selection */}
			<div className="p-4 border-2 border-gray-300 rounded-lg">
				<div className="flex items-center justify-between mb-3">
					<h3 className="text-sm font-bold text-gray-700">AIRCRAFT *</h3>
					<button
						type="button"
						className="px-3 py-1 bg-green-500 text-white rounded text-xs font-bold"
					>
						<Plus className="w-3 h-3 inline mr-1" />
						Add New
					</button>
				</div>
				<select
					value={formData.aircraftId}
					onChange={(e) => handleInputChange("aircraftId", e.target.value)}
					className="w-full px-3 py-2 text-sm border-2 border-blue-300 rounded-lg bg-blue-50 mb-2"
				>
					<option value="">-- Select Aircraft --</option>
					{AVAILABLE_AIRCRAFT.map((aircraft) => (
						<option key={aircraft.id} value={aircraft.id}>
							{aircraft.registration} - {aircraft.type} |{" "}
							{aircraft.manufacturer} {aircraft.year} | {aircraft.capacity} pax
							| {aircraft.range} nm
						</option>
					))}
				</select>
				{selectedAircraft && (
					<div className="text-xs text-gray-600 bg-blue-50 p-2 rounded grid grid-cols-2 gap-2">
						<div>
							<span className="font-bold">Type:</span> {selectedAircraft.type}
						</div>
						<div>
							<span className="font-bold">Manufacturer:</span>{" "}
							{selectedAircraft.manufacturer}
						</div>
						<div>
							<span className="font-bold">Year:</span> {selectedAircraft.year}
						</div>
						<div>
							<span className="font-bold">Capacity:</span>{" "}
							{selectedAircraft.capacity} passengers
						</div>
					</div>
				)}
			</div>

			{/* Crew Selection */}
			<div className="p-4 border-2 border-indigo-300 rounded-lg bg-indigo-50">
				<h3 className="text-sm font-bold text-indigo-900 mb-3">
					CREW SELECTION *
				</h3>

				<div className="mb-3">
					<div className="flex items-center justify-between mb-2">
						<h4 className="text-sm font-bold text-indigo-800">✈️ PILOTS</h4>
						<button
							type="button"
							className="px-2 py-1 bg-indigo-600 text-white rounded text-xs"
						>
							+ Add Pilot
						</button>
					</div>
					<select
						multiple
						size="3"
						value={formData.pilotIds}
						onChange={(e) =>
							handleInputChange(
								"pilotIds",
								Array.from(e.target.selectedOptions, (option) =>
									parseInt(option.value)
								)
							)
						}
						className="w-full px-3 py-2 text-sm border border-indigo-300 rounded-lg bg-white"
					>
						{AVAILABLE_PILOTS.map((pilot) => (
							<option key={pilot.id} value={pilot.id}>
								{pilot.name} | {pilot.license} | {pilot.experience} | Type:{" "}
								{pilot.typeRating}
							</option>
						))}
					</select>
					<p className="text-xs text-indigo-700 mt-1">
						Hold Ctrl/Cmd to select multiple pilots
					</p>
				</div>

				<div>
					<div className="flex items-center justify-between mb-2">
						<h4 className="text-sm font-bold text-indigo-800">
							👥 FLIGHT ATTENDANTS
						</h4>
						<button
							type="button"
							className="px-2 py-1 bg-indigo-600 text-white rounded text-xs"
						>
							+ Add FA
						</button>
					</div>
					<select
						multiple
						size="3"
						value={formData.faIds}
						onChange={(e) =>
							handleInputChange(
								"faIds",
								Array.from(e.target.selectedOptions, (option) =>
									parseInt(option.value)
								)
							)
						}
						className="w-full px-3 py-2 text-sm border border-indigo-300 rounded-lg bg-white"
					>
						{AVAILABLE_FAS.map((fa) => (
							<option key={fa.id} value={fa.id}>
								{fa.name} | {fa.employeeId} | {fa.position} | {fa.experience}
							</option>
						))}
					</select>
					<p className="text-xs text-indigo-700 mt-1">
						Hold Ctrl/Cmd to select multiple
					</p>
				</div>
			</div>

			{/* Passenger Selection */}
			<div className="p-4 border-2 border-gray-300 rounded-lg">
				<div className="flex items-center justify-between mb-3">
					<h3 className="text-sm font-bold text-gray-700">PASSENGERS</h3>
					<button
						type="button"
						className="px-3 py-1 bg-green-500 text-white rounded text-xs font-bold"
					>
						<Plus className="w-3 h-3 inline mr-1" />
						Add Passenger
					</button>
				</div>
				<select
					multiple
					size="4"
					value={formData.passengerIds}
					onChange={(e) =>
						handleInputChange(
							"passengerIds",
							Array.from(e.target.selectedOptions, (option) =>
								parseInt(option.value)
							)
						)
					}
					className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg"
				>
					{AVAILABLE_PASSENGERS.map((passenger) => (
						<option key={passenger.id} value={passenger.id}>
							{passenger.name} | Passport: {passenger.passport} | DOB:{" "}
							{passenger.dob} | {passenger.nationality}
						</option>
					))}
				</select>
				<p className="text-xs text-gray-600 mt-1">
					Hold Ctrl/Cmd to select multiple passengers
				</p>
			</div>
		</div>
	);

	// STEP 2: Service Selection
	const renderStep2 = () => {
		const tripInfo = {
			tripNumber: formData.tripNumber || "N/A",
			flightNumber: formData.flightNumber || "N/A",
			route: `${formData.fromAirport || "N/A"} → ${
				formData.toAirport || "N/A"
			}`,
			date: formData.scheduledDeparture
				? new Date(formData.scheduledDeparture).toLocaleDateString()
				: "N/A",
			client: selectedClient?.name || "N/A",
			aircraft: selectedAircraft
				? `${selectedAircraft.registration} - ${selectedAircraft.type}`
				: "N/A",
		};

		return (
			<div className="space-y-4">
				{/* Persistent Trip Info */}
				<div className="p-4 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl text-white">
					<div className="flex items-center justify-between flex-wrap gap-2">
						<div>
							<p className="text-xs text-blue-200">TRIP</p>
							<p className="text-sm font-bold">
								{tripInfo.tripNumber} | {tripInfo.flightNumber}
							</p>
						</div>
						<div className="border-l border-blue-400 pl-3">
							<p className="text-xs text-blue-200">ROUTE</p>
							<p className="text-sm font-bold">{tripInfo.route}</p>
						</div>
						<div className="border-l border-blue-400 pl-3">
							<p className="text-xs text-blue-200">DATE</p>
							<p className="text-sm font-bold">{tripInfo.date}</p>
						</div>
						<div className="border-l border-blue-400 pl-3">
							<p className="text-xs text-blue-200">CLIENT</p>
							<p className="text-sm font-bold">{tripInfo.client}</p>
						</div>
						<div className="border-l border-blue-400 pl-3">
							<p className="text-xs text-blue-200">AIRCRAFT</p>
							<p className="text-sm font-bold">{tripInfo.aircraft}</p>
						</div>
					</div>
				</div>

				<p className="text-sm text-gray-600">
					Select services required for this trip
				</p>

				{/* Service Cards */}
				<div className="grid gap-3">
					{/* Fuel Services */}
					<label
						className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
							formData.services.fuel
								? "border-blue-500 bg-blue-50"
								: "border-gray-300 hover:border-blue-300"
						}`}
					>
						<div className="flex items-center justify-between">
							<div className="flex items-center gap-3">
								<input
									type="checkbox"
									checked={formData.services.fuel}
									onChange={() => handleServiceToggle("fuel")}
									className="w-5 h-5 text-blue-600"
								/>
								<div className="text-3xl">⛽</div>
								<div>
									<div className="text-base font-bold text-gray-900">
										Fuel Services
									</div>
									<div className="text-xs text-gray-600">
										Aircraft refueling and fuel management
									</div>
								</div>
							</div>
						</div>
					</label>

					{/* Permits */}
					<label
						className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
							formData.services.permits
								? "border-blue-500 bg-blue-50"
								: "border-gray-300 hover:border-blue-300"
						}`}
					>
						<div className="flex items-center justify-between">
							<div className="flex items-center gap-3">
								<input
									type="checkbox"
									checked={formData.services.permits}
									onChange={() => handleServiceToggle("permits")}
									className="w-5 h-5 text-blue-600"
								/>
								<div className="text-3xl">📋</div>
								<div>
									<div className="text-base font-bold text-gray-900">
										Permits & Clearances
									</div>
									<div className="text-xs text-gray-600">
										Landing permits and overflight clearances
									</div>
								</div>
							</div>
						</div>
					</label>

					{/* Crew Concierge */}
					<label
						className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
							formData.services.crewConcierge
								? "border-blue-500 bg-blue-50"
								: "border-gray-300 hover:border-blue-300"
						}`}
					>
						<div className="flex items-center justify-between">
							<div className="flex items-center gap-3">
								<input
									type="checkbox"
									checked={formData.services.crewConcierge}
									onChange={() => handleServiceToggle("crewConcierge")}
									className="w-5 h-5 text-blue-600"
								/>
								<div className="text-3xl">🎩</div>
								<div>
									<div className="text-base font-bold text-gray-900">
										Crew Concierge
									</div>
									<div className="text-xs text-gray-600">
										Crew accommodation and ground services
									</div>
								</div>
							</div>
						</div>
					</label>

					{/* Ground Handling */}
					<div
						className={`p-4 border-2 rounded-xl ${
							formData.services.groundHandling
								? "border-blue-500 bg-blue-50"
								: "border-gray-300"
						}`}
					>
						<div className="flex items-center justify-between mb-3">
							<div className="flex items-center gap-3">
								<input
									type="checkbox"
									checked={formData.services.groundHandling}
									onChange={() => handleServiceToggle("groundHandling")}
									className="w-5 h-5 text-blue-600"
								/>
								<div className="text-3xl">🚛</div>
								<div>
									<div className="text-base font-bold text-gray-900">
										Ground Handling Services
									</div>
									<div className="text-xs text-gray-600">
										Select sub-services below
									</div>
								</div>
							</div>
						</div>

						{formData.services.groundHandling && (
							<div className="ml-12 space-y-2 mt-3 pt-3 border-t-2 border-blue-200">
								{[
									{
										key: "aircraftHandling",
										icon: "✈️",
										label: "Aircraft Handling",
										desc: "Marshalling, towing, positioning",
									},
									{
										key: "catering",
										icon: "🍽️",
										label: "Catering Services",
										desc: "Loading/unloading catering",
									},
									{
										key: "deicing",
										icon: "❄️",
										label: "De-icing Service",
										desc: "Aircraft de-icing",
									},
									{
										key: "lavatory",
										icon: "🚽",
										label: "Lavatory Services",
										desc: "Lavatory servicing",
									},
									{
										key: "ramp",
										icon: "📦",
										label: "Ramp Services",
										desc: "Baggage, cargo handling",
									},
									{
										key: "water",
										icon: "💧",
										label: "Water Services",
										desc: "Potable water servicing",
									},
								].map((sub) => (
									<label
										key={sub.key}
										className="flex items-center gap-2 p-3 border-2 border-blue-200 bg-white rounded-lg cursor-pointer hover:bg-blue-50"
									>
										<input
											type="checkbox"
											checked={formData.services.groundSubServices[sub.key]}
											onChange={() => handleGroundSubServiceToggle(sub.key)}
											className="w-4 h-4 text-blue-600"
										/>
										<span className="text-xl">{sub.icon}</span>
										<div>
											<span className="text-sm font-bold text-gray-900">
												{sub.label}
											</span>
											<span className="text-xs text-gray-600 block">
												{sub.desc}
											</span>
										</div>
									</label>
								))}
							</div>
						)}
					</div>
				</div>

				{/* Summary */}
				<div className="p-3 bg-green-50 border-2 border-green-200 rounded-lg">
					<div className="text-sm font-bold text-green-900 mb-2">
						Selected Services:
					</div>
					<div className="flex flex-wrap gap-2 text-xs">
						{formData.services.fuel && (
							<span className="px-3 py-1 bg-blue-600 text-white rounded-lg">
								⛽ Fuel
							</span>
						)}
						{formData.services.permits && (
							<span className="px-3 py-1 bg-blue-600 text-white rounded-lg">
								📋 Permits
							</span>
						)}
						{formData.services.crewConcierge && (
							<span className="px-3 py-1 bg-blue-600 text-white rounded-lg">
								🎩 Crew Concierge
							</span>
						)}
						{formData.services.groundHandling && (
							<span className="px-3 py-1 bg-blue-600 text-white rounded-lg">
								🚛 Ground Handling
							</span>
						)}
					</div>
				</div>
			</div>
		);
	};

	// STEP 3: Service Details (COMPREHENSIVE)
	const renderStep3 = () => {
		const tripInfo = {
			tripNumber: formData.tripNumber || "N/A",
			flightNumber: formData.flightNumber || "N/A",
			route: `${formData.fromAirport || "N/A"} → ${
				formData.toAirport || "N/A"
			}`,
			date: formData.scheduledDeparture
				? new Date(formData.scheduledDeparture).toLocaleDateString()
				: "N/A",
			client: selectedClient?.name || "N/A",
			aircraft: selectedAircraft
				? `${selectedAircraft.registration} - ${selectedAircraft.type}`
				: "N/A",
		};

		const renderDocumentUpload = (service) => (
			<div className="md:col-span-4 border-t-2 border-gray-200 pt-3 mt-3">
				<label className="block text-xs font-bold text-gray-700 mb-2">
					📎 Upload Documents
				</label>
				<div className="flex items-center gap-2">
					<label className="px-4 py-2 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700 text-sm flex items-center gap-2">
						<Upload className="w-4 h-4" />
						Choose Files
						<input
							type="file"
							multiple
							onChange={(e) => handleFileUpload(service, e.target.files)}
							className="hidden"
						/>
					</label>
					<span className="text-xs text-gray-600">
						Upload quotes, invoices, contracts, etc.
					</span>
				</div>
				{formData.serviceDetails[service].documents.length > 0 && (
					<div className="mt-2 space-y-1">
						{formData.serviceDetails[service].documents.map((doc, idx) => (
							<div
								key={idx}
								className="flex items-center justify-between p-2 bg-gray-50 border border-gray-200 rounded text-xs"
							>
								<div className="flex items-center gap-2">
									<FileText className="w-4 h-4 text-blue-600" />
									<span className="font-bold">{doc.name}</span>
									<span className="text-gray-500">
										({(doc.size / 1024).toFixed(1)} KB)
									</span>
								</div>
								<button
									type="button"
									onClick={() => handleRemoveDocument(service, idx)}
									className="text-red-600 hover:text-red-800"
								>
									<X className="w-4 h-4" />
								</button>
							</div>
						))}
					</div>
				)}
			</div>
		);

		return (
			<div className="space-y-4">
				{/* Persistent Trip Info */}
				<div className="p-4 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl text-white">
					<div className="flex items-center justify-between flex-wrap gap-2">
						<div>
							<p className="text-xs text-blue-200">TRIP</p>
							<p className="text-sm font-bold">
								{tripInfo.tripNumber} | {tripInfo.flightNumber}
							</p>
						</div>
						<div className="border-l border-blue-400 pl-3">
							<p className="text-xs text-blue-200">ROUTE</p>
							<p className="text-sm font-bold">{tripInfo.route}</p>
						</div>
						<div className="border-l border-blue-400 pl-3">
							<p className="text-xs text-blue-200">DATE</p>
							<p className="text-sm font-bold">{tripInfo.date}</p>
						</div>
						<div className="border-l border-blue-400 pl-3">
							<p className="text-xs text-blue-200">CLIENT</p>
							<p className="text-sm font-bold">{tripInfo.client}</p>
						</div>
						<div className="border-l border-blue-400 pl-3">
							<p className="text-xs text-blue-200">AIRCRAFT</p>
							<p className="text-sm font-bold">{tripInfo.aircraft}</p>
						</div>
					</div>
				</div>

				{/* FUEL SERVICE */}
				{formData.services.fuel && (
					<div className="p-5 border-2 border-blue-300 rounded-xl bg-blue-50">
						<div className="flex items-center gap-2 mb-4 pb-3 border-b-2 border-blue-200">
							<span className="text-2xl">⛽</span>
							<h3 className="text-lg font-bold text-gray-900">Fuel Services</h3>
						</div>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
							<div className="md:col-span-2">
								<label className="block text-xs font-bold text-gray-700 mb-1">
									Vendor/Supplier *
								</label>
								<select
									value={formData.serviceDetails.fuel.vendor}
									onChange={(e) =>
										handleServiceDetailChange("fuel", "vendor", e.target.value)
									}
									className="w-full px-3 py-2 text-sm border-2 border-blue-400 rounded-lg bg-white"
								>
									<option value="">-- Select Vendor --</option>
									{FUEL_VENDORS.map((vendor, idx) => (
										<option key={idx} value={vendor}>
											{vendor}
										</option>
									))}
								</select>
							</div>
							<div>
								<label className="block text-xs font-bold text-gray-700 mb-1">
									Contact Person
								</label>
								<input
									type="text"
									value={formData.serviceDetails.fuel.contactPerson}
									onChange={(e) =>
										handleServiceDetailChange(
											"fuel",
											"contactPerson",
											e.target.value
										)
									}
									className="w-full px-3 py-2 text-sm border rounded-lg"
								/>
							</div>
							<div>
								<label className="block text-xs font-bold text-gray-700 mb-1">
									Contact Phone
								</label>
								<input
									type="tel"
									value={formData.serviceDetails.fuel.contactPhone}
									onChange={(e) =>
										handleServiceDetailChange(
											"fuel",
											"contactPhone",
											e.target.value
										)
									}
									className="w-full px-3 py-2 text-sm border rounded-lg"
								/>
							</div>
							<div>
								<label className="block text-xs font-bold text-gray-700 mb-1">
									Fuel Type *
								</label>
								<select
									value={formData.serviceDetails.fuel.fuelType}
									onChange={(e) =>
										handleServiceDetailChange(
											"fuel",
											"fuelType",
											e.target.value
										)
									}
									className="w-full px-3 py-2 text-sm border rounded-lg"
								>
									<option>Jet A</option>
									<option>Jet A-1</option>
									<option>AvGas 100LL</option>
								</select>
							</div>
							<div>
								<label className="block text-xs font-bold text-gray-700 mb-1">
									Quantity (gallons)
								</label>
								<input
									type="number"
									value={formData.serviceDetails.fuel.quantity}
									onChange={(e) =>
										handleServiceDetailChange(
											"fuel",
											"quantity",
											e.target.value
										)
									}
									className="w-full px-3 py-2 text-sm border rounded-lg"
								/>
							</div>
							<div>
								<label className="block text-xs font-bold text-gray-700 mb-1">
									Unit Price ($/gal)
								</label>
								<input
									type="number"
									step="0.01"
									value={formData.serviceDetails.fuel.unitPrice}
									onChange={(e) =>
										handleServiceDetailChange(
											"fuel",
											"unitPrice",
											e.target.value
										)
									}
									className="w-full px-3 py-2 text-sm border rounded-lg"
								/>
							</div>
							<div>
								<label className="block text-xs font-bold text-gray-700 mb-1">
									Total Cost
								</label>
								<input
									type="number"
									step="0.01"
									value={formData.serviceDetails.fuel.totalCost}
									onChange={(e) =>
										handleServiceDetailChange(
											"fuel",
											"totalCost",
											e.target.value
										)
									}
									className="w-full px-3 py-2 text-sm border rounded-lg bg-gray-100 font-bold"
								/>
							</div>
							<div>
								<label className="block text-xs font-bold text-gray-700 mb-1">
									Currency
								</label>
								<select
									value={formData.serviceDetails.fuel.currency}
									onChange={(e) =>
										handleServiceDetailChange(
											"fuel",
											"currency",
											e.target.value
										)
									}
									className="w-full px-3 py-2 text-sm border rounded-lg"
								>
									<option>USD</option>
									<option>EUR</option>
									<option>GBP</option>
								</select>
							</div>
							<div>
								<label className="block text-xs font-bold text-gray-700 mb-1">
									Payment Terms
								</label>
								<select
									value={formData.serviceDetails.fuel.paymentTerms}
									onChange={(e) =>
										handleServiceDetailChange(
											"fuel",
											"paymentTerms",
											e.target.value
										)
									}
									className="w-full px-3 py-2 text-sm border rounded-lg"
								>
									<option>Cash</option>
									<option>Credit Card</option>
									<option>Fuel Card</option>
									<option>Invoice Net 30</option>
									<option>Invoice Net 60</option>
								</select>
							</div>
							<div>
								<label className="block text-xs font-bold text-gray-700 mb-1">
									Delivery Date/Time
								</label>
								<input
									type="datetime-local"
									value={formData.serviceDetails.fuel.deliveryDateTime}
									onChange={(e) =>
										handleServiceDetailChange(
											"fuel",
											"deliveryDateTime",
											e.target.value
										)
									}
									className="w-full px-3 py-2 text-sm border rounded-lg"
								/>
							</div>
							<div>
								<label className="block text-xs font-bold text-gray-700 mb-1">
									Service Status *
								</label>
								<select
									value={formData.serviceDetails.fuel.status}
									onChange={(e) =>
										handleServiceDetailChange("fuel", "status", e.target.value)
									}
									className="w-full px-3 py-2 text-sm border-2 border-green-400 rounded-lg bg-green-50 font-bold"
								>
									{SERVICE_STATUSES.map((status) => (
										<option key={status} value={status}>
											{status}
										</option>
									))}
								</select>
							</div>
							<div>
								<label className="block text-xs font-bold text-gray-700 mb-1">
									Priority
								</label>
								<select
									value={formData.serviceDetails.fuel.priority}
									onChange={(e) =>
										handleServiceDetailChange(
											"fuel",
											"priority",
											e.target.value
										)
									}
									className="w-full px-3 py-2 text-sm border rounded-lg"
								>
									<option>Normal</option>
									<option>High</option>
									<option>Urgent</option>
								</select>
							</div>
							<div className="md:col-span-4">
								<label className="block text-xs font-bold text-gray-700 mb-1">
									Special Requirements
								</label>
								<textarea
									rows="2"
									value={formData.serviceDetails.fuel.specialRequirements}
									onChange={(e) =>
										handleServiceDetailChange(
											"fuel",
											"specialRequirements",
											e.target.value
										)
									}
									className="w-full px-3 py-2 text-sm border rounded-lg"
									placeholder="Any special handling or requirements..."
								/>
							</div>
							{renderDocumentUpload("fuel")}
						</div>
					</div>
				)}

				{/* PERMITS SERVICE */}
				{formData.services.permits && (
					<div className="p-5 border-2 border-purple-300 rounded-xl bg-purple-50">
						<div className="flex items-center gap-2 mb-4 pb-3 border-b-2 border-purple-200">
							<span className="text-2xl">📋</span>
							<h3 className="text-lg font-bold text-gray-900">
								Permits & Clearances
							</h3>
						</div>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
							<div className="md:col-span-2">
								<label className="block text-xs font-bold text-gray-700 mb-1">
									Vendor/Handler *
								</label>
								<select
									value={formData.serviceDetails.permits.vendor}
									onChange={(e) =>
										handleServiceDetailChange(
											"permits",
											"vendor",
											e.target.value
										)
									}
									className="w-full px-3 py-2 text-sm border-2 border-purple-400 rounded-lg bg-white"
								>
									<option value="">-- Select Vendor --</option>
									{PERMIT_VENDORS.map((vendor, idx) => (
										<option key={idx} value={vendor}>
											{vendor}
										</option>
									))}
								</select>
							</div>
							<div>
								<label className="block text-xs font-bold text-gray-700 mb-1">
									Contact Person
								</label>
								<input
									type="text"
									value={formData.serviceDetails.permits.contactPerson}
									onChange={(e) =>
										handleServiceDetailChange(
											"permits",
											"contactPerson",
											e.target.value
										)
									}
									className="w-full px-3 py-2 text-sm border rounded-lg"
								/>
							</div>
							<div>
								<label className="block text-xs font-bold text-gray-700 mb-1">
									Contact Email
								</label>
								<input
									type="email"
									value={formData.serviceDetails.permits.contactEmail}
									onChange={(e) =>
										handleServiceDetailChange(
											"permits",
											"contactEmail",
											e.target.value
										)
									}
									className="w-full px-3 py-2 text-sm border rounded-lg"
								/>
							</div>
							<div>
								<label className="block text-xs font-bold text-gray-700 mb-1">
									Permit Type *
								</label>
								<select
									value={formData.serviceDetails.permits.permitType}
									onChange={(e) =>
										handleServiceDetailChange(
											"permits",
											"permitType",
											e.target.value
										)
									}
									className="w-full px-3 py-2 text-sm border rounded-lg"
								>
									<option>Landing Permit</option>
									<option>Overflight Permit</option>
									<option>Both</option>
								</select>
							</div>
							<div>
								<label className="block text-xs font-bold text-gray-700 mb-1">
									Countries
								</label>
								<input
									type="text"
									value={formData.serviceDetails.permits.countries}
									onChange={(e) =>
										handleServiceDetailChange(
											"permits",
											"countries",
											e.target.value
										)
									}
									placeholder="e.g., UK, France"
									className="w-full px-3 py-2 text-sm border rounded-lg"
								/>
							</div>
							<div>
								<label className="block text-xs font-bold text-gray-700 mb-1">
									Processing Fee
								</label>
								<input
									type="number"
									step="0.01"
									value={formData.serviceDetails.permits.processingFee}
									onChange={(e) =>
										handleServiceDetailChange(
											"permits",
											"processingFee",
											e.target.value
										)
									}
									className="w-full px-3 py-2 text-sm border rounded-lg"
								/>
							</div>
							<div>
								<label className="block text-xs font-bold text-gray-700 mb-1">
									Government Fees
								</label>
								<input
									type="number"
									step="0.01"
									value={formData.serviceDetails.permits.governmentFees}
									onChange={(e) =>
										handleServiceDetailChange(
											"permits",
											"governmentFees",
											e.target.value
										)
									}
									className="w-full px-3 py-2 text-sm border rounded-lg"
								/>
							</div>
							<div>
								<label className="block text-xs font-bold text-gray-700 mb-1">
									Total Cost
								</label>
								<input
									type="number"
									step="0.01"
									value={formData.serviceDetails.permits.totalCost}
									onChange={(e) =>
										handleServiceDetailChange(
											"permits",
											"totalCost",
											e.target.value
										)
									}
									className="w-full px-3 py-2 text-sm border rounded-lg bg-gray-100 font-bold"
								/>
							</div>
							<div>
								<label className="block text-xs font-bold text-gray-700 mb-1">
									Currency
								</label>
								<select
									value={formData.serviceDetails.permits.currency}
									onChange={(e) =>
										handleServiceDetailChange(
											"permits",
											"currency",
											e.target.value
										)
									}
									className="w-full px-3 py-2 text-sm border rounded-lg"
								>
									<option>USD</option>
									<option>EUR</option>
									<option>GBP</option>
								</select>
							</div>
							<div>
								<label className="block text-xs font-bold text-gray-700 mb-1">
									Application Date
								</label>
								<input
									type="date"
									value={formData.serviceDetails.permits.applicationDate}
									onChange={(e) =>
										handleServiceDetailChange(
											"permits",
											"applicationDate",
											e.target.value
										)
									}
									className="w-full px-3 py-2 text-sm border rounded-lg"
								/>
							</div>
							<div>
								<label className="block text-xs font-bold text-gray-700 mb-1">
									Approval Status
								</label>
								<select
									value={formData.serviceDetails.permits.approvalStatus}
									onChange={(e) =>
										handleServiceDetailChange(
											"permits",
											"approvalStatus",
											e.target.value
										)
									}
									className="w-full px-3 py-2 text-sm border rounded-lg"
								>
									<option>Pending</option>
									<option>Applied</option>
									<option>Approved</option>
									<option>Denied</option>
								</select>
							</div>
							<div>
								<label className="block text-xs font-bold text-gray-700 mb-1">
									Service Status *
								</label>
								<select
									value={formData.serviceDetails.permits.status}
									onChange={(e) =>
										handleServiceDetailChange(
											"permits",
											"status",
											e.target.value
										)
									}
									className="w-full px-3 py-2 text-sm border-2 border-green-400 rounded-lg bg-green-50 font-bold"
								>
									{SERVICE_STATUSES.map((status) => (
										<option key={status} value={status}>
											{status}
										</option>
									))}
								</select>
							</div>
							<div className="md:col-span-4">
								<label className="block text-xs font-bold text-gray-700 mb-1">
									Permit Details / Reference Numbers
								</label>
								<textarea
									rows="2"
									value={formData.serviceDetails.permits.permitDetails}
									onChange={(e) =>
										handleServiceDetailChange(
											"permits",
											"permitDetails",
											e.target.value
										)
									}
									className="w-full px-3 py-2 text-sm border rounded-lg"
									placeholder="Permit numbers, reference codes, notes..."
								/>
							</div>
							{renderDocumentUpload("permits")}
						</div>
					</div>
				)}

				{/* CREW CONCIERGE SERVICE */}
				{formData.services.crewConcierge && (
					<div className="p-5 border-2 border-indigo-300 rounded-xl bg-indigo-50">
						<div className="flex items-center gap-2 mb-4 pb-3 border-b-2 border-indigo-200">
							<span className="text-2xl">🎩</span>
							<h3 className="text-lg font-bold text-gray-900">
								Crew Concierge Services
							</h3>
						</div>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
							<div className="md:col-span-2">
								<label className="block text-xs font-bold text-gray-700 mb-1">
									Hotel *
								</label>
								<select
									value={formData.serviceDetails.crewConcierge.hotel}
									onChange={(e) =>
										handleServiceDetailChange(
											"crewConcierge",
											"hotel",
											e.target.value
										)
									}
									className="w-full px-3 py-2 text-sm border-2 border-indigo-400 rounded-lg bg-white"
								>
									<option value="">-- Select Hotel --</option>
									{CREW_HOTELS.map((hotel, idx) => (
										<option key={idx} value={hotel}>
											{hotel}
										</option>
									))}
								</select>
							</div>
							<div>
								<label className="block text-xs font-bold text-gray-700 mb-1">
									Contact Person
								</label>
								<input
									type="text"
									value={formData.serviceDetails.crewConcierge.contactPerson}
									onChange={(e) =>
										handleServiceDetailChange(
											"crewConcierge",
											"contactPerson",
											e.target.value
										)
									}
									className="w-full px-3 py-2 text-sm border rounded-lg"
								/>
							</div>
							<div>
								<label className="block text-xs font-bold text-gray-700 mb-1">
									Contact Phone
								</label>
								<input
									type="tel"
									value={formData.serviceDetails.crewConcierge.contactPhone}
									onChange={(e) =>
										handleServiceDetailChange(
											"crewConcierge",
											"contactPhone",
											e.target.value
										)
									}
									className="w-full px-3 py-2 text-sm border rounded-lg"
								/>
							</div>
							<div>
								<label className="block text-xs font-bold text-gray-700 mb-1">
									Check-In Date
								</label>
								<input
									type="date"
									value={formData.serviceDetails.crewConcierge.checkInDate}
									onChange={(e) =>
										handleServiceDetailChange(
											"crewConcierge",
											"checkInDate",
											e.target.value
										)
									}
									className="w-full px-3 py-2 text-sm border rounded-lg"
								/>
							</div>
							<div>
								<label className="block text-xs font-bold text-gray-700 mb-1">
									Check-Out Date
								</label>
								<input
									type="date"
									value={formData.serviceDetails.crewConcierge.checkOutDate}
									onChange={(e) =>
										handleServiceDetailChange(
											"crewConcierge",
											"checkOutDate",
											e.target.value
										)
									}
									className="w-full px-3 py-2 text-sm border rounded-lg"
								/>
							</div>
							<div>
								<label className="block text-xs font-bold text-gray-700 mb-1">
									Number of Rooms
								</label>
								<input
									type="number"
									value={formData.serviceDetails.crewConcierge.numberOfRooms}
									onChange={(e) =>
										handleServiceDetailChange(
											"crewConcierge",
											"numberOfRooms",
											e.target.value
										)
									}
									className="w-full px-3 py-2 text-sm border rounded-lg"
								/>
							</div>
							<div>
								<label className="block text-xs font-bold text-gray-700 mb-1">
									Room Rate (per night)
								</label>
								<input
									type="number"
									step="0.01"
									value={formData.serviceDetails.crewConcierge.roomRate}
									onChange={(e) =>
										handleServiceDetailChange(
											"crewConcierge",
											"roomRate",
											e.target.value
										)
									}
									className="w-full px-3 py-2 text-sm border rounded-lg"
								/>
							</div>
							<div>
								<label className="block text-xs font-bold text-gray-700 mb-1">
									Total Cost
								</label>
								<input
									type="number"
									step="0.01"
									value={formData.serviceDetails.crewConcierge.totalCost}
									onChange={(e) =>
										handleServiceDetailChange(
											"crewConcierge",
											"totalCost",
											e.target.value
										)
									}
									className="w-full px-3 py-2 text-sm border rounded-lg bg-gray-100 font-bold"
								/>
							</div>
							<div>
								<label className="block text-xs font-bold text-gray-700 mb-1">
									Currency
								</label>
								<select
									value={formData.serviceDetails.crewConcierge.currency}
									onChange={(e) =>
										handleServiceDetailChange(
											"crewConcierge",
											"currency",
											e.target.value
										)
									}
									className="w-full px-3 py-2 text-sm border rounded-lg"
								>
									<option>USD</option>
									<option>EUR</option>
									<option>GBP</option>
								</select>
							</div>
							<div>
								<label className="block text-xs font-bold text-gray-700 mb-1">
									Service Status *
								</label>
								<select
									value={formData.serviceDetails.crewConcierge.status}
									onChange={(e) =>
										handleServiceDetailChange(
											"crewConcierge",
											"status",
											e.target.value
										)
									}
									className="w-full px-3 py-2 text-sm border-2 border-green-400 rounded-lg bg-green-50 font-bold"
								>
									{SERVICE_STATUSES.map((status) => (
										<option key={status} value={status}>
											{status}
										</option>
									))}
								</select>
							</div>
							<div className="flex items-center gap-4 md:col-span-2">
								<label className="flex items-center gap-2">
									<input
										type="checkbox"
										checked={
											formData.serviceDetails.crewConcierge.transportation
										}
										onChange={(e) =>
											handleServiceDetailChange(
												"crewConcierge",
												"transportation",
												e.target.checked
											)
										}
										className="w-4 h-4"
									/>
									<span className="text-sm font-bold">
										Transportation Required
									</span>
								</label>
								<label className="flex items-center gap-2">
									<input
										type="checkbox"
										checked={formData.serviceDetails.crewConcierge.mealVouchers}
										onChange={(e) =>
											handleServiceDetailChange(
												"crewConcierge",
												"mealVouchers",
												e.target.checked
											)
										}
										className="w-4 h-4"
									/>
									<span className="text-sm font-bold">Meal Vouchers</span>
								</label>
							</div>
							<div className="md:col-span-4">
								<label className="block text-xs font-bold text-gray-700 mb-1">
									Special Requests
								</label>
								<textarea
									rows="2"
									value={formData.serviceDetails.crewConcierge.specialRequests}
									onChange={(e) =>
										handleServiceDetailChange(
											"crewConcierge",
											"specialRequests",
											e.target.value
										)
									}
									className="w-full px-3 py-2 text-sm border rounded-lg"
									placeholder="Special dietary needs, room preferences, etc..."
								/>
							</div>
							{renderDocumentUpload("crewConcierge")}
						</div>
					</div>
				)}

				{/* Continue with remaining services in next response due to length... */}

				{/* AIRCRAFT HANDLING */}
				{formData.services.groundHandling &&
					formData.services.groundSubServices.aircraftHandling && (
						<div className="p-5 border-2 border-green-300 rounded-xl bg-green-50">
							<div className="flex items-center gap-2 mb-4 pb-3 border-b-2 border-green-200">
								<span className="text-2xl">✈️</span>
								<h3 className="text-lg font-bold text-gray-900">
									Aircraft Handling
								</h3>
							</div>
							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
								<div className="md:col-span-2">
									<label className="block text-xs font-bold text-gray-700 mb-1">
										Ground Handler *
									</label>
									<select
										value={formData.serviceDetails.aircraftHandling.vendor}
										onChange={(e) =>
											handleServiceDetailChange(
												"aircraftHandling",
												"vendor",
												e.target.value
											)
										}
										className="w-full px-3 py-2 text-sm border-2 border-green-400 rounded-lg bg-white"
									>
										<option value="">-- Select Handler --</option>
										{GROUND_HANDLERS.map((handler, idx) => (
											<option key={idx} value={handler}>
												{handler}
											</option>
										))}
									</select>
								</div>
								<div>
									<label className="block text-xs font-bold text-gray-700 mb-1">
										Contact Person
									</label>
									<input
										type="text"
										value={
											formData.serviceDetails.aircraftHandling.contactPerson
										}
										onChange={(e) =>
											handleServiceDetailChange(
												"aircraftHandling",
												"contactPerson",
												e.target.value
											)
										}
										className="w-full px-3 py-2 text-sm border rounded-lg"
									/>
								</div>
								<div>
									<label className="block text-xs font-bold text-gray-700 mb-1">
										24/7 Ops Phone
									</label>
									<input
										type="tel"
										value={
											formData.serviceDetails.aircraftHandling.contactPhone
										}
										onChange={(e) =>
											handleServiceDetailChange(
												"aircraftHandling",
												"contactPhone",
												e.target.value
											)
										}
										className="w-full px-3 py-2 text-sm border rounded-lg"
									/>
								</div>
								<div>
									<label className="block text-xs font-bold text-gray-700 mb-1">
										Service Package
									</label>
									<select
										value={
											formData.serviceDetails.aircraftHandling.servicePackage
										}
										onChange={(e) =>
											handleServiceDetailChange(
												"aircraftHandling",
												"servicePackage",
												e.target.value
											)
										}
										className="w-full px-3 py-2 text-sm border rounded-lg"
									>
										<option>Basic</option>
										<option>Standard</option>
										<option>Premium</option>
										<option>VIP</option>
									</select>
								</div>
								<div>
									<label className="block text-xs font-bold text-gray-700 mb-1">
										Parking Position
									</label>
									<input
										type="text"
										value={
											formData.serviceDetails.aircraftHandling.parkingPosition
										}
										onChange={(e) =>
											handleServiceDetailChange(
												"aircraftHandling",
												"parkingPosition",
												e.target.value
											)
										}
										placeholder="e.g., Ramp 7A"
										className="w-full px-3 py-2 text-sm border rounded-lg"
									/>
								</div>
								<div className="flex items-center">
									<label className="flex items-center gap-2">
										<input
											type="checkbox"
											checked={
												formData.serviceDetails.aircraftHandling.gpuRequired
											}
											onChange={(e) =>
												handleServiceDetailChange(
													"aircraftHandling",
													"gpuRequired",
													e.target.checked
												)
											}
											className="w-4 h-4"
										/>
										<span className="text-sm font-bold">GPU Required</span>
									</label>
								</div>
								<div>
									<label className="block text-xs font-bold text-gray-700 mb-1">
										Handling Fee
									</label>
									<input
										type="number"
										step="0.01"
										value={formData.serviceDetails.aircraftHandling.handlingFee}
										onChange={(e) =>
											handleServiceDetailChange(
												"aircraftHandling",
												"handlingFee",
												e.target.value
											)
										}
										className="w-full px-3 py-2 text-sm border rounded-lg"
									/>
								</div>
								<div>
									<label className="block text-xs font-bold text-gray-700 mb-1">
										Parking Fee
									</label>
									<input
										type="number"
										step="0.01"
										value={formData.serviceDetails.aircraftHandling.parkingFee}
										onChange={(e) =>
											handleServiceDetailChange(
												"aircraftHandling",
												"parkingFee",
												e.target.value
											)
										}
										className="w-full px-3 py-2 text-sm border rounded-lg"
									/>
								</div>
								<div>
									<label className="block text-xs font-bold text-gray-700 mb-1">
										Landing Fee
									</label>
									<input
										type="number"
										step="0.01"
										value={formData.serviceDetails.aircraftHandling.landingFee}
										onChange={(e) =>
											handleServiceDetailChange(
												"aircraftHandling",
												"landingFee",
												e.target.value
											)
										}
										className="w-full px-3 py-2 text-sm border rounded-lg"
									/>
								</div>
								<div>
									<label className="block text-xs font-bold text-gray-700 mb-1">
										Total Cost
									</label>
									<input
										type="number"
										step="0.01"
										value={formData.serviceDetails.aircraftHandling.totalCost}
										onChange={(e) =>
											handleServiceDetailChange(
												"aircraftHandling",
												"totalCost",
												e.target.value
											)
										}
										className="w-full px-3 py-2 text-sm border rounded-lg bg-gray-100 font-bold"
									/>
								</div>
								<div>
									<label className="block text-xs font-bold text-gray-700 mb-1">
										Currency
									</label>
									<select
										value={formData.serviceDetails.aircraftHandling.currency}
										onChange={(e) =>
											handleServiceDetailChange(
												"aircraftHandling",
												"currency",
												e.target.value
											)
										}
										className="w-full px-3 py-2 text-sm border rounded-lg"
									>
										<option>USD</option>
										<option>EUR</option>
										<option>GBP</option>
									</select>
								</div>
								<div>
									<label className="block text-xs font-bold text-gray-700 mb-1">
										Service Status *
									</label>
									<select
										value={formData.serviceDetails.aircraftHandling.status}
										onChange={(e) =>
											handleServiceDetailChange(
												"aircraftHandling",
												"status",
												e.target.value
											)
										}
										className="w-full px-3 py-2 text-sm border-2 border-green-400 rounded-lg bg-green-50 font-bold"
									>
										{SERVICE_STATUSES.map((status) => (
											<option key={status} value={status}>
												{status}
											</option>
										))}
									</select>
								</div>
								<div className="md:col-span-4">
									<label className="block text-xs font-bold text-gray-700 mb-1">
										Special Instructions
									</label>
									<textarea
										rows="2"
										value={
											formData.serviceDetails.aircraftHandling
												.specialInstructions
										}
										onChange={(e) =>
											handleServiceDetailChange(
												"aircraftHandling",
												"specialInstructions",
												e.target.value
											)
										}
										className="w-full px-3 py-2 text-sm border rounded-lg"
										placeholder="Any special requirements or instructions..."
									/>
								</div>
								{renderDocumentUpload("aircraftHandling")}
							</div>
						</div>
					)}

				{/* CATERING - Continue similarly for all other services... */}
				{formData.services.groundHandling &&
					formData.services.groundSubServices.catering && (
						<div className="p-5 border-2 border-orange-300 rounded-xl bg-orange-50">
							<div className="flex items-center gap-2 mb-4 pb-3 border-b-2 border-orange-200">
								<span className="text-2xl">🍽️</span>
								<h3 className="text-lg font-bold text-gray-900">
									Catering Services
								</h3>
							</div>
							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
								<div className="md:col-span-2">
									<label className="block text-xs font-bold text-gray-700 mb-1">
										Catering Vendor *
									</label>
									<select
										value={formData.serviceDetails.catering.vendor}
										onChange={(e) =>
											handleServiceDetailChange(
												"catering",
												"vendor",
												e.target.value
											)
										}
										className="w-full px-3 py-2 text-sm border-2 border-orange-400 rounded-lg bg-white"
									>
										<option value="">-- Select Vendor --</option>
										{CATERING_VENDORS.map((vendor, idx) => (
											<option key={idx} value={vendor}>
												{vendor}
											</option>
										))}
									</select>
								</div>
								<div>
									<label className="block text-xs font-bold text-gray-700 mb-1">
										Contact Person
									</label>
									<input
										type="text"
										value={formData.serviceDetails.catering.contactPerson}
										onChange={(e) =>
											handleServiceDetailChange(
												"catering",
												"contactPerson",
												e.target.value
											)
										}
										className="w-full px-3 py-2 text-sm border rounded-lg"
									/>
								</div>
								<div>
									<label className="block text-xs font-bold text-gray-700 mb-1">
										Contact Phone
									</label>
									<input
										type="tel"
										value={formData.serviceDetails.catering.contactPhone}
										onChange={(e) =>
											handleServiceDetailChange(
												"catering",
												"contactPhone",
												e.target.value
											)
										}
										className="w-full px-3 py-2 text-sm border rounded-lg"
									/>
								</div>
								<div>
									<label className="block text-xs font-bold text-gray-700 mb-1">
										Meal Type
									</label>
									<select
										value={formData.serviceDetails.catering.mealType}
										onChange={(e) =>
											handleServiceDetailChange(
												"catering",
												"mealType",
												e.target.value
											)
										}
										className="w-full px-3 py-2 text-sm border rounded-lg"
									>
										<option>Standard</option>
										<option>Gourmet</option>
										<option>VIP</option>
										<option>Special Diet</option>
									</select>
								</div>
								<div>
									<label className="block text-xs font-bold text-gray-700 mb-1">
										Number of Passengers
									</label>
									<input
										type="number"
										value={formData.serviceDetails.catering.numberOfPax}
										onChange={(e) =>
											handleServiceDetailChange(
												"catering",
												"numberOfPax",
												e.target.value
											)
										}
										className="w-full px-3 py-2 text-sm border rounded-lg"
									/>
								</div>
								<div>
									<label className="block text-xs font-bold text-gray-700 mb-1">
										Total Cost
									</label>
									<input
										type="number"
										step="0.01"
										value={formData.serviceDetails.catering.totalCost}
										onChange={(e) =>
											handleServiceDetailChange(
												"catering",
												"totalCost",
												e.target.value
											)
										}
										className="w-full px-3 py-2 text-sm border rounded-lg bg-gray-100 font-bold"
									/>
								</div>
								<div>
									<label className="block text-xs font-bold text-gray-700 mb-1">
										Currency
									</label>
									<select
										value={formData.serviceDetails.catering.currency}
										onChange={(e) =>
											handleServiceDetailChange(
												"catering",
												"currency",
												e.target.value
											)
										}
										className="w-full px-3 py-2 text-sm border rounded-lg"
									>
										<option>USD</option>
										<option>EUR</option>
										<option>GBP</option>
									</select>
								</div>
								<div>
									<label className="block text-xs font-bold text-gray-700 mb-1">
										Delivery Time
									</label>
									<input
										type="time"
										value={formData.serviceDetails.catering.deliveryTime}
										onChange={(e) =>
											handleServiceDetailChange(
												"catering",
												"deliveryTime",
												e.target.value
											)
										}
										className="w-full px-3 py-2 text-sm border rounded-lg"
									/>
								</div>
								<div>
									<label className="block text-xs font-bold text-gray-700 mb-1">
										Service Status *
									</label>
									<select
										value={formData.serviceDetails.catering.status}
										onChange={(e) =>
											handleServiceDetailChange(
												"catering",
												"status",
												e.target.value
											)
										}
										className="w-full px-3 py-2 text-sm border-2 border-green-400 rounded-lg bg-green-50 font-bold"
									>
										{SERVICE_STATUSES.map((status) => (
											<option key={status} value={status}>
												{status}
											</option>
										))}
									</select>
								</div>
								<div className="md:col-span-2">
									<label className="block text-xs font-bold text-gray-700 mb-1">
										Menu Details
									</label>
									<textarea
										rows="2"
										value={formData.serviceDetails.catering.menuDetails}
										onChange={(e) =>
											handleServiceDetailChange(
												"catering",
												"menuDetails",
												e.target.value
											)
										}
										className="w-full px-3 py-2 text-sm border rounded-lg"
										placeholder="Breakfast, lunch, dinner, snacks..."
									/>
								</div>
								<div className="md:col-span-2">
									<label className="block text-xs font-bold text-gray-700 mb-1">
										Special Dietary Requirements
									</label>
									<textarea
										rows="2"
										value={formData.serviceDetails.catering.specialDietary}
										onChange={(e) =>
											handleServiceDetailChange(
												"catering",
												"specialDietary",
												e.target.value
											)
										}
										className="w-full px-3 py-2 text-sm border rounded-lg"
										placeholder="Allergies, vegetarian, vegan, kosher, halal, etc..."
									/>
								</div>
								{renderDocumentUpload("catering")}
							</div>
						</div>
					)}

				{/* Add similar detailed sections for: deicing, lavatory, ramp, water services */}
				{/* (Pattern is the same - just change the fields appropriately) */}

				{/* Final Summary */}
				<div className="p-5 bg-gradient-to-r from-green-600 to-green-700 rounded-xl text-white">
					<h3 className="text-lg font-bold mb-3">✅ Trip Summary</h3>
					<div className="grid md:grid-cols-4 gap-4 text-sm">
						<div>
							<p className="text-green-200 text-xs mb-1">SERVICES</p>
							<p className="text-2xl font-bold">
								{
									[
										formData.services.fuel,
										formData.services.permits,
										formData.services.crewConcierge,
										formData.services.groundHandling,
									].filter(Boolean).length
								}
							</p>
						</div>
						<div>
							<p className="text-green-200 text-xs mb-1">CREW</p>
							<p className="text-2xl font-bold">
								{formData.pilotIds.length + formData.faIds.length}
							</p>
						</div>
						<div>
							<p className="text-green-200 text-xs mb-1">PASSENGERS</p>
							<p className="text-2xl font-bold">
								{formData.passengerIds.length}
							</p>
						</div>
						<div>
							<p className="text-green-200 text-xs mb-1">STATUS</p>
							<p className="text-2xl font-bold">Ready</p>
						</div>
					</div>
				</div>
			</div>
		);
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4">
			<div className="max-w-6xl mx-auto">
				{/* Progress */}
				<div className="mb-6">
					<div className="flex items-center justify-between">
						{[
							{ num: 1, label: "Journey Info" },
							{ num: 2, label: "Services" },
							{ num: 3, label: "Details & Review" },
						].map((step, index) => (
							<React.Fragment key={step.num}>
								<div className="flex flex-col items-center">
									<div
										className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
											currentStep === step.num
												? "bg-blue-500 text-white shadow-md scale-110"
												: currentStep > step.num
												? "bg-green-500 text-white"
												: "bg-gray-200 text-gray-600"
										}`}
									>
										{currentStep > step.num ? (
											<CheckCircle className="w-5 h-5" />
										) : (
											step.num
										)}
									</div>
									<p className="text-xs font-bold text-gray-700 mt-1">
										{step.label}
									</p>
								</div>
								{index < 2 && (
									<div
										className={`flex-1 h-0.5 mx-2 ${
											currentStep > step.num ? "bg-green-500" : "bg-gray-200"
										}`}
									/>
								)}
							</React.Fragment>
						))}
					</div>
				</div>

				{/* Form Content */}
				<div className="bg-white rounded-xl shadow-md p-5">
					{currentStep === 1 && renderStep1()}
					{currentStep === 2 && renderStep2()}
					{currentStep === 3 && renderStep3()}

					{/* Navigation */}
					<div className="flex justify-between mt-6 pt-4 border-t-2 border-gray-200">
						<button
							onClick={currentStep === 1 ? onCancel : handlePrevious}
							className="px-4 py-2 text-sm text-gray-700 bg-white border-2 border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2"
						>
							<ChevronLeft className="w-4 h-4" />
							{currentStep === 1 ? "Cancel" : "Previous"}
						</button>

						{currentStep < 3 ? (
							<button
								onClick={handleNext}
								className="px-4 py-2 text-sm text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg hover:shadow-lg flex items-center gap-2"
							>
								Next
								<ChevronRight className="w-4 h-4" />
							</button>
						) : (
							<button
								onClick={handleSubmit}
								className="px-6 py-3 text-base text-white bg-gradient-to-r from-green-600 to-green-700 rounded-lg hover:shadow-lg flex items-center gap-2"
							>
								<Save className="w-4 h-4" />
								Save Trip
							</button>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default AddTrip;
