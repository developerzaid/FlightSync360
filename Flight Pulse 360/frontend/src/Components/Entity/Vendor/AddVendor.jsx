import React, { useState, useEffect } from "react";
import { X, Save, User, MapPin, Briefcase, FileText } from "lucide-react";
import FileUpload from "../Util/FileUpload";

const AddVendor = ({ vendor, isEditMode, onSave, onClose }) => {
	const [formData, setFormData] = useState({
		vn_name: "",
		vn_company: "",
		vn_phoneNo: "",
		vn_alternatePhoneNo: "",
		vn_emailAddress: "",
		vn_alternateEmailAddress: "",
		vn_serviceType: "",
		vn_country: "",
		vn_city: "",
		vn_address: "",
		vn_taxId: "",
		vn_paymentTerms: "",
		vn_bankDetails: "",
		vn_Insurance: "",
		vn_additionalNotes: "",
		vn_documents: "",
	});

	const [errors, setErrors] = useState({});

	const serviceTypes = [
		"Fuel Services",
		"Ground Handling",
		"Permits & Clearances",
		"Crew Services",
		"Trip Support",
		"Catering",
		"Maintenance",
		"Other",
	];
	const [uploadedFiles, setUploadedFiles] = useState([]);
	const paymentTermsOptions = [
		"Advance Payment",
		"Net 7",
		"Net 15",
		"Net 30",
		"Net 45",
		"Net 60",
		"Upon Delivery",
	];

	// Load vendor data if editing
	useEffect(() => {
		if (isEditMode && vendor) {
			setFormData({ ...vendor });
		}
	}, [isEditMode, vendor]);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));

		// Clear error for this field
		if (errors[name]) {
			setErrors((prev) => ({ ...prev, [name]: "" }));
		}
	};
	// NEW: Handle file changes
	const handleFilesChange = (files) => {
		setUploadedFiles(files);
	};

	const validateForm = () => {
		const newErrors = {};

		// Required fields validation
		if (!formData.vn_name.trim())
			newErrors.vn_name = "Contact name is required";
		if (!formData.vn_company.trim())
			newErrors.vn_company = "Company name is required";
		if (!formData.vn_phoneNo.trim())
			newErrors.vn_phoneNo = "Primary phone is required";
		if (!formData.vn_emailAddress.trim())
			newErrors.vn_emailAddress = "Primary email is required";
		if (!formData.vn_serviceType)
			newErrors.vn_serviceType = "Service type is required";
		if (!formData.vn_country.trim())
			newErrors.vn_country = "Country is required";
		if (!formData.vn_city.trim()) newErrors.vn_city = "City is required";
		if (!formData.vn_address.trim())
			newErrors.vn_address = "Address is required";
		if (!formData.vn_paymentTerms)
			newErrors.vn_paymentTerms = "Payment terms are required";

		// Email validation
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (
			formData.vn_emailAddress &&
			!emailRegex.test(formData.vn_emailAddress)
		) {
			newErrors.vn_emailAddress = "Invalid email format";
		}
		if (
			formData.vn_alternateEmailAddress &&
			!emailRegex.test(formData.vn_alternateEmailAddress)
		) {
			newErrors.vn_alternateEmailAddress = "Invalid email format";
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		if (validateForm()) {
			onSave(formData);
		}
	};

	const submitData = async () => {
		const tripData = {
			vn_name: formData.vn_name,
			vn_company: formData.vn_company,
			vn_phoneNo: formData.vn_phoneNo,
			vn_alternatePhoneNo: formData.vn_alternatePhoneNo,
			vn_emailAddress: "",
			vn_alternateEmailAddress: "",
			vn_serviceType: "",
			vn_country: "",
			vn_city: "",
			vn_address: "",
			vn_taxId: "",
			vn_paymentTerms: "",
			vn_bankDetails: "",
			vn_Insurance: "",
			vn_additionalNotes: "",
			vn_documents: "",
		};

		try {
			const response = await api.post("/vendor", tripData);
			console.log(response.data);
		} catch (error) {
			console.error("Error creating trip:", error);
		}
	};

	return (
		<div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 overflow-y-auto">
			<div className="min-h-screen p-4 md:p-8">
				<div className="max-w-4xl mx-auto">
					<form onSubmit={handleSubmit}>
						{/* Contact Information Section */}
						<div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
							<div className="flex items-center justify-between mb-6">
								<h2 className="text-2xl font-bold text-gray-900">
									{isEditMode ? "Edit Vendor" : "Add New Vendor"}
								</h2>
								<button
									type="button"
									onClick={onClose}
									className="p-2 hover:bg-gray-100 rounded-xl transition-all"
								>
									<X className="w-6 h-6 text-gray-600" />
								</button>
							</div>

							<h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
								<User className="w-5 h-5 text-blue-600" />
								Contact Information
							</h3>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<div>
									<label className="block text-sm font-semibold text-gray-700 mb-2">
										Contact Name <span className="text-red-500">*</span>
									</label>
									<input
										type="text"
										name="vn_name"
										value={formData.vn_name}
										onChange={handleInputChange}
										placeholder="e.g., John Smith"
										className={`w-full px-4 py-3 bg-gray-50 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all ${
											errors.vn_name
												? "border-red-500"
												: "border-gray-200 focus:border-blue-500"
										}`}
									/>
									{errors.vn_name && (
										<p className="text-xs text-red-600 mt-1">
											{errors.vn_name}
										</p>
									)}
								</div>

								<div>
									<label className="block text-sm font-semibold text-gray-700 mb-2">
										Company Name <span className="text-red-500">*</span>
									</label>
									<input
										type="text"
										name="vn_company"
										value={formData.vn_company}
										onChange={handleInputChange}
										placeholder="e.g., Global Fuel Services Ltd"
										className={`w-full px-4 py-3 bg-gray-50 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all ${
											errors.vn_company
												? "border-red-500"
												: "border-gray-200 focus:border-blue-500"
										}`}
									/>
									{errors.vn_company && (
										<p className="text-xs text-red-600 mt-1">
											{errors.vn_company}
										</p>
									)}
								</div>

								<div>
									<label className="block text-sm font-semibold text-gray-700 mb-2">
										Primary Phone <span className="text-red-500">*</span>
									</label>
									<input
										type="tel"
										name="vn_phoneNo"
										value={formData.vn_phoneNo}
										onChange={handleInputChange}
										placeholder="e.g., +44 20 7946 0958"
										className={`w-full px-4 py-3 bg-gray-50 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all ${
											errors.vn_phoneNo
												? "border-red-500"
												: "border-gray-200 focus:border-blue-500"
										}`}
									/>
									{errors.vn_phoneNo && (
										<p className="text-xs text-red-600 mt-1">
											{errors.vn_phoneNo}
										</p>
									)}
								</div>

								<div>
									<label className="block text-sm font-semibold text-gray-700 mb-2">
										Alternate Phone
									</label>
									<input
										type="tel"
										name="vn_alternatePhoneNo"
										value={formData.vn_alternatePhoneNo}
										onChange={handleInputChange}
										placeholder="e.g., +44 20 7946 0959"
										className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
									/>
								</div>

								<div>
									<label className="block text-sm font-semibold text-gray-700 mb-2">
										Primary Email <span className="text-red-500">*</span>
									</label>
									<input
										type="email"
										name="vn_emailAddress"
										value={formData.vn_emailAddress}
										onChange={handleInputChange}
										placeholder="e.g., contact@vendor.com"
										className={`w-full px-4 py-3 bg-gray-50 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all ${
											errors.vn_emailAddress
												? "border-red-500"
												: "border-gray-200 focus:border-blue-500"
										}`}
									/>
									{errors.vn_emailAddress && (
										<p className="text-xs text-red-600 mt-1">
											{errors.vn_emailAddress}
										</p>
									)}
								</div>

								<div>
									<label className="block text-sm font-semibold text-gray-700 mb-2">
										Alternate Email
									</label>
									<input
										type="email"
										name="vn_alternateEmailAddress"
										value={formData.vn_alternateEmailAddress}
										onChange={handleInputChange}
										placeholder="e.g., info@vendor.com"
										className={`w-full px-4 py-3 bg-gray-50 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all ${
											errors.vn_alternateEmailAddress
												? "border-red-500"
												: "border-gray-200 focus:border-blue-500"
										}`}
									/>
									{errors.vn_alternateEmailAddress && (
										<p className="text-xs text-red-600 mt-1">
											{errors.vn_alternateEmailAddress}
										</p>
									)}
								</div>

								<div>
									<label className="block text-sm font-semibold text-gray-700 mb-2">
										Service Type <span className="text-red-500">*</span>
									</label>
									<select
										name="vn_serviceType"
										value={formData.vn_serviceType}
										onChange={handleInputChange}
										className={`w-full px-4 py-3 bg-gray-50 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all ${
											errors.vn_serviceType
												? "border-red-500"
												: "border-gray-200 focus:border-blue-500"
										}`}
									>
										<option value="">Select service type...</option>
										{serviceTypes.map((type) => (
											<option key={type} value={type}>
												{type}
											</option>
										))}
									</select>
									{errors.vn_serviceType && (
										<p className="text-xs text-red-600 mt-1">
											{errors.vn_serviceType}
										</p>
									)}
								</div>
							</div>
						</div>

						{/* Location Information Section */}
						<div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
							<h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
								<MapPin className="w-5 h-5 text-blue-600" />
								Location Information
							</h3>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<div>
									<label className="block text-sm font-semibold text-gray-700 mb-2">
										Country <span className="text-red-500">*</span>
									</label>
									<input
										type="text"
										name="vn_country"
										value={formData.vn_country}
										onChange={handleInputChange}
										placeholder="e.g., United Kingdom"
										className={`w-full px-4 py-3 bg-gray-50 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all ${
											errors.vn_country
												? "border-red-500"
												: "border-gray-200 focus:border-blue-500"
										}`}
									/>
									{errors.vn_country && (
										<p className="text-xs text-red-600 mt-1">
											{errors.vn_country}
										</p>
									)}
								</div>

								<div>
									<label className="block text-sm font-semibold text-gray-700 mb-2">
										City <span className="text-red-500">*</span>
									</label>
									<input
										type="text"
										name="vn_city"
										value={formData.vn_city}
										onChange={handleInputChange}
										placeholder="e.g., London"
										className={`w-full px-4 py-3 bg-gray-50 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all ${
											errors.vn_city
												? "border-red-500"
												: "border-gray-200 focus:border-blue-500"
										}`}
									/>
									{errors.vn_city && (
										<p className="text-xs text-red-600 mt-1">
											{errors.vn_city}
										</p>
									)}
								</div>

								<div className="md:col-span-2">
									<label className="block text-sm font-semibold text-gray-700 mb-2">
										Address <span className="text-red-500">*</span>
									</label>
									<input
										type="text"
										name="vn_address"
										value={formData.vn_address}
										onChange={handleInputChange}
										placeholder="e.g., 123 Aviation Way, Heathrow"
										className={`w-full px-4 py-3 bg-gray-50 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all ${
											errors.vn_address
												? "border-red-500"
												: "border-gray-200 focus:border-blue-500"
										}`}
									/>
									{errors.vn_address && (
										<p className="text-xs text-red-600 mt-1">
											{errors.vn_address}
										</p>
									)}
								</div>
							</div>
						</div>

						{/* Business Details Section */}
						<div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
							<h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
								<Briefcase className="w-5 h-5 text-blue-600" />
								Business Details
							</h3>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<div>
									<label className="block text-sm font-semibold text-gray-700 mb-2">
										Tax ID / VAT Number
									</label>
									<input
										type="text"
										name="vn_taxId"
										value={formData.vn_taxId}
										onChange={handleInputChange}
										placeholder="e.g., GB123456789"
										className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
									/>
								</div>

								<div>
									<label className="block text-sm font-semibold text-gray-700 mb-2">
										Payment Terms <span className="text-red-500">*</span>
									</label>
									<select
										name="vn_paymentTerms"
										value={formData.vn_paymentTerms}
										onChange={handleInputChange}
										className={`w-full px-4 py-3 bg-gray-50 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all ${
											errors.vn_paymentTerms
												? "border-red-500"
												: "border-gray-200 focus:border-blue-500"
										}`}
									>
										<option value="">Select payment terms...</option>
										{paymentTermsOptions.map((term) => (
											<option key={term} value={term}>
												{term}
											</option>
										))}
									</select>
									{errors.vn_paymentTerms && (
										<p className="text-xs text-red-600 mt-1">
											{errors.vn_paymentTerms}
										</p>
									)}
								</div>

								<div className="md:col-span-2">
									<label className="block text-sm font-semibold text-gray-700 mb-2">
										Bank Details
									</label>
									<input
										type="text"
										name="vn_bankDetails"
										value={formData.vn_bankDetails}
										onChange={handleInputChange}
										placeholder="e.g., HSBC - GB29 NWBK 6016 1331 9268 19"
										className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
									/>
								</div>

								<div className="md:col-span-2">
									<label className="block text-sm font-semibold text-gray-700 mb-2">
										Insurance Details
									</label>
									<input
										type="text"
										name="vn_Insurance"
										value={formData.vn_Insurance}
										onChange={handleInputChange}
										placeholder="e.g., Lloyd's of London - Policy #LL-2024-456"
										className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
									/>
								</div>
							</div>
						</div>

						{/* Additional Information Section */}
						<div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
							<h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
								<FileText className="w-5 h-5 text-blue-600" />
								Additional Information
							</h3>

							<div className="space-y-6">
								<div>
									<label className="block text-sm font-semibold text-gray-700 mb-2">
										Additional Notes
									</label>
									<textarea
										name="vn_additionalNotes"
										value={formData.vn_additionalNotes}
										onChange={handleInputChange}
										rows="4"
										placeholder="Any additional notes or special requirements..."
										className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
									/>
								</div>

								<div>
									<label className="block text-sm font-semibold text-gray-700 mb-2">
										Documents
									</label>
									<FileUpload
										files={uploadedFiles}
										onChange={handleFilesChange}
										maxFiles={10}
										maxSizeMB={10}
										acceptedTypes=".pdf,.doc,.docx,.jpg,.jpeg,.png"
									/>
									<p className="text-xs text-gray-500 mt-2">
										Upload license, medical certificates, type ratings,
										passport, etc.
									</p>
								</div>
							</div>
						</div>

						{/* Submit Button */}
						<div className="bg-white rounded-2xl shadow-lg p-6">
							<div className="flex items-center justify-end gap-3">
								<button
									type="button"
									onClick={onClose}
									className="px-6 py-3 text-gray-700 bg-white border-2 border-gray-300 rounded-xl hover:bg-gray-50 transition-all font-semibold"
								>
									Cancel
								</button>
								<button
									type="submit"
									className="px-8 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl hover:from-green-700 hover:to-green-800 transition-all font-semibold shadow-lg flex items-center gap-2"
								>
									<Save className="w-5 h-5" />
									{isEditMode ? "Update Vendor" : "Save Vendor"}
								</button>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default AddVendor;
