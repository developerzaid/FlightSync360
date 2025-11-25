import React, { useState } from "react";
import { X, Edit, FileText, Wrench, File } from "lucide-react";

const TripDetails = ({ isOpen, onClose, trip, onEdit }) => {
	const [activeTab, setActiveTab] = useState("overview");

	if (!isOpen || !trip) return null;

	const getStatusBadge = (status) => {
		const colors = {
			DRAFT: "bg-gray-100 text-gray-700",
			PLANNED: "bg-blue-100 text-blue-700",
			CONFIRMED: "bg-green-100 text-green-700",
			IN_PROGRESS: "bg-orange-100 text-orange-700",
			COMPLETED: "bg-purple-100 text-purple-700",
			CANCELLED: "bg-red-100 text-red-700",
		};
		return (
			<span
				className={`px-2 py-0.5 rounded text-xs font-semibold ${
					colors[status] || colors.DRAFT
				}`}
			>
				{status}
			</span>
		);
	};

	const InfoRow = ({ label, value }) => (
		<div className="flex items-center py-1.5 border-b border-gray-200">
			<span className="text-xs text-gray-600 w-32 flex-shrink-0">{label}</span>
			<span className="text-xs font-semibold text-gray-900">
				{value || "-"}
			</span>
		</div>
	);

	return (
		<div className="fixed inset-0 bg-black/60 z-50 flex items-start justify-center overflow-y-auto py-4">
			<div className="w-full max-w-5xl bg-white rounded-lg shadow-2xl mx-4">
				{/* Header */}
				<div className="bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-2 flex items-center justify-between">
					<div className="flex items-center gap-3">
						<h2 className="text-lg font-bold text-white">
							{trip.mt_tripNumber || trip.uxTripId}
						</h2>
						{getStatusBadge(trip.mt_status)}
						<span className="text-sm text-white">
							{trip.mt_fromAirport} → {trip.mt_toAirport}
						</span>
					</div>
					<div className="flex items-center gap-2">
						<button
							onClick={onEdit}
							className="px-3 py-1 bg-white/20 hover:bg-white/30 rounded text-white text-sm flex items-center gap-1"
						>
							<Edit className="w-3 h-3" />
							Edit
						</button>
						<button
							onClick={onClose}
							className="text-white hover:bg-white/20 p-1 rounded"
						>
							<X className="w-5 h-5" />
						</button>
					</div>
				</div>

				{/* Tabs */}
				<div className="bg-gray-100 border-b border-gray-300 flex">
					{[
						{ id: "overview", label: "Overview", icon: FileText },
						{ id: "services", label: "Services", icon: Wrench },
						{ id: "documents", label: "Documents", icon: File },
					].map(({ id, label, icon: Icon }) => (
						<button
							key={id}
							onClick={() => setActiveTab(id)}
							className={`px-4 py-2 text-sm font-semibold flex items-center gap-2 ${
								activeTab === id
									? "bg-white text-blue-600 border-b-2 border-blue-600"
									: "text-gray-600 hover:text-gray-900"
							}`}
						>
							<Icon className="w-4 h-4" />
							{label}
						</button>
					))}
				</div>

				{/* Content */}
				<div className="p-4 max-h-[calc(100vh-200px)] overflow-y-auto">
					{/* Overview Tab */}
					{activeTab === "overview" && (
						<div className="grid grid-cols-2 gap-4">
							{/* Flight Information */}
							<div className="border border-gray-300 rounded">
								<div className="bg-gray-100 px-3 py-1.5 border-b border-gray-300">
									<h3 className="text-sm font-bold text-gray-900">
										Flight Information
									</h3>
								</div>
								<div className="p-3">
									<InfoRow label="Trip Type" value={trip.mt_tripType} />
									<InfoRow label="Purpose" value={trip.mt_purpose} />
									<InfoRow label="Status" value={trip.mt_status} />
									<InfoRow label="From Airport" value={trip.mt_fromAirport} />
									<InfoRow label="To Airport" value={trip.mt_toAirport} />
								</div>
							</div>

							{/* Schedule */}
							<div className="border border-gray-300 rounded">
								<div className="bg-gray-100 px-3 py-1.5 border-b border-gray-300">
									<h3 className="text-sm font-bold text-gray-900">Schedule</h3>
								</div>
								<div className="p-3">
									<InfoRow
										label="Departure (UTC)"
										value={
											trip.mt_scheduledDepartureUtc
												? new Date(
														trip.mt_scheduledDepartureUtc
												  ).toLocaleString()
												: null
										}
									/>
									<InfoRow
										label="Arrival (UTC)"
										value={
											trip.mt_scheduledArrivalUtc
												? new Date(trip.mt_scheduledArrivalUtc).toLocaleString()
												: null
										}
									/>
									<InfoRow
										label="Departure TZ"
										value={trip.mt_departureTimezone}
									/>
									<InfoRow label="Arrival TZ" value={trip.mt_arrivalTimezone} />
								</div>
							</div>

							{/* Notes */}
							{(trip.mt_additionalNotes ||
								trip.mt_dispatcherNotes ||
								trip.mt_safetyNotes ||
								trip.mt_regulatoryNotes) && (
								<div className="col-span-2 border border-gray-300 rounded">
									<div className="bg-gray-100 px-3 py-1.5 border-b border-gray-300">
										<h3 className="text-sm font-bold text-gray-900">Notes</h3>
									</div>
									<div className="p-3 space-y-2">
										{trip.mt_additionalNotes && (
											<div>
												<p className="text-xs font-semibold text-gray-700 mb-1">
													Additional Notes
												</p>
												<p className="text-xs text-gray-600 bg-gray-50 p-2 rounded">
													{trip.mt_additionalNotes}
												</p>
											</div>
										)}
										{trip.mt_dispatcherNotes && (
											<div>
												<p className="text-xs font-semibold text-gray-700 mb-1">
													Dispatcher Notes
												</p>
												<p className="text-xs text-gray-600 bg-blue-50 p-2 rounded">
													{trip.mt_dispatcherNotes}
												</p>
											</div>
										)}
										{trip.mt_safetyNotes && (
											<div>
												<p className="text-xs font-semibold text-gray-700 mb-1">
													Safety Notes
												</p>
												<p className="text-xs text-gray-600 bg-orange-50 p-2 rounded">
													{trip.mt_safetyNotes}
												</p>
											</div>
										)}
										{trip.mt_regulatoryNotes && (
											<div>
												<p className="text-xs font-semibold text-gray-700 mb-1">
													Regulatory Notes
												</p>
												<p className="text-xs text-gray-600 bg-purple-50 p-2 rounded">
													{trip.mt_regulatoryNotes}
												</p>
											</div>
										)}
									</div>
								</div>
							)}
						</div>
					)}

					{/* Services Tab */}
					{activeTab === "services" && (
						<div className="space-y-3">
							{trip.services && trip.services.length > 0 ? (
								trip.services.map((service, index) => (
									<div key={index} className="border border-gray-300 rounded">
										<div className="bg-gray-100 px-3 py-1.5 border-b border-gray-300">
											<h3 className="text-sm font-bold text-gray-900 capitalize">
												{service.type.replace(/([A-Z])/g, " $1").trim()}
											</h3>
										</div>
										<div className="p-3 grid grid-cols-3 gap-2">
											{Object.entries(service.details || service)
												.filter(([key]) => key !== "enabled" && key !== "type")
												.map(([key, value]) => (
													<div key={key} className="bg-gray-50 p-2 rounded">
														<p className="text-xs text-gray-600 mb-0.5">
															{key
																.replace(/_/g, " ")
																.replace(/^\w/, (c) => c.toUpperCase())}
														</p>
														<p className="text-xs font-semibold text-gray-900">
															{value || "-"}
														</p>
													</div>
												))}
										</div>
									</div>
								))
							) : (
								<div className="text-center py-12 text-gray-500 text-sm">
									No services configured for this trip
								</div>
							)}
						</div>
					)}

					{/* Documents Tab */}
					{activeTab === "documents" && (
						<div>
							{trip.mt_additionalDocuments ? (
								<div className="border border-gray-300 rounded p-3">
									<p className="text-xs text-gray-600">
										{trip.mt_additionalDocuments}
									</p>
								</div>
							) : (
								<div className="text-center py-12 text-gray-500 text-sm">
									No documents attached to this trip
								</div>
							)}
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default TripDetails;
