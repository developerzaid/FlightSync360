import React, { useState, useEffect } from "react";
import {
	X,
	Save,
	User,
	MapPin,
	Building2,
	CreditCard,
	FileText,
} from "lucide-react";
import FileUpload from "../Util/FileUpload";

const AddClient = ({ client, isEditMode, onSave, onClose }) => {
	const [formData, setFormData] = useState({
		ct_name: "",
		ct_company: "",
		ct_phoneNo: "",
		ct_emailAddress: "",
		ct_country: "",
		ct_city: "",
		ct_address: "",
		ct_role: "COMPANY", // Default to company
		// Company fields
		ct_taxId: "",
		ct_paymentTerms: "",
		ct_bankDetails: "",
		ct_Insurance: "",
		// Individual fields
		ct_passportNo: "",
		ct_passportExpiry: "",
		ct_dob: "",
		ct_nationality: "",
		ct_additionalNotes: "",
	});

	const [uploadedFiles, setUploadedFiles] = useState([]);
	const [errors, setErrors] = useState({});

	const paymentTermsOptions = [
		"Advance Payment",
		"Net 7",
		"Net 15",
		"Net 30",
		"Net 45",
		"Net 60",
		"Upon Delivery",
	];

	// Load client data if editing
	useEffect(() => {
		if (isEditMode && client) {
			setFormData({ ...client });
		}
	}, [isEditMode, client]);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));

		if (errors[name]) {
			setErrors((prev) => ({ ...prev, [name]: "" }));
		}
	};

	const handleFilesChange = (files) => {
		setUploadedFiles(files);
	};

	const validateForm = () => {
		const newErrors = {};

		// Common required fields
		if (!formData.ct_name.trim()) newErrors.ct_name = "Name is required";
		if (!formData.ct_phoneNo.trim()) newErrors.ct_phoneNo = "Phone is required";
		if (!formData.ct_emailAddress.trim())
			newErrors.ct_emailAddress = "Email is required";
		if (!formData.ct_country.trim())
			newErrors.ct_country = "Country is required";
		if (!formData.ct_city.trim()) newErrors.ct_city = "City is required";
		if (!formData.ct_address.trim())
			newErrors.ct_address = "Address is required";
		if (!formData.ct_role) newErrors.ct_role = "Client type is required";

		// Email validation
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (
			formData.ct_emailAddress &&
			!emailRegex.test(formData.ct_emailAddress)
		) {
			newErrors.ct_emailAddress = "Invalid email format";
		}

		// Company-specific validation
		if (formData.ct_role === "COMPANY") {
			if (!formData.ct_company.trim())
				newErrors.ct_company = "Company name is required for company clients";
		}

		// Individual-specific validation
		if (formData.ct_role === "OTHERS") {
			if (formData.ct_passportExpiry) {
				const expiryDate = new Date(formData.ct_passportExpiry);
				const today = new Date();
				today.setHours(0, 0, 0, 0);

				if (expiryDate < today) {
					newErrors.ct_passportExpiry = "Passport has expired";
				}
			}

			if (formData.ct_dob) {
				const birthDate = new Date(formData.ct_dob);
				const today = new Date();

				if (birthDate > today) {
					newErrors.ct_dob = "Date of birth cannot be in the future";
				}
			}
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		if (validateForm()) {
			// If there are files, create FormData, otherwise send plain object
			if (uploadedFiles.length > 0) {
				const submitData = new FormData();

				// Add all form fields
				Object.keys(formData).forEach((key) => {
					submitData.append(key, formData[key]);
				});

				// Add files
				uploadedFiles.forEach((file) => {
					submitData.append("files", file);
				});

				onSave(submitData);
			} else {
				onSave(formData);
			}
		}
	};

	return (
		<div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 overflow-y-auto">
			<div className="min-h-screen p-4 md:p-8">
				<div className="max-w-4xl mx-auto">
					<form onSubmit={handleSubmit}>
						{/* Basic Information Section */}
						<div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
							<div className="flex items-center justify-between mb-6">
								<h2 className="text-2xl font-bold text-gray-900">
									{isEditMode ? "Edit Client" : "Add New Client"}
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
								Basic Information
							</h3>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<div>
									<label className="block text-sm font-semibold text-gray-700 mb-2">
										Client Type <span className="text-red-500">*</span>
									</label>
									<select
										name="ct_role"
										value={formData.ct_role}
										onChange={handleInputChange}
										className={`w-full px-4 py-3 bg-gray-50 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all ${
											errors.ct_role
												? "border-red-500"
												: "border-gray-200 focus:border-blue-500"
										}`}
									>
										<option value="COMPANY">Company</option>
										<option value="OTHERS">Individual</option>
									</select>
									{errors.ct_role && (
										<p className="text-xs text-red-600 mt-1">
											{errors.ct_role}
										</p>
									)}
								</div>

								<div>
									<label className="block text-sm font-semibold text-gray-700 mb-2">
										Full Name <span className="text-red-500">*</span>
									</label>
									<input
										type="text"
										name="ct_name"
										value={formData.ct_name}
										onChange={handleInputChange}
										placeholder="e.g., John Smith"
										className={`w-full px-4 py-3 bg-gray-50 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all ${
											errors.ct_name
												? "border-red-500"
												: "border-gray-200 focus:border-blue-500"
										}`}
									/>
									{errors.ct_name && (
										<p className="text-xs text-red-600 mt-1">
											{errors.ct_name}
										</p>
									)}
								</div>

								{/* Company name field - shown only for COMPANY type */}
								{formData.ct_role === "COMPANY" && (
									<div className="md:col-span-2">
										<label className="block text-sm font-semibold text-gray-700 mb-2">
											Company Name <span className="text-red-500">*</span>
										</label>
										<input
											type="text"
											name="ct_company"
											value={formData.ct_company}
											onChange={handleInputChange}
											placeholder="e.g., Global Aviation Partners LLC"
											className={`w-full px-4 py-3 bg-gray-50 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all ${
												errors.ct_company
													? "border-red-500"
													: "border-gray-200 focus:border-blue-500"
											}`}
										/>
										{errors.ct_company && (
											<p className="text-xs text-red-600 mt-1">
												{errors.ct_company}
											</p>
										)}
									</div>
								)}

								<div>
									<label className="block text-sm font-semibold text-gray-700 mb-2">
										Phone Number <span className="text-red-500">*</span>
									</label>
									<input
										type="tel"
										name="ct_phoneNo"
										value={formData.ct_phoneNo}
										onChange={handleInputChange}
										placeholder="e.g., +1 212 555 0100"
										className={`w-full px-4 py-3 bg-gray-50 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all ${
											errors.ct_phoneNo
												? "border-red-500"
												: "border-gray-200 focus:border-blue-500"
										}`}
									/>
									{errors.ct_phoneNo && (
										<p className="text-xs text-red-600 mt-1">
											{errors.ct_phoneNo}
										</p>
									)}
								</div>

								<div>
									<label className="block text-sm font-semibold text-gray-700 mb-2">
										Email Address <span className="text-red-500">*</span>
									</label>
									<input
										type="email"
										name="ct_emailAddress"
										value={formData.ct_emailAddress}
										onChange={handleInputChange}
										placeholder="e.g., john@example.com"
										className={`w-full px-4 py-3 bg-gray-50 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all ${
											errors.ct_emailAddress
												? "border-red-500"
												: "border-gray-200 focus:border-blue-500"
										}`}
									/>
									{errors.ct_emailAddress && (
										<p className="text-xs text-red-600 mt-1">
											{errors.ct_emailAddress}
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
										name="ct_country"
										value={formData.ct_country}
										onChange={handleInputChange}
										placeholder="e.g., United States"
										className={`w-full px-4 py-3 bg-gray-50 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all ${
											errors.ct_country
												? "border-red-500"
												: "border-gray-200 focus:border-blue-500"
										}`}
									/>
									{errors.ct_country && (
										<p className="text-xs text-red-600 mt-1">
											{errors.ct_country}
										</p>
									)}
								</div>

								<div>
									<label className="block text-sm font-semibold text-gray-700 mb-2">
										City <span className="text-red-500">*</span>
									</label>
									<input
										type="text"
										name="ct_city"
										value={formData.ct_city}
										onChange={handleInputChange}
										placeholder="e.g., New York"
										className={`w-full px-4 py-3 bg-gray-50 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all ${
											errors.ct_city
												? "border-red-500"
												: "border-gray-200 focus:border-blue-500"
										}`}
									/>
									{errors.ct_city && (
										<p className="text-xs text-red-600 mt-1">
											{errors.ct_city}
										</p>
									)}
								</div>

								<div className="md:col-span-2">
									<label className="block text-sm font-semibold text-gray-700 mb-2">
										Address <span className="text-red-500">*</span>
									</label>
									<input
										type="text"
										name="ct_address"
										value={formData.ct_address}
										onChange={handleInputChange}
										placeholder="e.g., 450 Park Avenue, Manhattan"
										className={`w-full px-4 py-3 bg-gray-50 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all ${
											errors.ct_address
												? "border-red-500"
												: "border-gray-200 focus:border-blue-500"
										}`}
									/>
									{errors.ct_address && (
										<p className="text-xs text-red-600 mt-1">
											{errors.ct_address}
										</p>
									)}
								</div>
							</div>
						</div>

						{/* Conditional Section: Company Details */}
						{formData.ct_role === "COMPANY" && (
							<div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
								<h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
									<Building2 className="w-5 h-5 text-blue-600" />
									Company Details
								</h3>

								<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
									<div>
										<label className="block text-sm font-semibold text-gray-700 mb-2">
											Tax ID / VAT Number
										</label>
										<input
											type="text"
											name="ct_taxId"
											value={formData.ct_taxId}
											onChange={handleInputChange}
											placeholder="e.g., US-TAX-123456789"
											className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
										/>
									</div>

									<div>
										<label className="block text-sm font-semibold text-gray-700 mb-2">
											Payment Terms
										</label>
										<select
											name="ct_paymentTerms"
											value={formData.ct_paymentTerms}
											onChange={handleInputChange}
											className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
										>
											<option value="">Select payment terms...</option>
											{paymentTermsOptions.map((term) => (
												<option key={term} value={term}>
													{term}
												</option>
											))}
										</select>
									</div>

									<div className="md:col-span-2">
										<label className="block text-sm font-semibold text-gray-700 mb-2">
											Bank Details
										</label>
										<input
											type="text"
											name="ct_bankDetails"
											value={formData.ct_bankDetails}
											onChange={handleInputChange}
											placeholder="e.g., Chase Bank - Account: ****5678"
											className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
										/>
									</div>

									<div className="md:col-span-2">
										<label className="block text-sm font-semibold text-gray-700 mb-2">
											Insurance Details
										</label>
										<input
											type="text"
											name="ct_Insurance"
											value={formData.ct_Insurance}
											onChange={handleInputChange}
											placeholder="e.g., Lloyd's of London - Policy: AV-2024-456"
											className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
										/>
									</div>
								</div>
							</div>
						)}

						{/* Conditional Section: Individual Details */}
						{formData.ct_role === "OTHERS" && (
							<div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
								<h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
									<CreditCard className="w-5 h-5 text-blue-600" />
									Personal Details
								</h3>

								<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
									<div>
										<label className="block text-sm font-semibold text-gray-700 mb-2">
											Passport Number
										</label>
										<input
											type="text"
											name="ct_passportNo"
											value={formData.ct_passportNo}
											onChange={handleInputChange}
											placeholder="e.g., AE987654321"
											className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
										/>
									</div>

									<div>
										<label className="block text-sm font-semibold text-gray-700 mb-2">
											Passport Expiry Date
										</label>
										<input
											type="date"
											name="ct_passportExpiry"
											value={formData.ct_passportExpiry}
											onChange={handleInputChange}
											className={`w-full px-4 py-3 bg-gray-50 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all ${
												errors.ct_passportExpiry
													? "border-red-500"
													: "border-gray-200 focus:border-blue-500"
											}`}
										/>
										{errors.ct_passportExpiry && (
											<p className="text-xs text-red-600 mt-1">
												{errors.ct_passportExpiry}
											</p>
										)}
									</div>

									<div>
										<label className="block text-sm font-semibold text-gray-700 mb-2">
											Date of Birth
										</label>
										<input
											type="date"
											name="ct_dob"
											value={formData.ct_dob}
											onChange={handleInputChange}
											className={`w-full px-4 py-3 bg-gray-50 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all ${
												errors.ct_dob
													? "border-red-500"
													: "border-gray-200 focus:border-blue-500"
											}`}
										/>
										{errors.ct_dob && (
											<p className="text-xs text-red-600 mt-1">
												{errors.ct_dob}
											</p>
										)}
									</div>

									<div>
										<label className="block text-sm font-semibold text-gray-700 mb-2">
											Nationality
										</label>
										<input
											type="text"
											name="ct_nationality"
											value={formData.ct_nationality}
											onChange={handleInputChange}
											placeholder="e.g., Emirati"
											className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
										/>
									</div>
								</div>
							</div>
						)}

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
										name="ct_additionalNotes"
										value={formData.ct_additionalNotes}
										onChange={handleInputChange}
										rows="4"
										placeholder="Any additional notes about this client..."
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
										Upload contracts, agreements, identification documents, etc.
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
									{isEditMode ? "Update Client" : "Save Client"}
								</button>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default AddClient;
