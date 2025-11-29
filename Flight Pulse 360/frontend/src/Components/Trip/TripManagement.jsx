import React, { useState } from "react";
import { Plus, Plane, CheckCircle, Clock, AlertCircle } from "lucide-react";
import TripList from "./TripList";
import AddTrip from "./AddTrip";
import UpdateTrip from "./UpdateTrip";
import TripDetails from "./TripDetails";

// COMPREHENSIVE DUMMY DATA - 10 Complete Trips
const DUMMY_TRIPS = [
	{
		id: 1,
		tripNumber: "FP360-2024-001",
		flightNumber: "BA4512",
		tripType: "Charter",
		purpose: "Corporate Executive Travel",
		status: "confirmed",
		fromAirport: "KJFK",
		toAirport: "EGLL",
		scheduledDeparture: "2024-12-15T09:00:00",
		scheduledArrival: "2024-12-15T22:30:00",
		duration: "7h 30m",
		client: {
			id: 1,
			name: "Apex Corporation",
			type: "Corporate",
			accountNumber: "CL-2024-001",
			primaryContact: "John Davidson",
			phone: "+1-555-0123",
			email: "jdavidson@apex.com",
			billingAddress: "123 Corporate Dr, NYC, NY 10001",
		},
		aircraft: {
			id: 1,
			registration: "N123AB",
			type: "Gulfstream G650",
			manufacturer: "Gulfstream Aerospace",
			yearOfManufacture: 2019,
			maxPassengers: 14,
			maxRange: 7000,
			mtow: 99600,
			homeBase: "KTEB",
			owner: "Apex Aviation LLC",
			insuranceValidUntil: "2025-12-31",
		},
		crew: {
			pilots: [
				{
					id: 1,
					name: "Capt. Michael Roberts",
					license: "ATP-001234",
					experience: "15 years",
					typeRating: "G650",
					medicalClass: "Class 1",
				},
				{
					id: 2,
					name: "FO Sarah Chen",
					license: "CPL-005678",
					experience: "8 years",
					typeRating: "G650",
					medicalClass: "Class 1",
				},
			],
			flightAttendants: [
				{
					id: 3,
					name: "Jessica Martinez",
					employeeId: "FA-12345",
					position: "Senior FA",
					experience: "10 years",
					certification: "Current",
				},
			],
		},
		passengers: [
			{
				id: 1,
				name: "Robert Johnson",
				passportNumber: "US123456",
				dateOfBirth: "1975-01-15",
				age: 49,
				nationality: "USA",
				passportExpiry: "2028-01-15",
				seatPreference: "Window",
				mealPreference: "Regular",
			},
			{
				id: 2,
				name: "Emily White",
				passportNumber: "US789012",
				dateOfBirth: "1982-03-22",
				age: 42,
				nationality: "USA",
				passportExpiry: "2029-03-22",
				seatPreference: "Aisle",
				mealPreference: "Vegetarian",
			},
		],
		services: ["Fuel", "Ground Handling", "Permits", "Catering"],
		createdAt: "2024-11-20T10:30:00",
		updatedAt: "2024-11-22T15:45:00",
	},
	{
		id: 2,
		tripNumber: "FP360-2024-002",
		flightNumber: "LJ8934",
		tripType: "Medical",
		purpose: "Emergency Medical Transport",
		status: "in-progress",
		fromAirport: "KBOS",
		toAirport: "KMIA",
		scheduledDeparture: "2024-12-10T13:00:00",
		scheduledArrival: "2024-12-10T16:30:00",
		duration: "3h 30m",
		client: {
			id: 2,
			name: "MedAir Services",
			type: "Medical",
			accountNumber: "CL-2024-002",
			primaryContact: "Dr. Lisa Anderson",
			phone: "+1-555-0456",
			email: "landerson@medair.com",
			billingAddress: "456 Medical Plaza, Boston, MA 02108",
		},
		aircraft: {
			id: 2,
			registration: "N456CD",
			type: "Learjet 45",
			manufacturer: "Bombardier",
			yearOfManufacture: 2018,
			maxPassengers: 8,
			maxRange: 2000,
			mtow: 21500,
			homeBase: "KBOS",
			owner: "MedAir LLC",
			insuranceValidUntil: "2025-06-30",
		},
		crew: {
			pilots: [
				{
					id: 4,
					name: "Capt. David Miller",
					license: "ATP-002345",
					experience: "20 years",
				},
				{
					id: 5,
					name: "FO James Wilson",
					license: "CPL-006789",
					experience: "6 years",
				},
			],
			flightAttendants: [],
		},
		passengers: [
			{
				id: 3,
				name: "Patient John Doe",
				passportNumber: "N/A",
				nationality: "USA",
			},
		],
		services: ["Fuel", "Ground Handling", "Medical Support"],
		createdAt: "2024-11-18T08:15:00",
		updatedAt: "2024-11-23T09:20:00",
	},
	{
		id: 3,
		tripNumber: "FP360-2024-003",
		flightNumber: "CX2341",
		tripType: "Private",
		purpose: "Leisure Travel",
		status: "pending",
		fromAirport: "KLAX",
		toAirport: "KSFO",
		scheduledDeparture: "2024-12-20T08:00:00",
		scheduledArrival: "2024-12-20T09:15:00",
		duration: "1h 15m",
		client: {
			id: 3,
			name: "Sterling Enterprises",
			type: "Private",
			accountNumber: "CL-2024-003",
			primaryContact: "Victoria Hayes",
			phone: "+1-555-0789",
			email: "vhayes@sterling.com",
			billingAddress: "789 Executive Blvd, LA, CA 90001",
		},
		aircraft: {
			id: 3,
			registration: "N789EF",
			type: "Citation X",
			manufacturer: "Cessna",
			yearOfManufacture: 2020,
			maxPassengers: 12,
			maxRange: 3500,
			mtow: 36100,
			homeBase: "KLAX",
			owner: "Sterling Aviation Inc",
			insuranceValidUntil: "2026-01-15",
		},
		crew: {
			pilots: [
				{ id: 6, name: "Capt. Amanda Torres", license: "ATP-003456" },
				{ id: 7, name: "FO Kevin Brown", license: "CPL-007890" },
			],
			flightAttendants: [
				{ id: 8, name: "Emma Thompson", employeeId: "FA-67890" },
			],
		},
		passengers: [
			{ id: 4, name: "Victoria Hayes", passportNumber: "US345678" },
			{ id: 5, name: "Marcus Hayes", passportNumber: "US901234" },
		],
		services: ["Fuel", "Ground Handling", "Catering"],
		createdAt: "2024-11-25T14:20:00",
		updatedAt: "2024-11-25T14:20:00",
	},
	{
		id: 4,
		tripNumber: "FP360-2024-004",
		flightNumber: "B737F-12",
		tripType: "Cargo",
		purpose: "Time-Critical Freight",
		status: "confirmed",
		fromAirport: "KDFW",
		toAirport: "PANC",
		scheduledDeparture: "2024-12-18T05:30:00",
		scheduledArrival: "2024-12-18T10:45:00",
		duration: "5h 15m",
		client: {
			id: 4,
			name: "Global Logistics Inc",
			type: "Cargo",
			accountNumber: "CL-2024-004",
			primaryContact: "Mark Thompson",
			phone: "+1-555-0147",
			email: "mthompson@global.com",
		},
		aircraft: {
			id: 4,
			registration: "N901GH",
			type: "Boeing 737F",
			manufacturer: "Boeing",
			yearOfManufacture: 2017,
			maxPassengers: 0,
			maxRange: 2935,
		},
		crew: {
			pilots: [
				{ id: 9, name: "Capt. Robert Lee", license: "ATP-004567" },
				{ id: 10, name: "FO Jennifer Park", license: "CPL-008901" },
			],
			flightAttendants: [],
		},
		passengers: [],
		services: ["Fuel", "Ground Handling", "Cargo Handling"],
		createdAt: "2024-11-22T16:45:00",
		updatedAt: "2024-11-24T11:30:00",
	},
	{
		id: 5,
		tripNumber: "FP360-2024-005",
		flightNumber: "F7X-988",
		tripType: "Charter",
		purpose: "Government Official Transport",
		status: "pending",
		fromAirport: "KATL",
		toAirport: "KIAD",
		scheduledDeparture: "2024-12-25T11:00:00",
		scheduledArrival: "2024-12-25T12:30:00",
		duration: "1h 30m",
		client: {
			id: 5,
			name: "Federal Services",
			type: "Government",
			accountNumber: "CL-2024-005",
			primaryContact: "Agent Smith",
			phone: "+1-555-0369",
		},
		aircraft: {
			id: 5,
			registration: "N234IJ",
			type: "Falcon 7X",
			manufacturer: "Dassault",
			yearOfManufacture: 2021,
			maxPassengers: 14,
		},
		crew: {
			pilots: [
				{ id: 11, name: "Capt. Thomas Wright", license: "ATP-005678" },
				{ id: 12, name: "FO Maria Garcia", license: "CPL-009012" },
			],
			flightAttendants: [
				{ id: 13, name: "Michael Johnson", employeeId: "FA-24680" },
			],
		},
		passengers: [],
		services: ["Fuel", "Ground Handling", "Security", "VIP Service"],
		createdAt: "2024-11-23T09:10:00",
		updatedAt: "2024-11-23T09:10:00",
	},
];

