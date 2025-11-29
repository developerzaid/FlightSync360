import React from "react";
import {
	X,
	Edit,
	MapPin,
	Calendar,
	Users,
	Settings,
	Clock,
	DollarSign,
	FileText,
	Package,
	User,
	Plane as PlaneIcon,
} from "lucide-react";

const TripDetails = ({ trip, onClose, onEdit }) => {
	if (!trip) return null;

	const getStatusColor = (status) => {
		const colors = {
			confirmed: "bg-green-500",
			"in-progress": "bg-blue-500",
			pending: "bg-orange-500",
			completed: "bg-gray-500",
			cancelled: "bg-red-500",
		};
		return colors[status] || "bg-gray-500";
	};

	const getServiceStatusBadge = (status) => {
		const badges = {
			requested: "bg-gray-100 text-gray-700",
			quoted: "bg-blue-100 text-blue-700",
			confirmed: "bg-green-100 text-green-700",
			processing: "bg-yellow-100 text-yellow-700",
			"in-progress": "bg-indigo-100 text-indigo-700",
			completed: "bg-green-100 text-green-700",
			"ready-for-invoice": "bg-purple-100 text-purple-700",
			invoiced: "bg-orange-100 text-orange-700",
			paid: "bg-green-100 text-green-700",
			cancelled: "bg-red-100 text-red-700",
		};
		return badges[status] || badges.requested;
	};

	return (
		<div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
			<div className="bg-white rounded-xl shadow-2xl max-w-7xl w-full max-h-[90vh] overflow-y-auto">
				{/* Header */}
				<div className="sticky top-0 bg-gradient-to-r from-blue-600 to-blue-700 p-5 flex items-center justify-between">
					<div className="flex items-center gap-3">
						<div className="p-2 bg-white/20 rounded-lg">
							<MapPin className="w-6 h-6 text-white" />
						</div>
						<div>
							<h2 className="text-lg font-bold text-white">
								{trip.tripNumber} | {trip.flightNumber}
							</h2>
							<p className="text-sm text-blue-100">{trip.purpose}</p>
						</div>
					</div>
					<div className="flex items-center gap-2">
						<button
							onClick={() => onEdit(trip)}
							className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg text-sm flex items-center gap-2"
						>
							<Edit className="w-4 h-4" />
							Edit
						</button>
						<button
							onClick={onClose}
							className="p-1.5 hover:bg-white/20 rounded-lg"
						>
							<X className="w-5 h-5 text-white" />
						</button>
					</div>
				</div>

				{/* Content */}
				<div className="p-5 space-y-4">
					{/* Quick Stats */}
					<div className="grid grid-cols-2 md:grid-cols-4 gap-3">
						<div className="p-3 bg-gray-50 rounded-lg">
							<p className="text-xs font-medium text-gray-500 mb-1">STATUS</p>
							<div className="flex items-center gap-2">
								<div
									className={`w-2 h-2 rounded-full ${getStatusColor(
										trip.status
									)}`}
								></div>
								<p className="text-sm font-bold text-gray-900 capitalize">
									{trip.status}
								</p>
							</div>
						</div>
						<div className="p-3 bg-gray-50 rounded-lg">
							<p className="text-xs font-medium text-gray-500 mb-1">
								TRIP TYPE
							</p>
							<p className="text-sm font-bold text-gray-900">{trip.tripType}</p>
						</div>
						<div className="p-3 bg-gray-50 rounded-lg">
							<p className="text-xs font-medium text-gray-500 mb-1">DATE</p>
							<p className="text-sm font-bold text-gray-900">
								{new Date(trip.scheduledDeparture).toLocaleDateString()}
							</p>
						</div>
						<div className="p-3 bg-gray-50 rounded-lg">
							<p className="text-xs font-medium text-gray-500 mb-1">DURATION</p>
							<p className="text-sm font-bold text-gray-900">{trip.duration}</p>
						</div>
					</div>

					{/* Flight Route */}
					<div className="bg-white border-2 border-blue-200 rounded-xl p-4">
						<h3 className="text-base font-bold text-gray-900 mb-3 flex items-center gap-2">
							<MapPin className="w-5 h-5 text-blue-600" />
							Flight Route
						</h3>
						<div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
							<div className="grid md:grid-cols-2 gap-4">
								<div>
									<p className="text-xs font-medium text-gray-500 mb-1">
										DEPARTURE
									</p>
									<p className="text-2xl font-bold text-gray-900">
										{trip.fromAirport}
									</p>
									<p className="text-sm text-gray-600 mt-1">
										{new Date(trip.scheduledDeparture).toLocaleString("en-US", {
											month: "short",
											day: "numeric",
											year: "numeric",
											hour: "2-digit",
											minute: "2-digit",
										})}
									</p>
								</div>
								<div>
									<p className="text-xs font-medium text-gray-500 mb-1">
										ARRIVAL
									</p>
									<p className="text-2xl font-bold text-gray-900">
										{trip.toAirport}
									</p>
									<p className="text-sm text-gray-600 mt-1">
										{new Date(trip.scheduledArrival).toLocaleString("en-US", {
											month: "short",
											day: "numeric",
											year: "numeric",
											hour: "2-digit",
											minute: "2-digit",
										})}
									</p>
								</div>
							</div>
						</div>
					</div>

					{/* CLIENT DETAILS - EXPANDED */}
					<div className="bg-white border-2 border-gray-300 rounded-xl p-4">
						<h3 className="text-base font-bold text-gray-900 mb-3 flex items-center gap-2">
							<User className="w-5 h-5 text-blue-600" />
							Client Details
						</h3>
						<div className="grid md:grid-cols-3 gap-3 text-sm">
							<div>
								<p className="text-xs font-medium text-gray-500">
									Company Name
								</p>
								<p className="text-sm font-bold text-gray-900">
									{trip.client.name}
								</p>
							</div>
							<div>
								<p className="text-xs font-medium text-gray-500">Client Type</p>
								<p className="text-sm font-bold text-gray-900">
									{trip.client.type}
								</p>
							</div>
							<div>
								<p className="text-xs font-medium text-gray-500">
									Account Number
								</p>
								<p className="text-sm font-mono font-bold text-gray-900">
									{trip.client.accountNumber}
								</p>
							</div>
							<div>
								<p className="text-xs font-medium text-gray-500">
									Primary Contact
								</p>
								<p className="text-sm font-bold text-gray-900">
									{trip.client.primaryContact}
								</p>
							</div>
							<div>
								<p className="text-xs font-medium text-gray-500">Phone</p>
								<p className="text-sm font-bold text-gray-900">
									{trip.client.phone}
								</p>
							</div>
							<div>
								<p className="text-xs font-medium text-gray-500">Email</p>
								<p className="text-sm font-bold text-blue-600">
									{trip.client.email}
								</p>
							</div>
							<div className="md:col-span-3">
								<p className="text-xs font-medium text-gray-500">
									Billing Address
								</p>
								<p className="text-sm font-bold text-gray-900">
									{trip.client.billingAddress}
								</p>
							</div>
						</div>
					</div>

					{/* AIRCRAFT DETAILS - EXPANDED */}
					<div className="bg-white border-2 border-gray-300 rounded-xl p-4">
						<h3 className="text-base font-bold text-gray-900 mb-3 flex items-center gap-2">
							<PlaneIcon className="w-5 h-5 text-blue-600" />
							Aircraft Details
						</h3>
						<div className="grid md:grid-cols-4 gap-3 text-sm">
							<div>
								<p className="text-xs font-medium text-gray-500">
									Registration
								</p>
								<p className="text-base font-mono font-bold text-gray-900">
									{trip.aircraft.registration}
								</p>
							</div>
							<div>
								<p className="text-xs font-medium text-gray-500">
									Aircraft Type
								</p>
								<p className="text-sm font-bold text-gray-900">
									{trip.aircraft.type}
								</p>
							</div>
							<div>
								<p className="text-xs font-medium text-gray-500">
									Manufacturer
								</p>
								<p className="text-sm font-bold text-gray-900">
									{trip.aircraft.manufacturer}
								</p>
							</div>
							<div>
								<p className="text-xs font-medium text-gray-500">Year</p>
								<p className="text-sm font-bold text-gray-900">
									{trip.aircraft.yearOfManufacture}
								</p>
							</div>
							<div>
								<p className="text-xs font-medium text-gray-500">
									Max Passengers
								</p>
								<p className="text-sm font-bold text-gray-900">
									{trip.aircraft.maxPassengers}
								</p>
							</div>
							<div>
								<p className="text-xs font-medium text-gray-500">Max Range</p>
								<p className="text-sm font-bold text-gray-900">
									{trip.aircraft.maxRange} nm
								</p>
							</div>
							<div>
								<p className="text-xs font-medium text-gray-500">MTOW</p>
								<p className="text-sm font-bold text-gray-900">
									{trip.aircraft.mtow} lbs
								</p>
							</div>
							<div>
								<p className="text-xs font-medium text-gray-500">Home Base</p>
								<p className="text-sm font-mono font-bold text-gray-900">
									{trip.aircraft.homeBase}
								</p>
							</div>
							<div>
								<p className="text-xs font-medium text-gray-500">
									Owner/Operator
								</p>
								<p className="text-sm font-bold text-gray-900">
									{trip.aircraft.owner}
								</p>
							</div>
							<div>
								<p className="text-xs font-medium text-gray-500">
									Insurance Valid Until
								</p>
								<p className="text-sm font-bold text-gray-900">
									{trip.aircraft.insuranceValidUntil}
								</p>
							</div>
						</div>
					</div>

					{/* CREW DETAILS - EXPANDED */}
					<div className="bg-white border-2 border-gray-300 rounded-xl p-4">
						<h3 className="text-base font-bold text-gray-900 mb-3 flex items-center gap-2">
							<Users className="w-5 h-5 text-blue-600" />
							Crew Details
						</h3>

						<div className="mb-4">
							<h4 className="text-sm font-bold text-indigo-900 mb-2">
								✈️ PILOTS
							</h4>
							<div className="grid md:grid-cols-2 gap-2">
								{trip.crew.pilots.map((pilot, idx) => (
									<div
										key={idx}
										className="p-3 bg-indigo-50 border border-indigo-200 rounded-lg"
									>
										<p className="text-sm font-bold text-gray-900">
											{pilot.name}
										</p>
										<div className="grid grid-cols-2 gap-2 mt-1 text-xs text-gray-600">
											<span>License: {pilot.license}</span>
											<span>Exp: {pilot.experience}</span>
											{pilot.typeRating && (
												<span>Type: {pilot.typeRating}</span>
											)}
											{pilot.medicalClass && (
												<span>Medical: {pilot.medicalClass}</span>
											)}
										</div>
									</div>
								))}
							</div>
						</div>

						{trip.crew.flightAttendants.length > 0 && (
							<div>
								<h4 className="text-sm font-bold text-purple-900 mb-2">
									👥 FLIGHT ATTENDANTS
								</h4>
								<div className="grid md:grid-cols-2 gap-2">
									{trip.crew.flightAttendants.map((fa, idx) => (
										<div
											key={idx}
											className="p-3 bg-purple-50 border border-purple-200 rounded-lg"
										>
											<p className="text-sm font-bold text-gray-900">
												{fa.name}
											</p>
											<div className="grid grid-cols-2 gap-2 mt-1 text-xs text-gray-600">
												<span>ID: {fa.employeeId}</span>
												<span>{fa.position}</span>
												<span>Exp: {fa.experience}</span>
												<span>Cert: {fa.certification}</span>
											</div>
										</div>
									))}
								</div>
							</div>
						)}
					</div>

					{/* PASSENGERS - EXPANDED */}
					{trip.passengers && trip.passengers.length > 0 && (
						<div className="bg-white border-2 border-gray-300 rounded-xl p-4">
							<h3 className="text-base font-bold text-gray-900 mb-3 flex items-center gap-2">
								<Users className="w-5 h-5 text-blue-600" />
								Passengers ({trip.passengers.length})
							</h3>
							<div className="grid md:grid-cols-2 gap-3">
								{trip.passengers.map((passenger, idx) => (
									<div
										key={idx}
										className="p-3 bg-gray-50 border border-gray-200 rounded-lg"
									>
										<p className="text-sm font-bold text-gray-900">
											{passenger.name}
										</p>
										<div className="grid grid-cols-2 gap-2 mt-2 text-xs text-gray-600">
											{passenger.passportNumber && (
												<span>Passport: {passenger.passportNumber}</span>
											)}
											{passenger.dateOfBirth && (
												<span>DOB: {passenger.dateOfBirth}</span>
											)}
											{passenger.age && <span>Age: {passenger.age} years</span>}
											{passenger.nationality && (
												<span>Nationality: {passenger.nationality}</span>
											)}
											{passenger.passportExpiry && (
												<span>Exp: {passenger.passportExpiry}</span>
											)}
											{passenger.seatPreference && (
												<span>Seat: {passenger.seatPreference}</span>
											)}
											{passenger.mealPreference && (
												<span>Meal: {passenger.mealPreference}</span>
											)}
										</div>
									</div>
								))}
							</div>
						</div>
					)}

					{/* SERVICES - DETAILED WITH STATUS */}
					<div className="bg-white border-2 border-gray-300 rounded-xl p-4">
						<h3 className="text-base font-bold text-gray-900 mb-3 flex items-center gap-2">
							<Package className="w-5 h-5 text-blue-600" />
							Services & Costs
						</h3>
						<div className="space-y-3">
							{trip.services.map((service, idx) => (
								<div
									key={idx}
									className="p-4 border-2 border-blue-200 rounded-lg bg-blue-50"
								>
									<div className="flex items-center justify-between mb-2">
										<h4 className="text-sm font-bold text-gray-900">
											{service}
										</h4>
										<span
											className={`px-2 py-0.5 rounded-full text-xs font-bold ${getServiceStatusBadge(
												"confirmed"
											)}`}
										>
											CONFIRMED
										</span>
									</div>
									<div className="grid md:grid-cols-4 gap-2 text-xs">
										<div>
											<p className="text-gray-500">Vendor</p>
											<p className="font-bold text-gray-900">Sample Vendor</p>
										</div>
										<div>
											<p className="text-gray-500">Contact</p>
											<p className="font-bold text-gray-900">+1-555-0000</p>
										</div>
										<div>
											<p className="text-gray-500">Cost</p>
											<p className="font-bold text-green-700">$5,000.00</p>
										</div>
										<div>
											<p className="text-gray-500">Documents</p>
											<p className="font-bold text-blue-600">3 files</p>
										</div>
									</div>
								</div>
							))}
						</div>

						<div className="mt-4 p-4 bg-green-50 border-2 border-green-300 rounded-lg">
							<div className="flex items-center justify-between">
								<span className="text-sm font-bold text-gray-900">
									TOTAL ESTIMATED COST
								</span>
								<span className="text-xl font-bold text-green-700">
									$20,000.00
								</span>
							</div>
						</div>
					</div>

					{/* ADDITIONAL INFO */}
					<div className="bg-gray-50 rounded-xl p-4">
						<h3 className="text-sm font-bold text-gray-700 mb-3">
							ADDITIONAL INFORMATION
						</h3>
						<div className="grid md:grid-cols-3 gap-3 text-sm">
							<div>
								<p className="text-xs font-medium text-gray-500">Created At</p>
								<p className="text-sm font-bold text-gray-900">
									{new Date(trip.createdAt).toLocaleString()}
								</p>
							</div>
							<div>
								<p className="text-xs font-medium text-gray-500">
									Last Updated
								</p>
								<p className="text-sm font-bold text-gray-900">
									{new Date(trip.updatedAt || trip.createdAt).toLocaleString()}
								</p>
							</div>
							<div>
								<p className="text-xs font-medium text-gray-500">Purpose</p>
								<p className="text-sm font-bold text-gray-900">
									{trip.purpose}
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default TripDetails;
