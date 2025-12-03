import React, { useState } from "react";
import {
	X,
	ArrowLeft,
	Edit,
	Trash2,
	Users,
	Phone,
	Mail,
	MapPin,
	Award,
	IdCard,
	Globe,
	FileText,
	User,
	Calendar,
	Plane,
	Download,
} from "lucide-react";

const CrewDetails = ({ crew, onClose, onEdit, onDelete }) => {
	const [activeTab, setActiveTab] = useState("overview");

	const tabs = [
		{ id: "overview", label: "Overview", icon: Users },
		{ id: "personal", label: "Personal", icon: User },
		{ id: "credentials", label: "Credentials", icon: Award },
		{ id: "documents", label: "Documents", icon: FileText },
	];

	// Get icon for crew type
	const getCrewIcon = () => {
		switch (crew.cr_type) {
			case "Pilot":
				return Plane;
			case "Cabin Attendant":
				return User;
			case "Ground Staff":
				return Users;
			default:
				return User;
		}
	};

	const CrewIcon = getCrewIcon();

	return (
		<div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 overflow-y-auto">
			<div className="min-h-screen p-4 md:p-8">
				<div className="max-w-6xl mx-auto">
					{/* Gradient Header */}
					<div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-t-2xl shadow-2xl p-8 text-white">
						<div className="flex items-center justify-between mb-6">
							<button
								onClick={onClose}
								className="p-2 hover:bg-white/20 rounded-xl transition-all backdrop-blur-sm"
							>
								<ArrowLeft className="w-6 h-6" />
							</button>
							<button
								onClick={onClose}
								className="p-2 hover:bg-white/20 rounded-xl transition-all backdrop-blur-sm"
							>
								<X className="w-6 h-6" />
							</button>
						</div>

						<div className="flex items-center gap-6">
							<div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
								<CrewIcon className="w-10 h-10 text-white" />
							</div>
							<div>
								<h1 className="text-4xl font-bold">{crew.cr_name}</h1>
								<p className="text-xl text-blue-100 mt-2">{crew.cr_email}</p>
								<div className="flex gap-2 mt-3">
									<span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-500/20 text-green-100">
										{crew.cr_type}
									</span>
									<span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-100">
										{crew.cr_licenseNo}
									</span>
								</div>
							</div>
						</div>
					</div>

					{/* Tabs */}
					<div className="bg-white shadow-lg px-8 border-b">
						<div className="flex gap-1 overflow-x-auto">
							{tabs.map((tab) => (
								<button
									key={tab.id}
									onClick={() => setActiveTab(tab.id)}
									className={`px-6 py-4 font-semibold transition-all flex items-center gap-2 whitespace-nowrap ${
										activeTab === tab.id
											? "text-blue-600 border-b-3 border-blue-600"
											: "text-gray-600 hover:text-gray-900 border-b-3 border-transparent"
									}`}
								>
									<tab.icon className="w-5 h-5" />
									{tab.label}
								</button>
							))}
						</div>
					</div>

					{/* Content */}
					<div className="bg-white rounded-b-2xl shadow-2xl p-8">
						{/* Overview Tab */}
						{activeTab === "overview" && (
							<div className="space-y-6">
								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									<div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl border-2 border-gray-200">
										<div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
											<User className="w-5 h-5 text-blue-600" />
										</div>
										<div className="flex-1 min-w-0">
											<p className="text-sm text-gray-600 mb-1">Crew Type</p>
											<p className="text-base font-semibold text-gray-900">
												{crew.cr_type}
											</p>
										</div>
									</div>

									<div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl border-2 border-gray-200">
										<div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
											<MapPin className="w-5 h-5 text-green-600" />
										</div>
										<div className="flex-1 min-w-0">
											<p className="text-sm text-gray-600 mb-1">
												Base Location
											</p>
											<p className="text-base font-semibold text-gray-900">
												{crew.cr_baseLocation}
											</p>
										</div>
									</div>

									<div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl border-2 border-gray-200">
										<div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
											<Award className="w-5 h-5 text-purple-600" />
										</div>
										<div className="flex-1 min-w-0">
											<p className="text-sm text-gray-600 mb-1">
												License Number
											</p>
											<p className="text-base font-semibold text-gray-900">
												{crew.cr_licenseNo}
											</p>
										</div>
									</div>

									<div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl border-2 border-gray-200">
										<div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
											<Calendar className="w-5 h-5 text-orange-600" />
										</div>
										<div className="flex-1 min-w-0">
											<p className="text-sm text-gray-600 mb-1">
												License Expiry
											</p>
											<p className="text-base font-semibold text-gray-900">
												{crew.cr_licenseExpiryDate}
											</p>
										</div>
									</div>

									{crew.cr_totalFlightHours &&
										crew.cr_totalFlightHours !== "N/A" && (
											<div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl border-2 border-gray-200">
												<div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
													<Plane className="w-5 h-5 text-blue-600" />
												</div>
												<div className="flex-1 min-w-0">
													<p className="text-sm text-gray-600 mb-1">
														Total Flight Hours
													</p>
													<p className="text-base font-semibold text-gray-900">
														{crew.cr_totalFlightHours} hrs
													</p>
												</div>
											</div>
										)}

									<div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl border-2 border-gray-200">
										<div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
											<Globe className="w-5 h-5 text-green-600" />
										</div>
										<div className="flex-1 min-w-0">
											<p className="text-sm text-gray-600 mb-1">Languages</p>
											<p className="text-base font-semibold text-gray-900">
												{crew.cr_languageSpoken}
											</p>
										</div>
									</div>
								</div>

								{crew.cr_notes && (
									<div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6">
										<h4 className="text-sm font-bold text-gray-900 mb-2 flex items-center gap-2">
											<FileText className="w-4 h-4 text-blue-600" />
											Notes
										</h4>
										<p className="text-gray-700">{crew.cr_notes}</p>
									</div>
								)}
							</div>
						)}

						{/* Personal Tab */}
						{activeTab === "personal" && (
							<div className="space-y-6">
								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									<div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl border-2 border-gray-200">
										<div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
											<User className="w-5 h-5 text-blue-600" />
										</div>
										<div className="flex-1 min-w-0">
											<p className="text-sm text-gray-600 mb-1">Full Name</p>
											<p className="text-base font-semibold text-gray-900">
												{crew.cr_name}
											</p>
										</div>
									</div>

									<div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl border-2 border-gray-200">
										<div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
											<Users className="w-5 h-5 text-green-600" />
										</div>
										<div className="flex-1 min-w-0">
											<p className="text-sm text-gray-600 mb-1">Crew Type</p>
											<p className="text-base font-semibold text-gray-900">
												{crew.cr_type}
											</p>
										</div>
									</div>

									<div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl border-2 border-gray-200">
										<div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
											<Phone className="w-5 h-5 text-purple-600" />
										</div>
										<div className="flex-1 min-w-0">
											<p className="text-sm text-gray-600 mb-1">Phone</p>
											<p className="text-base font-semibold text-gray-900">
												{crew.cr_phone}
											</p>
										</div>
									</div>

									<div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl border-2 border-gray-200">
										<div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
											<Mail className="w-5 h-5 text-orange-600" />
										</div>
										<div className="flex-1 min-w-0">
											<p className="text-sm text-gray-600 mb-1">Email</p>
											<p className="text-base font-semibold text-gray-900 break-all">
												{crew.cr_email}
											</p>
										</div>
									</div>

									<div className="md:col-span-2 flex items-start gap-3 p-4 bg-gray-50 rounded-xl border-2 border-gray-200">
										<div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
											<MapPin className="w-5 h-5 text-blue-600" />
										</div>
										<div className="flex-1 min-w-0">
											<p className="text-sm text-gray-600 mb-1">
												Base Location
											</p>
											<p className="text-base font-semibold text-gray-900">
												{crew.cr_baseLocation}
											</p>
										</div>
									</div>

									<div className="md:col-span-2 flex items-start gap-3 p-4 bg-gray-50 rounded-xl border-2 border-gray-200">
										<div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
											<Globe className="w-5 h-5 text-green-600" />
										</div>
										<div className="flex-1 min-w-0">
											<p className="text-sm text-gray-600 mb-1">
												Languages Spoken
											</p>
											<p className="text-base font-semibold text-gray-900">
												{crew.cr_languageSpoken}
											</p>
										</div>
									</div>

									{crew.cr_passportNo && (
										<div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl border-2 border-gray-200">
											<div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
												<IdCard className="w-5 h-5 text-purple-600" />
											</div>
											<div className="flex-1 min-w-0">
												<p className="text-sm text-gray-600 mb-1">
													Passport Number
												</p>
												<p className="text-base font-semibold text-gray-900">
													{crew.cr_passportNo}
												</p>
											</div>
										</div>
									)}

									{crew.cr_visaDetails && (
										<div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl border-2 border-gray-200">
											<div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
												<FileText className="w-5 h-5 text-orange-600" />
											</div>
											<div className="flex-1 min-w-0">
												<p className="text-sm text-gray-600 mb-1">
													Visa Details
												</p>
												<p className="text-base font-semibold text-gray-900">
													{crew.cr_visaDetails}
												</p>
											</div>
										</div>
									)}
								</div>
							</div>
						)}

						{/* Credentials Tab */}
						{activeTab === "credentials" && (
							<div className="space-y-6">
								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									<div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl border-2 border-gray-200">
										<div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
											<Award className="w-5 h-5 text-blue-600" />
										</div>
										<div className="flex-1 min-w-0">
											<p className="text-sm text-gray-600 mb-1">
												License Number
											</p>
											<p className="text-base font-semibold text-gray-900">
												{crew.cr_licenseNo}
											</p>
										</div>
									</div>

									<div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl border-2 border-gray-200">
										<div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
											<Calendar className="w-5 h-5 text-green-600" />
										</div>
										<div className="flex-1 min-w-0">
											<p className="text-sm text-gray-600 mb-1">
												License Expiry Date
											</p>
											<p className="text-base font-semibold text-gray-900">
												{crew.cr_licenseExpiryDate}
											</p>
										</div>
									</div>

									{crew.cr_totalFlightHours && (
										<div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl border-2 border-gray-200">
											<div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
												<Plane className="w-5 h-5 text-purple-600" />
											</div>
											<div className="flex-1 min-w-0">
												<p className="text-sm text-gray-600 mb-1">
													Total Flight Hours
												</p>
												<p className="text-base font-semibold text-gray-900">
													{crew.cr_totalFlightHours === "N/A"
														? "N/A"
														: `${crew.cr_totalFlightHours} hours`}
												</p>
											</div>
										</div>
									)}

									{crew.cr_typeRatingCertificate && (
										<div className="md:col-span-2 flex items-start gap-3 p-4 bg-gray-50 rounded-xl border-2 border-gray-200">
											<div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
												<Award className="w-5 h-5 text-orange-600" />
											</div>
											<div className="flex-1 min-w-0">
												<p className="text-sm text-gray-600 mb-1">
													Type Rating / Certifications
												</p>
												<p className="text-base font-semibold text-gray-900">
													{crew.cr_typeRatingCertificate}
												</p>
											</div>
										</div>
									)}
								</div>
							</div>
						)}

						{/* Documents Tab */}
						{activeTab === "documents" && (
							<div className="space-y-6">
								{crew.ac_documents && crew.ac_documents.trim() !== "" ? (
									<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
										{crew.ac_documents.split(",").map((doc, index) => (
											<div
												key={index}
												className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border-2 border-gray-200 hover:bg-gray-100 transition-all cursor-pointer"
											>
												<div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
													<FileText className="w-5 h-5 text-blue-600" />
												</div>
												<div className="flex-1 min-w-0">
													<p className="text-base font-semibold text-gray-900 truncate">
														{doc.trim()}
													</p>
													<p className="text-sm text-gray-500">
														Click to download
													</p>
												</div>
												<Download className="w-5 h-5 text-gray-400" />
											</div>
										))}
									</div>
								) : (
									<div className="text-center py-12">
										<div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
											<FileText className="w-10 h-10 text-gray-400" />
										</div>
										<h3 className="text-xl font-bold text-gray-900 mb-2">
											No Documents
										</h3>
										<p className="text-gray-600">
											No documents have been uploaded for this crew member.
										</p>
									</div>
								)}
							</div>
						)}

						{/* Action Buttons */}
						<div className="flex gap-3 mt-8 pt-6 border-t-2 border-gray-200">
							<button
								onClick={onEdit}
								className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all flex items-center justify-center gap-2 font-semibold shadow-lg"
							>
								<Edit className="w-5 h-5" />
								Edit Crew Member
							</button>
							<button
								onClick={onDelete}
								className="px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all flex items-center gap-2 font-semibold"
							>
								<Trash2 className="w-5 h-5" />
								Delete
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CrewDetails;
