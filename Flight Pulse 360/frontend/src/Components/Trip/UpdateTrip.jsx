import React, { useState, useEffect } from "react";
import { X, Save } from "lucide-react";

const UpdateTrip = ({ isOpen, onClose, trip, onUpdate }) => {
	const [loading, setLoading] = useState(false);
	const [formData, setFormData] = useState({});

	useEffect(() => {
		if (trip) {
			setFormData({
				mt_tripType: trip.mt_tripType || "",
				mt_purpose: trip.mt_purpose || "",
				mt_status: trip.mt_status || "",
				mt_fromAirport: trip.mt_fromAirport || "",
				mt_toAirport: trip.mt_toAirport || "",
				mt_scheduledDepartureUtc:
					trip.mt_scheduledDepartureUtc?.slice(0, 16) || "",
				mt_scheduledDepartureLocal:
					trip.mt_scheduledDepartureLocal?.slice(0, 16) || "",
				mt_scheduledArrivalUtc: trip.mt_scheduledArrivalUtc?.slice(0, 16) || "",
				mt_scheduledArrivalLocal:
					trip.mt_scheduledArrivalLocal?.slice(0, 16) || "",
				mt_departureTimezone: trip.mt_departureTimezone || "",
				mt_arrivalTimezone: trip.mt_arrivalTimezone || "",
				mt_additionalNotes: trip.mt_additionalNotes || "",
				mt_dispatcherNotes: trip.mt_dispatcherNotes || "",
				mt_safetyNotes: trip.mt_safetyNotes || "",
				mt_regulatoryNotes: trip.mt_regulatoryNotes || "",
			});
		}
	}, [trip]);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			const response = await fetch(
				`http://localhost:8084/update-trip/${trip.uxTripId}`,
				{
					method: "PUT",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(formData),
				}
			);
			if (response.ok) {
				onUpdate();
			}
		} catch (error) {
			console.error("Error updating trip:", error);
		} finally {
			setLoading(false);
		}
	};

	if (!isOpen || !trip) return null;

	return (
		<div className="fixed inset-0 bg-black/60 z-50 flex items-start justify-center overflow-y-auto py-4">
			<div className="w-full max-w-5xl bg-white rounded-lg shadow-2xl mx-4">
				{/* Header */}
				<div className="bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-2 flex items-center justify-between">
					<h2 className="text-lg font-bold text-white">
						Update Trip: {trip.mt_tripNumber || trip.uxTripId}
					</h2>
					<button
						onClick={onClose}
						className="text-white hover:bg-white/20 p-1 rounded"
					>
						<X className="w-5 h-5" />
					</button>
				</div>

				{/* Form */}
				<form
					onSubmit={handleSubmit}
					className="p-4 max-h-[calc(100vh-200px)] overflow-y-auto"
				>
					<div className="space-y-4">
						{/* Basic Information */}
						<div className="border border-gray-300 rounded">
							<div className="bg-gray-100 px-3 py-1.5 border-b border-gray-300">
								<h3 className="text-sm font-bold text-gray-900">
									Basic Information
								</h3>
							</div>
							<div className="p-3 grid grid-cols-4 gap-3">
								<div>
									<label className="block text-xs font-semibold text-gray-700 mb-1">
										Trip Type*
									</label>
									<select
										name="mt_tripType"
										value={formData.mt_tripType}
										onChange={handleInputChange}
										className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
									>
										<option value="SINGLE_LEG">Single Leg</option>
										<option value="MULTI_LEG">Multi Leg</option>
									</select>
								</div>

								<div>
									<label className="block text-xs font-semibold text-gray-700 mb-1">
										Purpose*
									</label>
									<select
										name="mt_purpose"
										value={formData.mt_purpose}
										onChange={handleInputChange}
										className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
									>
										<option value="">Select Purpose</option>
										<option value="BUSINESS">Business</option>
										<option value="PERSONAL">Personal</option>
										<option value="EVAC">Evacuation</option>
										<option value="MEDICAL">Medical</option>
										<option value="CHARTER">Charter</option>
									</select>
								</div>

								<div>
									<label className="block text-xs font-semibold text-gray-700 mb-1">
										Status*
									</label>
									<select
										name="mt_status"
										value={formData.mt_status}
										onChange={handleInputChange}
										className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
									>
										<option value="DRAFT">Draft</option>
										<option value="PLANNED">Planned</option>
										<option value="CONFIRMED">Confirmed</option>
										<option value="IN_PROGRESS">In Progress</option>
										<option value="COMPLETED">Completed</option>
										<option value="CANCELLED">Cancelled</option>
									</select>
								</div>
							</div>
						</div>

						{/* Flight Details */}
						<div className="border border-gray-300 rounded">
							<div className="bg-gray-100 px-3 py-1.5 border-b border-gray-300">
								<h3 className="text-sm font-bold text-gray-900">
									Flight Details
								</h3>
							</div>
							<div className="p-3 grid grid-cols-4 gap-3">
								<div>
									<label className="block text-xs font-semibold text-gray-700 mb-1">
										From (ICAO)*
									</label>
									<input
										type="text"
										name="mt_fromAirport"
										value={formData.mt_fromAirport}
										onChange={handleInputChange}
										className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
									/>
								</div>

								<div>
									<label className="block text-xs font-semibold text-gray-700 mb-1">
										To (ICAO)*
									</label>
									<input
										type="text"
										name="mt_toAirport"
										value={formData.mt_toAirport}
										onChange={handleInputChange}
										className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
									/>
								</div>

								<div>
									<label className="block text-xs font-semibold text-gray-700 mb-1">
										Departure TZ
									</label>
									<input
										type="text"
										name="mt_departureTimezone"
										value={formData.mt_departureTimezone}
										onChange={handleInputChange}
										placeholder="Asia/Dubai"
										className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
									/>
								</div>

								<div>
									<label className="block text-xs font-semibold text-gray-700 mb-1">
										Arrival TZ
									</label>
									<input
										type="text"
										name="mt_arrivalTimezone"
										value={formData.mt_arrivalTimezone}
										onChange={handleInputChange}
										placeholder="Europe/London"
										className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
									/>
								</div>
							</div>
						</div>

						{/* Schedule */}
						<div className="border border-gray-300 rounded">
							<div className="bg-gray-100 px-3 py-1.5 border-b border-gray-300">
								<h3 className="text-sm font-bold text-gray-900">Schedule</h3>
							</div>
							<div className="p-3 grid grid-cols-4 gap-3">
								<div>
									<label className="block text-xs font-semibold text-gray-700 mb-1">
										Departure (UTC)*
									</label>
									<input
										type="datetime-local"
										name="mt_scheduledDepartureUtc"
										value={formData.mt_scheduledDepartureUtc}
										onChange={handleInputChange}
										className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
									/>
								</div>

								<div>
									<label className="block text-xs font-semibold text-gray-700 mb-1">
										Departure (Local)
									</label>
									<input
										type="datetime-local"
										name="mt_scheduledDepartureLocal"
										value={formData.mt_scheduledDepartureLocal}
										onChange={handleInputChange}
										className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
									/>
								</div>

								<div>
									<label className="block text-xs font-semibold text-gray-700 mb-1">
										Arrival (UTC)
									</label>
									<input
										type="datetime-local"
										name="mt_scheduledArrivalUtc"
										value={formData.mt_scheduledArrivalUtc}
										onChange={handleInputChange}
										className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
									/>
								</div>

								<div>
									<label className="block text-xs font-semibold text-gray-700 mb-1">
										Arrival (Local)
									</label>
									<input
										type="datetime-local"
										name="mt_scheduledArrivalLocal"
										value={formData.mt_scheduledArrivalLocal}
										onChange={handleInputChange}
										className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
									/>
								</div>
							</div>
						</div>

						{/* Notes */}
						<div className="border border-gray-300 rounded">
							<div className="bg-gray-100 px-3 py-1.5 border-b border-gray-300">
								<h3 className="text-sm font-bold text-gray-900">Notes</h3>
							</div>
							<div className="p-3 space-y-2">
								<div>
									<label className="block text-xs font-semibold text-gray-700 mb-1">
										Additional Notes
									</label>
									<textarea
										name="mt_additionalNotes"
										value={formData.mt_additionalNotes}
										onChange={handleInputChange}
										rows="2"
										className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
									/>
								</div>

								<div className="grid grid-cols-3 gap-2">
									<div>
										<label className="block text-xs font-semibold text-gray-700 mb-1">
											Dispatcher Notes
										</label>
										<textarea
											name="mt_dispatcherNotes"
											value={formData.mt_dispatcherNotes}
											onChange={handleInputChange}
											rows="2"
											className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
										/>
									</div>

									<div>
										<label className="block text-xs font-semibold text-gray-700 mb-1">
											Safety Notes
										</label>
										<textarea
											name="mt_safetyNotes"
											value={formData.mt_safetyNotes}
											onChange={handleInputChange}
											rows="2"
											className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
										/>
									</div>

									<div>
										<label className="block text-xs font-semibold text-gray-700 mb-1">
											Regulatory Notes
										</label>
										<textarea
											name="mt_regulatoryNotes"
											value={formData.mt_regulatoryNotes}
											onChange={handleInputChange}
											rows="2"
											className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
										/>
									</div>
								</div>
							</div>
						</div>
					</div>
				</form>

				{/* Footer */}
				<div className="border-t border-gray-300 px-4 py-2 flex items-center justify-end gap-2 bg-gray-50">
					<button
						type="button"
						onClick={onClose}
						className="px-4 py-1.5 text-sm border border-gray-300 rounded hover:bg-gray-100"
					>
						Cancel
					</button>
					<button
						type="submit"
						onClick={handleSubmit}
						disabled={loading}
						className="px-4 py-1.5 text-sm bg-green-600 text-white rounded hover:bg-green-700 flex items-center gap-1.5 disabled:opacity-50"
					>
						{loading ? (
							<>
								<div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
								Updating...
							</>
						) : (
							<>
								<Save className="w-4 h-4" />
								Update Trip
							</>
						)}
					</button>
				</div>
			</div>
		</div>
	);
};

export default UpdateTrip;
