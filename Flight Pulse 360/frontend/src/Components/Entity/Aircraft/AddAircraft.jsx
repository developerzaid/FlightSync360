import React, { useState, useEffect } from "react";
import {
	Plane,
	Save,
	X,
	Upload,
	FileText,
	Trash2,
	CheckCircle,
} from "lucide-react";

const AddAircraft = ({ aircraft, onClose, onSuccess, isEdit = false }) => {
	const [currentStep, setCurrentStep] = useState(1);
	const [formData, setFormData] = useState({
		ac_TailNo: "",
		ac_Type: "",
		ac_Manufacturer: "",
		ac_Model: "",
		ac_YearManufactured: "",
		ac_PassengerCapacity: "",
		ac_MaxRange: "",
		ac_CruiseSpeed: "",
		ac_FuelCapacity: "",
		ac_WingSpan: "",
		ac_maxTakeOffWeight: "",
		ac_HomeBase: "",
		ac_RegistrationDate: "",
		ac_InsuranceDetails: "",
		ac_Notes: "",
	});

	const [documents, setDocuments] = useState([]);
	const [success, setSuccess] = useState("");

	useEffect(() => {
		if (isEdit && aircraft) {
			setFormData({
				ac_TailNo: aircraft.ac_TailNo || "",
				ac_Type: aircraft.ac_Type || "",
				ac_Manufacturer: aircraft.ac_Manufacturer || "",
				ac_Model: aircraft.ac_Model || "",
				ac_YearManufactured: aircraft.ac_YearManufactured || "",
				ac_PassengerCapacity: aircraft.ac_PassengerCapacity || "",
				ac_MaxRange: aircraft.ac_MaxRange || "",
				ac_CruiseSpeed: aircraft.ac_CruiseSpeed || "",
				ac_FuelCapacity: aircraft.ac_FuelCapacity || "",
				ac_WingSpan: aircraft.ac_WingSpan || "",
				ac_maxTakeOffWeight: aircraft.ac_maxTakeOffWeight || "",
				ac_HomeBase: aircraft.ac_HomeBase || "",
				ac_RegistrationDate: aircraft.ac_RegistrationDate || "",
				ac_InsuranceDetails: aircraft.ac_InsuranceDetails || "",
				ac_Notes: aircraft.ac_Notes || "",
			});
		}
	}, [isEdit, aircraft]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleFileUpload = (e) => {
		const files = Array.from(e.target.files);
		const newDocs = files.map((file) => ({
			id: Date.now() + Math.random(),
			name: file.name,
			size: (file.size / 1024).toFixed(2) + " KB",
			type: file.type,
			uploadDate: new Date().toISOString(),
		}));
		setDocuments((prev) => [...prev, ...newDocs]);
	};

	const removeDocument = (id) => {
		setDocuments((prev) => prev.filter((doc) => doc.id !== id));
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		const submitData = {
			...formData,
			documents: documents,
		};

		setSuccess(
			isEdit ? "Aircraft updated successfully!" : "Aircraft added successfully!"
		);
		console.log("Submit data:", submitData);

		if (!isEdit) {
			setFormData({
				ac_TailNo: "",
				ac_Type: "",
				ac_Manufacturer: "",
				ac_Model: "",
				ac_YearManufactured: "",
				ac_PassengerCapacity: "",
				ac_MaxRange: "",
				ac_CruiseSpeed: "",
				ac_FuelCapacity: "",
				ac_WingSpan: "",
				ac_maxTakeOffWeight: "",
				ac_HomeBase: "",
				ac_RegistrationDate: "",
				ac_InsuranceDetails: "",
				ac_Notes: "",
			});
			setDocuments([]);
			setCurrentStep(1);
		}

		if (onSuccess) {
			setTimeout(() => onSuccess(submitData), 1500);
		}
	};

	const steps = [
		{ number: 1, name: "Basic Info", icon: Plane },
		{ number: 2, name: "Performance", icon: CheckCircle },
		{ number: 3, name: "Registration", icon: FileText },
		{ number: 4, name: "Documents", icon: Upload },
	];

	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6">
			<div className="max-w-4xl mx-auto">
				{/* Header */}
				<div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
					<div className="flex items-center justify-between mb-6">
						<div className="flex items-center gap-4">
							<div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center shadow-lg">
								<Plane className="w-8 h-8 text-white transform -rotate-45" />
							</div>
							<div>
								<h1 className="text-3xl font-bold text-gray-900">
									{isEdit ? "Edit Aircraft" : "Add New Aircraft"}
								</h1>
								<p className="text-gray-500 mt-1">
									{isEdit
										? "Update aircraft information"
										: "Register a new aircraft in your fleet"}
								</p>
							</div>
						</div>
						{onClose && (
							<button
								onClick={onClose}
								className="p-3 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-all"
							>
								<X className="w-6 h-6" />
							</button>
						)}
					</div>

					{/* Progress Steps */}
					<div className="flex items-center justify-between">
						{steps.map((step, index) => (
							<React.Fragment key={step.number}>
								<div className="flex flex-col items-center">
									<button
										onClick={() => setCurrentStep(step.number)}
										className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
											currentStep === step.number
												? "bg-blue-600 text-white shadow-lg scale-110"
												: currentStep > step.number
												? "bg-green-500 text-white"
												: "bg-gray-200 text-gray-400"
										}`}
									>
										<step.icon className="w-6 h-6" />
									</button>
									<span
										className={`text-xs mt-2 font-medium ${
											currentStep === step.number
												? "text-blue-600"
												: "text-gray-500"
										}`}
									>
										{step.name}
									</span>
								</div>
								{index < steps.length - 1 && (
									<div
										className={`flex-1 h-1 mx-4 rounded ${
											currentStep > step.number ? "bg-green-500" : "bg-gray-200"
										}`}
									/>
								)}
							</React.Fragment>
						))}
					</div>
				</div>

				{/* Success Message */}
				{success && (
					<div className="bg-green-50 border-2 border-green-200 rounded-2xl p-4 mb-6 flex items-center gap-3 animate-bounce">
						<CheckCircle className="w-6 h-6 text-green-600" />
						<p className="text-green-800 font-medium">{success}</p>
					</div>
				)}

				{/* Form */}
				<form onSubmit={handleSubmit}>
					{/* Step 1: Basic Information */}
					{currentStep === 1 && (
						<div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
							<h2 className="text-2xl font-bold text-gray-900 mb-6">
								Basic Information
							</h2>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<div>
									<label className="block text-sm font-semibold text-gray-700 mb-2">
										Tail Number <span className="text-red-500">*</span>
									</label>
									<input
										type="text"
										name="ac_TailNo"
										value={formData.ac_TailNo}
										onChange={handleChange}
										required
										placeholder="e.g., N123AB"
										className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
									/>
								</div>

								<div>
									<label className="block text-sm font-semibold text-gray-700 mb-2">
										Aircraft Type <span className="text-red-500">*</span>
									</label>
									<select
										name="ac_Type"
										value={formData.ac_Type}
										onChange={handleChange}
										required
										className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
									>
										<option value="">Select Type</option>
										<option value="Jet">Jet</option>
										<option value="Turboprop">Turboprop</option>
										<option value="Piston">Piston</option>
										<option value="Helicopter">Helicopter</option>
									</select>
								</div>

								<div>
									<label className="block text-sm font-semibold text-gray-700 mb-2">
										Manufacturer <span className="text-red-500">*</span>
									</label>
									<input
										type="text"
										name="ac_Manufacturer"
										value={formData.ac_Manufacturer}
										onChange={handleChange}
										required
										placeholder="e.g., Gulfstream"
										className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
									/>
								</div>

								<div>
									<label className="block text-sm font-semibold text-gray-700 mb-2">
										Model <span className="text-red-500">*</span>
									</label>
									<input
										type="text"
										name="ac_Model"
										value={formData.ac_Model}
										onChange={handleChange}
										required
										placeholder="e.g., G650"
										className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
									/>
								</div>

								<div>
									<label className="block text-sm font-semibold text-gray-700 mb-2">
										Year Manufactured
									</label>
									<input
										type="number"
										name="ac_YearManufactured"
										value={formData.ac_YearManufactured}
										onChange={handleChange}
										placeholder="e.g., 2020"
										min="1900"
										max={new Date().getFullYear()}
										className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
									/>
								</div>

								<div>
									<label className="block text-sm font-semibold text-gray-700 mb-2">
										Passenger Capacity
									</label>
									<input
										type="number"
										name="ac_PassengerCapacity"
										value={formData.ac_PassengerCapacity}
										onChange={handleChange}
										placeholder="e.g., 12"
										min="1"
										className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
									/>
								</div>
							</div>
						</div>
					)}

					{/* Step 2: Performance Specifications */}
					{currentStep === 2 && (
						<div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
							<h2 className="text-2xl font-bold text-gray-900 mb-6">
								Performance Specifications
							</h2>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<div>
									<label className="block text-sm font-semibold text-gray-700 mb-2">
										Maximum Range (NM)
									</label>
									<input
										type="text"
										name="ac_MaxRange"
										value={formData.ac_MaxRange}
										onChange={handleChange}
										placeholder="e.g., 7000"
										className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
									/>
								</div>

								<div>
									<label className="block text-sm font-semibold text-gray-700 mb-2">
										Cruise Speed (knots)
									</label>
									<input
										type="text"
										name="ac_CruiseSpeed"
										value={formData.ac_CruiseSpeed}
										onChange={handleChange}
										placeholder="e.g., 516"
										className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
									/>
								</div>

								<div>
									<label className="block text-sm font-semibold text-gray-700 mb-2">
										Fuel Capacity (gallons)
									</label>
									<input
										type="text"
										name="ac_FuelCapacity"
										value={formData.ac_FuelCapacity}
										onChange={handleChange}
										placeholder="e.g., 4000"
										className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
									/>
								</div>

								<div>
									<label className="block text-sm font-semibold text-gray-700 mb-2">
										Wing Span (ft)
									</label>
									<input
										type="text"
										name="ac_WingSpan"
										value={formData.ac_WingSpan}
										onChange={handleChange}
										placeholder="e.g., 99.7"
										className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
									/>
								</div>

								<div>
									<label className="block text-sm font-semibold text-gray-700 mb-2">
										Max Takeoff Weight (lbs)
									</label>
									<input
										type="text"
										name="ac_maxTakeOffWeight"
										value={formData.ac_maxTakeOffWeight}
										onChange={handleChange}
										placeholder="e.g., 99600"
										className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
									/>
								</div>
							</div>
						</div>
					)}

					{/* Step 3: Registration & Operation */}
					{currentStep === 3 && (
						<div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
							<h2 className="text-2xl font-bold text-gray-900 mb-6">
								Registration & Operation
							</h2>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<div>
									<label className="block text-sm font-semibold text-gray-700 mb-2">
										Home Base Airport
									</label>
									<input
										type="text"
										name="ac_HomeBase"
										value={formData.ac_HomeBase}
										onChange={handleChange}
										placeholder="e.g., KJFK"
										className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
									/>
								</div>

								<div>
									<label className="block text-sm font-semibold text-gray-700 mb-2">
										Registration Date
									</label>
									<input
										type="date"
										name="ac_RegistrationDate"
										value={formData.ac_RegistrationDate}
										onChange={handleChange}
										className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
									/>
								</div>

								<div className="md:col-span-2">
									<label className="block text-sm font-semibold text-gray-700 mb-2">
										Insurance Details
									</label>
									<textarea
										name="ac_InsuranceDetails"
										value={formData.ac_InsuranceDetails}
										onChange={handleChange}
										rows="4"
										placeholder="Policy number, provider, coverage details..."
										className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
									/>
								</div>

								<div className="md:col-span-2">
									<label className="block text-sm font-semibold text-gray-700 mb-2">
										Additional Notes
									</label>
									<textarea
										name="ac_Notes"
										value={formData.ac_Notes}
										onChange={handleChange}
										rows="4"
										placeholder="Any additional information..."
										className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
									/>
								</div>
							</div>
						</div>
					)}

					{/* Step 4: Documents */}
					{currentStep === 4 && (
						<div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
							<h2 className="text-2xl font-bold text-gray-900 mb-6">
								Aircraft Documents
							</h2>

							{/* Upload Area */}
							<div className="mb-6">
								<label className="block text-sm font-semibold text-gray-700 mb-3">
									Upload Documents
								</label>
								<div className="border-3 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:border-blue-500 transition-all bg-gray-50">
									<input
										type="file"
										id="file-upload"
										multiple
										onChange={handleFileUpload}
										className="hidden"
										accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
									/>
									<label htmlFor="file-upload" className="cursor-pointer">
										<div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
											<Upload className="w-8 h-8 text-blue-600" />
										</div>
										<p className="text-lg font-semibold text-gray-700 mb-2">
											Click to upload documents
										</p>
										<p className="text-sm text-gray-500">
											PDF, DOC, DOCX, JPG, PNG (Max 10MB each)
										</p>
									</label>
								</div>
							</div>

							{/* Document Categories */}
							<div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
								<div className="p-4 bg-blue-50 rounded-xl text-center border-2 border-blue-200">
									<FileText className="w-6 h-6 text-blue-600 mx-auto mb-2" />
									<p className="text-xs font-semibold text-blue-900">
										Registration
									</p>
								</div>
								<div className="p-4 bg-green-50 rounded-xl text-center border-2 border-green-200">
									<FileText className="w-6 h-6 text-green-600 mx-auto mb-2" />
									<p className="text-xs font-semibold text-green-900">
										Insurance
									</p>
								</div>
								<div className="p-4 bg-purple-50 rounded-xl text-center border-2 border-purple-200">
									<FileText className="w-6 h-6 text-purple-600 mx-auto mb-2" />
									<p className="text-xs font-semibold text-purple-900">
										Maintenance
									</p>
								</div>
								<div className="p-4 bg-orange-50 rounded-xl text-center border-2 border-orange-200">
									<FileText className="w-6 h-6 text-orange-600 mx-auto mb-2" />
									<p className="text-xs font-semibold text-orange-900">Other</p>
								</div>
							</div>

							{/* Uploaded Documents List */}
							{documents.length > 0 && (
								<div>
									<h3 className="text-lg font-semibold text-gray-900 mb-4">
										Uploaded Documents ({documents.length})
									</h3>
									<div className="space-y-3">
										{documents.map((doc) => (
											<div
												key={doc.id}
												className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border-2 border-gray-200"
											>
												<div className="flex items-center gap-3">
													<div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
														<FileText className="w-5 h-5 text-blue-600" />
													</div>
													<div>
														<p className="font-semibold text-gray-900">
															{doc.name}
														</p>
														<p className="text-sm text-gray-500">{doc.size}</p>
													</div>
												</div>
												<button
													type="button"
													onClick={() => removeDocument(doc.id)}
													className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all"
												>
													<Trash2 className="w-5 h-5" />
												</button>
											</div>
										))}
									</div>
								</div>
							)}
						</div>
					)}

					{/* Navigation Buttons */}
					<div className="bg-white rounded-2xl shadow-lg p-6">
						<div className="flex items-center justify-between">
							<div>
								{currentStep > 1 && (
									<button
										type="button"
										onClick={() => setCurrentStep(currentStep - 1)}
										className="px-6 py-3 text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition-all font-semibold"
									>
										Previous
									</button>
								)}
							</div>

							<div className="flex gap-3">
								{onClose && (
									<button
										type="button"
										onClick={onClose}
										className="px-6 py-3 text-gray-700 bg-white border-2 border-gray-300 rounded-xl hover:bg-gray-50 transition-all font-semibold"
									>
										Cancel
									</button>
								)}

								{currentStep < 4 ? (
									<button
										type="button"
										onClick={() => setCurrentStep(currentStep + 1)}
										className="px-8 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all font-semibold shadow-lg"
									>
										Next Step
									</button>
								) : (
									<button
										type="submit"
										className="px-8 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl hover:from-green-700 hover:to-green-800 transition-all font-semibold shadow-lg flex items-center gap-2"
									>
										<Save className="w-5 h-5" />
										{isEdit ? "Update Aircraft" : "Save Aircraft"}
									</button>
								)}
							</div>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};

export default AddAircraft;
