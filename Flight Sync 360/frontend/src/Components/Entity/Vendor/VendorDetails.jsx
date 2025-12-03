import React, { useState } from "react";
import {
	X,
	ArrowLeft,
	Edit,
	Trash2,
	Building2,
	Phone,
	Mail,
	MapPin,
	Package,
	DollarSign,
	Globe,
	CreditCard,
	Shield,
	FileText,
	User,
	Briefcase,
	Download,
} from "lucide-react";

const VendorDetails = ({ vendor, onClose, onEdit, onDelete }) => {
	const [activeTab, setActiveTab] = useState("overview");

	const tabs = [
		{ id: "overview", label: "Overview", icon: Building2 },
		{ id: "contact", label: "Contact", icon: Phone },
		{ id: "business", label: "Business", icon: Briefcase },
		{ id: "documents", label: "Documents", icon: FileText },
	];

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
								<Building2 className="w-10 h-10 text-white" />
							</div>
							<div>
								<h1 className="text-4xl font-bold">{vendor.vn_company}</h1>
								<p className="text-xl text-blue-100 mt-2">{vendor.vn_name}</p>
								<div className="flex gap-2 mt-3">
									<span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-500/20 text-green-100">
										{vendor.vn_serviceType}
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
											<Package className="w-5 h-5 text-blue-600" />
										</div>
										<div className="flex-1 min-w-0">
											<p className="text-sm text-gray-600 mb-1">Service Type</p>
											<p className="text-base font-semibold text-gray-900">
												{vendor.vn_serviceType}
											</p>
										</div>
									</div>

									<div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl border-2 border-gray-200">
										<div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
											<DollarSign className="w-5 h-5 text-green-600" />
										</div>
										<div className="flex-1 min-w-0">
											<p className="text-sm text-gray-600 mb-1">
												Payment Terms
											</p>
											<p className="text-base font-semibold text-gray-900">
												{vendor.vn_paymentTerms}
											</p>
										</div>
									</div>

									<div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl border-2 border-gray-200">
										<div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
											<MapPin className="w-5 h-5 text-purple-600" />
										</div>
										<div className="flex-1 min-w-0">
											<p className="text-sm text-gray-600 mb-1">Location</p>
											<p className="text-base font-semibold text-gray-900">
												{vendor.vn_city}, {vendor.vn_country}
											</p>
										</div>
									</div>

									<div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl border-2 border-gray-200">
										<div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
											<Globe className="w-5 h-5 text-orange-600" />
										</div>
										<div className="flex-1 min-w-0">
											<p className="text-sm text-gray-600 mb-1">Address</p>
											<p className="text-base font-semibold text-gray-900">
												{vendor.vn_address}
											</p>
										</div>
									</div>
								</div>

								{vendor.vn_additionalNotes && (
									<div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6">
										<h4 className="text-sm font-bold text-gray-900 mb-2 flex items-center gap-2">
											<FileText className="w-4 h-4 text-blue-600" />
											Additional Notes
										</h4>
										<p className="text-gray-700">{vendor.vn_additionalNotes}</p>
									</div>
								)}
							</div>
						)}

						{/* Contact Tab */}
						{activeTab === "contact" && (
							<div className="space-y-6">
								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									<div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl border-2 border-gray-200">
										<div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
											<User className="w-5 h-5 text-blue-600" />
										</div>
										<div className="flex-1 min-w-0">
											<p className="text-sm text-gray-600 mb-1">Contact Name</p>
											<p className="text-base font-semibold text-gray-900">
												{vendor.vn_name}
											</p>
										</div>
									</div>

									<div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl border-2 border-gray-200">
										<div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
											<Building2 className="w-5 h-5 text-green-600" />
										</div>
										<div className="flex-1 min-w-0">
											<p className="text-sm text-gray-600 mb-1">Company</p>
											<p className="text-base font-semibold text-gray-900">
												{vendor.vn_company}
											</p>
										</div>
									</div>

									<div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl border-2 border-gray-200">
										<div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
											<Phone className="w-5 h-5 text-purple-600" />
										</div>
										<div className="flex-1 min-w-0">
											<p className="text-sm text-gray-600 mb-1">
												Primary Phone
											</p>
											<p className="text-base font-semibold text-gray-900">
												{vendor.vn_phoneNo}
											</p>
										</div>
									</div>

									{vendor.vn_alternatePhoneNo && (
										<div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl border-2 border-gray-200">
											<div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
												<Phone className="w-5 h-5 text-purple-600" />
											</div>
											<div className="flex-1 min-w-0">
												<p className="text-sm text-gray-600 mb-1">
													Alternate Phone
												</p>
												<p className="text-base font-semibold text-gray-900">
													{vendor.vn_alternatePhoneNo}
												</p>
											</div>
										</div>
									)}

									<div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl border-2 border-gray-200">
										<div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
											<Mail className="w-5 h-5 text-orange-600" />
										</div>
										<div className="flex-1 min-w-0">
											<p className="text-sm text-gray-600 mb-1">
												Primary Email
											</p>
											<p className="text-base font-semibold text-gray-900 break-all">
												{vendor.vn_emailAddress}
											</p>
										</div>
									</div>

									{vendor.vn_alternateEmailAddress && (
										<div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl border-2 border-gray-200">
											<div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
												<Mail className="w-5 h-5 text-orange-600" />
											</div>
											<div className="flex-1 min-w-0">
												<p className="text-sm text-gray-600 mb-1">
													Alternate Email
												</p>
												<p className="text-base font-semibold text-gray-900 break-all">
													{vendor.vn_alternateEmailAddress}
												</p>
											</div>
										</div>
									)}
								</div>
							</div>
						)}

						{/* Business Tab */}
						{activeTab === "business" && (
							<div className="space-y-6">
								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									{vendor.vn_taxId && (
										<div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl border-2 border-gray-200">
											<div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
												<FileText className="w-5 h-5 text-blue-600" />
											</div>
											<div className="flex-1 min-w-0">
												<p className="text-sm text-gray-600 mb-1">
													Tax ID / VAT
												</p>
												<p className="text-base font-semibold text-gray-900">
													{vendor.vn_taxId}
												</p>
											</div>
										</div>
									)}

									<div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl border-2 border-gray-200">
										<div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
											<DollarSign className="w-5 h-5 text-green-600" />
										</div>
										<div className="flex-1 min-w-0">
											<p className="text-sm text-gray-600 mb-1">
												Payment Terms
											</p>
											<p className="text-base font-semibold text-gray-900">
												{vendor.vn_paymentTerms}
											</p>
										</div>
									</div>

									{vendor.vn_bankDetails && (
										<div className="md:col-span-2 flex items-start gap-3 p-4 bg-gray-50 rounded-xl border-2 border-gray-200">
											<div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
												<CreditCard className="w-5 h-5 text-purple-600" />
											</div>
											<div className="flex-1 min-w-0">
												<p className="text-sm text-gray-600 mb-1">
													Bank Details
												</p>
												<p className="text-base font-semibold text-gray-900">
													{vendor.vn_bankDetails}
												</p>
											</div>
										</div>
									)}

									{vendor.vn_Insurance && (
										<div className="md:col-span-2 flex items-start gap-3 p-4 bg-gray-50 rounded-xl border-2 border-gray-200">
											<div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
												<Shield className="w-5 h-5 text-orange-600" />
											</div>
											<div className="flex-1 min-w-0">
												<p className="text-sm text-gray-600 mb-1">
													Insurance Details
												</p>
												<p className="text-base font-semibold text-gray-900">
													{vendor.vn_Insurance}
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
								{vendor.vn_documents && vendor.vn_documents.trim() !== "" ? (
									<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
										{vendor.vn_documents.split(",").map((doc, index) => (
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
											No documents have been uploaded for this vendor.
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
								Edit Vendor
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

export default VendorDetails;