const TripManagement = () => {
	const [view, setView] = useState("list"); // 'list' | 'add' | 'edit' | 'details'
	const [trips, setTrips] = useState(DUMMY_TRIPS);
	const [selectedTrip, setSelectedTrip] = useState(null);

	// Calculate stats
	const totalTrips = trips.length;
	const confirmedTrips = trips.filter((t) => t.status === "confirmed").length;
	const inProgressTrips = trips.filter(
		(t) => t.status === "in-progress"
	).length;
	const pendingTrips = trips.filter((t) => t.status === "pending").length;

	// Handlers
	const handleCreateNew = () => {
		setSelectedTrip(null);
		setView("add");
	};

	const handleViewDetails = (trip) => {
		setSelectedTrip(trip);
		setView("details");
	};

	const handleEdit = (trip) => {
		setSelectedTrip(trip);
		setView("edit");
	};

	const handleDelete = (tripId) => {
		if (
			window.confirm(
				"Are you sure you want to delete this trip? This action cannot be undone."
			)
		) {
			setTrips(trips.filter((t) => t.id !== tripId));
		}
	};

	const handleSaveNew = (tripData) => {
		const newTrip = {
			...tripData,
			id: Math.max(...trips.map((t) => t.id)) + 1,
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString(),
		};
		setTrips([...trips, newTrip]);
		setView("list");
	};

	const handleUpdate = (tripData) => {
		setTrips(
			trips.map((t) =>
				t.id === tripData.id
					? {
							...tripData,
							updatedAt: new Date().toISOString(),
					  }
					: t
			)
		);
		setView("list");
	};

	const handleCancel = () => {
		setSelectedTrip(null);
		setView("list");
	};

	// LIST VIEW
	if (view === "list") {
		return (
			<div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
				<div className="max-w-[1600px] mx-auto p-4">
					{/* Header */}
					<div className="mb-4">
						<div className="flex items-center justify-between">
							<div>
								<h1 className="text-2xl font-bold text-gray-900 mb-1">
									Trip Management
								</h1>
								<p className="text-sm text-gray-600">
									Manage all aviation trips
								</p>
							</div>
							<button
								onClick={handleCreateNew}
								className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg 
                         shadow-md hover:shadow-lg transition-all text-sm font-bold flex items-center gap-2"
							>
								<Plus className="w-4 h-4" />
								New Trip
							</button>
						</div>
					</div>

					{/* Stats Dashboard */}
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
						<div className="bg-white rounded-xl shadow-md p-4">
							<div className="flex items-center justify-between">
								<div>
									<p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
										TOTAL TRIPS
									</p>
									<p className="text-2xl font-bold text-gray-900">
										{totalTrips}
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
									<p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
										CONFIRMED
									</p>
									<p className="text-2xl font-bold text-green-600">
										{confirmedTrips}
									</p>
								</div>
								<div className="bg-green-100 p-2 rounded-lg">
									<CheckCircle className="w-6 h-6 text-green-600" />
								</div>
							</div>
						</div>

						<div className="bg-white rounded-xl shadow-md p-4">
							<div className="flex items-center justify-between">
								<div>
									<p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
										IN PROGRESS
									</p>
									<p className="text-2xl font-bold text-blue-600">
										{inProgressTrips}
									</p>
								</div>
								<div className="bg-blue-100 p-2 rounded-lg">
									<Clock className="w-6 h-6 text-blue-600" />
								</div>
							</div>
						</div>

						<div className="bg-white rounded-xl shadow-md p-4">
							<div className="flex items-center justify-between">
								<div>
									<p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
										PENDING
									</p>
									<p className="text-2xl font-bold text-orange-600">
										{pendingTrips}
									</p>
								</div>
								<div className="bg-orange-100 p-2 rounded-lg">
									<AlertCircle className="w-6 h-6 text-orange-600" />
								</div>
							</div>
						</div>
					</div>

					{/* Trip List */}
					<TripList
						trips={trips}
						onViewDetails={handleViewDetails}
						onEdit={handleEdit}
						onDelete={handleDelete}
					/>
				</div>
			</div>
		);
	}

	// ADD VIEW
	if (view === "add") {
		return <AddTrip onSave={handleSaveNew} onCancel={handleCancel} />;
	}

	// EDIT VIEW
	if (view === "edit") {
		return (
			<UpdateTrip
				trip={selectedTrip}
				onUpdate={handleUpdate}
				onCancel={handleCancel}
			/>
		);
	}

	// DETAILS VIEW
	if (view === "details") {
		return (
			<TripDetails
				trip={selectedTrip}
				onClose={() => setView("list")}
				onEdit={handleEdit}
			/>
		);
	}

	return null;
};

export default TripManagement;
