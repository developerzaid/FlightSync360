import React, { useState, useEffect } from "react";
import { X, Save, User, IdCard, Award, FileText } from "lucide-react";
import FileUpload from "../Util/FileUpload";

const AddCrew = ({ crew, isEditMode, onSave, onClose }) => {
	const [formData, setFormData] = useState({
		cr_name: "",
		cr_type: "",
		cr_email: "",
		cr_phone: "",
		cr_passportNo: "",
		cr_visaDetails: "",
		cr_licenseNo: "",
		cr_licenseExpiryDate: "",
		cr_totalFlightHours: "",
		cr_typeRatingCertificate: "",
		cr_baseLocation: "",
		cr_languageSpoken: "",
		cr_notes: "",
	});

	// NEW: State for uploaded files
	const [uploadedFiles, setUploadedFiles] = useState([]);
	const [errors, setErrors] = useState({});

	const crewTypes = ["Pilot", "Cabin Attendant", "Ground Staff", "Other"];

	// Load crew data if editing
	useEffect(() => {
		if (isEditMode && crew) {
			setFormData({ ...crew });
		}
	}, [isEditMode, crew]);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));

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

		if (!formData.cr_name.trim()) newErrors.cr_name = "Name is required";
		if (!formData.cr_type) newErrors.cr_type = "Crew type is required";
		if (!formData.cr_email.trim()) newErrors.cr_email = "Email is required";
		if (!formData.cr_phone.trim()) newErrors.cr_phone = "Phone is required";
		if (!formData.cr_baseLocation.trim())
			newErrors.cr_baseLocation = "Base location is required";

		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (formData.cr_email && !emailRegex.test(formData.cr_email)) {
			newErrors.cr_email = "Invalid email format";
		}

		if (formData.cr_licenseExpiryDate) {
			const expiryDate = new Date(formData.cr_licenseExpiryDate);
			const today = new Date();
			today.setHours(0, 0, 0, 0);

			if (expiryDate < today) {
				newErrors.cr_licenseExpiryDate =
					"License expiry date must be in the future";
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
				// No files, send as regular object
				onSave(formData);
			}
		}
	};

	return (
		<div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 overflow-y-auto">
			<div className="min-h-screen p-4 md:p-8">
				<div className="max-w-4xl mx-auto">
					<form onSubmit={handleSubmit}>
						{/* Personal Information Section */}
						<div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
							<div className="flex items-center justify-between mb-6">
								<h2 className="text-2xl font-bold text-gray-900">
									{isEditMode ? "Edit Crew Member" : "Add New Crew Member"}
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
								Personal Information
							</h3>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<div>
									<label className="block text-sm font-semibold text-gray-700 mb-2">
										Full Name <span className="text-red-500">*</span>
									</label>
									<input
										type="text"
										name="cr_name"
										value={formData.cr_name}
										onChange={handleInputChange}
										placeholder="e.g., Captain James Rodriguez"
										className={`w-full px-4 py-3 bg-gray-50 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all ${
											errors.cr_name
												? "border-red-500"
												: "border-gray-200 focus:border-blue-500"
										}`}
									/>
									{errors.cr_name && (
										<p className="text-xs text-red-600 mt-1">
											{errors.cr_name}
										</p>
									)}
								</div>

								<div>
									<label className="block text-sm font-semibold text-gray-700 mb-2">
										Crew Type <span className="text-red-500">*</span>
									</label>
									<select
										name="cr_type"
										value={formData.cr_type}
										onChange={handleInputChange}
										className={`w-full px-4 py-3 bg-gray-50 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all ${
											errors.cr_type
												? "border-red-500"
												: "border-gray-200 focus:border-blue-500"
										}`}
									>
										<option value="">Select crew type...</option>
										{crewTypes.map((type) => (
											<option key={type} value={type}>
												{type}
											</option>
										))}
									</select>
									{errors.cr_type && (
										<p className="text-xs text-red-600 mt-1">
											{errors.cr_type}
										</p>
									)}
								</div>

								<div>
									<label className="block text-sm font-semibold text-gray-700 mb-2">
										Email <span className="text-red-500">*</span>
									</label>
									<input
										type="email"
										name="cr_email"
										value={formData.cr_email}
										onChange={handleInputChange}
										placeholder="e.g., james@flightpulse.com"
										className={`w-full px-4 py-3 bg-gray-50 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all ${
											errors.cr_email
												? "border-red-500"
												: "border-gray-200 focus:border-blue-500"
										}`}
									/>
									{errors.cr_email && (
										<p className="text-xs text-red-600 mt-1">
											{errors.cr_email}
										</p>
									)}
								</div>

								<div>
									<label className="block text-sm font-semibold text-gray-700 mb-2">
										Phone <span className="text-red-500">*</span>
									</label>
									<input
										type="tel"
										name="cr_phone"
										value={formData.cr_phone}
										onChange={handleInputChange}
										placeholder="e.g., +1 305 555 0100"
										className={`w-full px-4 py-3 bg-gray-50 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all ${
											errors.cr_phone
												? "border-red-500"
												: "border-gray-200 focus:border-blue-500"
										}`}
									/>
									{errors.cr_phone && (
										<p className="text-xs text-red-600 mt-1">
											{errors.cr_phone}
										</p>
									)}
								</div>

								<div className="md:col-span-2">
									<label className="block text-sm font-semibold text-gray-700 mb-2">
										Base Location <span className="text-red-500">*</span>
									</label>
									<input
										type="text"
										name="cr_baseLocation"
										value={formData.cr_baseLocation}
										onChange={handleInputChange}
										placeholder="e.g., Miami International Airport (MIA)"
										className={`w-full px-4 py-3 bg-gray-50 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all ${
											errors.cr_baseLocation
												? "border-red-500"
												: "border-gray-200 focus:border-blue-500"
										}`}
									/>
									{errors.cr_baseLocation && (
										<p className="text-xs text-red-600 mt-1">
											{errors.cr_baseLocation}
										</p>
									)}
								</div>

								<div className="md:col-span-2">
									<label className="block text-sm font-semibold text-gray-700 mb-2">
										Languages Spoken
									</label>
									<input
										type="text"
										name="cr_languageSpoken"
										value={formData.cr_languageSpoken}
										onChange={handleInputChange}
										placeholder="e.g., English, Spanish, Portuguese"
										className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
									/>
									<p className="text-xs text-gray-500 mt-1">
										Enter languages separated by commas
									</p>
								</div>
							</div>
						</div>

						{/* Travel Documents Section */}
						<div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
							<h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
								<IdCard className="w-5 h-5 text-blue-600" />
								Travel Documents
							</h3>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<div>
									<label className="block text-sm font-semibold text-gray-700 mb-2">
										Passport Number
									</label>
									<input
										type="text"
										name="cr_passportNo"
										value={formData.cr_passportNo}
										onChange={handleInputChange}
										placeholder="e.g., US123456789"
										className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
									/>
								</div>

								<div>
									<label className="block text-sm font-semibold text-gray-700 mb-2">
										Visa Details
									</label>
									<input
										type="text"
										name="cr_visaDetails"
										value={formData.cr_visaDetails}
										onChange={handleInputChange}
										placeholder="e.g., Valid until Dec 2026 - Multiple countries"
										className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
									/>
								</div>
							</div>
						</div>

						{/* License & Certification Section */}
						<div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
							<h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
								<Award className="w-5 h-5 text-blue-600" />
								License & Certification
							</h3>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<div>
									<label className="block text-sm font-semibold text-gray-700 mb-2">
										License Number
									</label>
									<input
										type="text"
										name="cr_licenseNo"
										value={formData.cr_licenseNo}
										onChange={handleInputChange}
										placeholder="e.g., ATP-US-123456"
										className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
									/>
								</div>

								<div>
									<label className="block text-sm font-semibold text-gray-700 mb-2">
										License Expiry Date
									</label>
									<input
										type="date"
										name="cr_licenseExpiryDate"
										value={formData.cr_licenseExpiryDate}
										onChange={handleInputChange}
										className={`w-full px-4 py-3 bg-gray-50 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all ${
											errors.cr_licenseExpiryDate
												? "border-red-500"
												: "border-gray-200 focus:border-blue-500"
										}`}
									/>
									{errors.cr_licenseExpiryDate && (
										<p className="text-xs text-red-600 mt-1">
											{errors.cr_licenseExpiryDate}
										</p>
									)}
								</div>

								<div>
									<label className="block text-sm font-semibold text-gray-700 mb-2">
										Total Flight Hours
									</label>
									<input
										type="text"
										name="cr_totalFlightHours"
										value={formData.cr_totalFlightHours}
										onChange={handleInputChange}
										placeholder="e.g., 8500 (or N/A for ground staff)"
										className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
									/>
									<p className="text-xs text-gray-500 mt-1">
										Enter N/A for non-flight crew
									</p>
								</div>

								<div>
									<label className="block text-sm font-semibold text-gray-700 mb-2">
										Type Rating / Certifications
									</label>
									<input
										type="text"
										name="cr_typeRatingCertificate"
										value={formData.cr_typeRatingCertificate}
										onChange={handleInputChange}
										placeholder="e.g., Boeing 737, Airbus A320"
										className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
									/>
									<p className="text-xs text-gray-500 mt-1">
										Enter certifications separated by commas
									</p>
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
										Notes
									</label>
									<textarea
										name="cr_notes"
										value={formData.cr_notes}
										onChange={handleInputChange}
										rows="4"
										placeholder="Any additional notes or special requirements..."
										className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
									/>
								</div>

								{/* NEW: File Upload Component */}
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
									{isEditMode ? "Update Crew Member" : "Save Crew Member"}
								</button>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default AddCrew;
