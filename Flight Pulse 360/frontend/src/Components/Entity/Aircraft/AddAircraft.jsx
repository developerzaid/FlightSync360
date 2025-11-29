import React, { useState, useEffect } from "react";
import { Save, X, Upload, FileText, Trash2 } from "lucide-react";

const AddAircraft = ({ aircraft, onClose, onSuccess, isEdit = false }) => {
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
			if (aircraft.documents) {
				setDocuments(aircraft.documents);
			}
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
			category: "General",
		}));
		setDocuments((prev) => [...prev, ...newDocs]);
	};

	const updateDocumentCategory = (id, category) => {
		setDocuments((prev) =>
			prev.map((doc) => (doc.id === id ? { ...doc, category } : doc))
		);
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

		console.log("Submit data:", submitData);

		if (onSuccess) {
			onSuccess(submitData);
		}
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4">
			<div className="max-w-[1600px] mx-auto">
				{/* Header */}
				<div className="mb-4">
					<div className="flex items-center justify-between">
						<div>
							<h1 className="text-2xl font-bold text-gray-900">
								{isEdit ? "Edit Aircraft" : "Add New Aircraft"}
							</h1>
							<p className="text-sm text-gray-600">
								{isEdit
									? "Update aircraft information"
									: "Register a new aircraft in your fleet"}
							</p>
						</div>
						{onClose && (
							<button
								onClick={onClose}
								className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all"
							>
								<X className="w-5 h-5" />
							</button>
						)}
					</div>
				</div>

				{/* Form */}
				<form onSubmit={handleSubmit}>
					{/* Basic Information */}
					<div className="bg-white rounded-xl shadow-md p-5 mb-4">
						<h2 className="text-lg font-bold text-gray-900 mb-4">
							Basic Information
						</h2>

						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
							<div>
								<label className="block text-xs font-medium text-gray-700 mb-1">
									Tail Number <span className="text-red-500">*</span>
								</label>
								<input
									type="text"
									name="ac_TailNo"
									value={formData.ac_TailNo}
									onChange={handleChange}
									required
									placeholder="e.g., N123AB"
									className="w-full px-3 py-2 text-sm bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
								/>
							</div>

							<div>
								<label className="block text-xs font-medium text-gray-700 mb-1">
									Aircraft Type <span className="text-red-500">*</span>
								</label>
								<select
									name="ac_Type"
									value={formData.ac_Type}
									onChange={handleChange}
									required
									className="w-full px-3 py-2 text-sm bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
								>
									<option value="">Select Type</option>
									<option value="Jet">Jet</option>
									<option value="Turboprop">Turboprop</option>
									<option value="Piston">Piston</option>
									<option value="Helicopter">Helicopter</option>
								</select>
							</div>

							<div>
								<label className="block text-xs font-medium text-gray-700 mb-1">
									Manufacturer <span className="text-red-500">*</span>
								</label>
								<input
									type="text"
									name="ac_Manufacturer"
									value={formData.ac_Manufacturer}
									onChange={handleChange}
									required
									placeholder="e.g., Gulfstream"
									className="w-full px-3 py-2 text-sm bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
								/>
							</div>

							<div>
								<label className="block text-xs font-medium text-gray-700 mb-1">
									Model <span className="text-red-500">*</span>
								</label>
								<input
									type="text"
									name="ac_Model"
									value={formData.ac_Model}
									onChange={handleChange}
									required
									placeholder="e.g., G650"
									className="w-full px-3 py-2 text-sm bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
								/>
							</div>

							<div>
								<label className="block text-xs font-medium text-gray-700 mb-1">
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
									className="w-full px-3 py-2 text-sm bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
								/>
							</div>

							<div>
								<label className="block text-xs font-medium text-gray-700 mb-1">
									Passenger Capacity
								</label>
								<input
									type="number"
									name="ac_PassengerCapacity"
									value={formData.ac_PassengerCapacity}
									onChange={handleChange}
									placeholder="e.g., 12"
									min="1"
									className="w-full px-3 py-2 text-sm bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
								/>
							</div>
						</div>
					</div>

					{/* Performance Specifications */}
					<div className="bg-white rounded-xl shadow-md p-5 mb-4">
						<h2 className="text-lg font-bold text-gray-900 mb-4">
							Performance Specifications
						</h2>

						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
							<div>
								<label className="block text-xs font-medium text-gray-700 mb-1">
									Maximum Range (NM)
								</label>
								<input
									type="text"
									name="ac_MaxRange"
									value={formData.ac_MaxRange}
									onChange={handleChange}
									placeholder="e.g., 7000"
									className="w-full px-3 py-2 text-sm bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
								/>
							</div>

							<div>
								<label className="block text-xs font-medium text-gray-700 mb-1">
									Cruise Speed (knots)
								</label>
								<input
									type="text"
									name="ac_CruiseSpeed"
									value={formData.ac_CruiseSpeed}
									onChange={handleChange}
									placeholder="e.g., 516"
									className="w-full px-3 py-2 text-sm bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
								/>
							</div>

							<div>
								<label className="block text-xs font-medium text-gray-700 mb-1">
									Fuel Capacity (gallons)
								</label>
								<input
									type="text"
									name="ac_FuelCapacity"
									value={formData.ac_FuelCapacity}
									onChange={handleChange}
									placeholder="e.g., 4000"
									className="w-full px-3 py-2 text-sm bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
								/>
							</div>

							<div>
								<label className="block text-xs font-medium text-gray-700 mb-1">
									Wing Span (ft)
								</label>
								<input
									type="text"
									name="ac_WingSpan"
									value={formData.ac_WingSpan}
									onChange={handleChange}
									placeholder="e.g., 99.7"
									className="w-full px-3 py-2 text-sm bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
								/>
							</div>

							<div>
								<label className="block text-xs font-medium text-gray-700 mb-1">
									Max Takeoff Weight (lbs)
								</label>
								<input
									type="text"
									name="ac_maxTakeOffWeight"
									value={formData.ac_maxTakeOffWeight}
									onChange={handleChange}
									placeholder="e.g., 99600"
									className="w-full px-3 py-2 text-sm bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
								/>
							</div>
						</div>
					</div>

					{/* Registration & Operation */}
					<div className="bg-white rounded-xl shadow-md p-5 mb-4">
						<h2 className="text-lg font-bold text-gray-900 mb-4">
							Registration & Operation
						</h2>

						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
							<div>
								<label className="block text-xs font-medium text-gray-700 mb-1">
									Home Base Airport
								</label>
								<input
									type="text"
									name="ac_HomeBase"
									value={formData.ac_HomeBase}
									onChange={handleChange}
									placeholder="e.g., KJFK"
									maxLength={4}
									className="w-full px-3 py-2 text-sm bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono"
								/>
							</div>

							<div>
								<label className="block text-xs font-medium text-gray-700 mb-1">
									Registration Date
								</label>
								<input
									type="date"
									name="ac_RegistrationDate"
									value={formData.ac_RegistrationDate}
									onChange={handleChange}
									className="w-full px-3 py-2 text-sm bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
								/>
							</div>

							<div className="md:col-span-2 lg:col-span-3">
								<label className="block text-xs font-medium text-gray-700 mb-1">
									Insurance Details
								</label>
								<textarea
									name="ac_InsuranceDetails"
									value={formData.ac_InsuranceDetails}
									onChange={handleChange}
									rows="3"
									placeholder="Policy number, provider, coverage details..."
									className="w-full px-3 py-2 text-sm bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
								/>
							</div>

							<div className="md:col-span-2 lg:col-span-3">
								<label className="block text-xs font-medium text-gray-700 mb-1">
									Additional Notes
								</label>
								<textarea
									name="ac_Notes"
									value={formData.ac_Notes}
									onChange={handleChange}
									rows="3"
									placeholder="Any additional information..."
									className="w-full px-3 py-2 text-sm bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
								/>
							</div>
						</div>
					</div>

					{/* Documents */}
					<div className="bg-white rounded-xl shadow-md p-5 mb-4">
						<h2 className="text-lg font-bold text-gray-900 mb-4">
							Aircraft Documents
						</h2>

						{/* Upload Area */}
						<div className="mb-4">
							<label className="block text-xs font-medium text-gray-700 mb-2">
								📎 Upload Documents
							</label>
							<div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-all bg-gray-50">
								<input
									type="file"
									id="file-upload"
									multiple
									onChange={handleFileUpload}
									className="hidden"
									accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
								/>
								<label htmlFor="file-upload" className="cursor-pointer">
									<div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
										<Upload className="w-6 h-6 text-blue-600" />
									</div>
									<p className="text-sm font-bold text-gray-700 mb-1">
										Click to upload documents
									</p>
									<p className="text-xs text-gray-500">
										PDF, DOC, DOCX, JPG, PNG (Max 10MB each)
									</p>
								</label>
							</div>
						</div>

						{/* Document Categories */}
						<div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
							<div className="p-3 bg-blue-50 rounded-lg text-center border border-blue-200">
								<FileText className="w-5 h-5 text-blue-600 mx-auto mb-1" />
								<p className="text-xs font-bold text-blue-900">Registration</p>
							</div>
							<div className="p-3 bg-green-50 rounded-lg text-center border border-green-200">
								<FileText className="w-5 h-5 text-green-600 mx-auto mb-1" />
								<p className="text-xs font-bold text-green-900">Insurance</p>
							</div>
							<div className="p-3 bg-purple-50 rounded-lg text-center border border-purple-200">
								<FileText className="w-5 h-5 text-purple-600 mx-auto mb-1" />
								<p className="text-xs font-bold text-purple-900">Maintenance</p>
							</div>
							<div className="p-3 bg-orange-50 rounded-lg text-center border border-orange-200">
								<FileText className="w-5 h-5 text-orange-600 mx-auto mb-1" />
								<p className="text-xs font-bold text-orange-900">Other</p>
							</div>
						</div>

						{/* Uploaded Documents List */}
						{documents.length > 0 && (
							<div>
								<h3 className="text-sm font-bold text-gray-900 mb-3">
									Uploaded Documents ({documents.length})
								</h3>
								<div className="space-y-2">
									{documents.map((doc) => (
										<div
											key={doc.id}
											className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200"
										>
											<div className="flex items-center gap-3 flex-1 min-w-0">
												<div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
													<FileText className="w-5 h-5 text-blue-600" />
												</div>
												<div className="flex-1 min-w-0">
													<p className="text-sm font-bold text-gray-900 truncate">
														{doc.name}
													</p>
													<p className="text-xs text-gray-500">{doc.size}</p>
												</div>
												<select
													value={doc.category}
													onChange={(e) =>
														updateDocumentCategory(doc.id, e.target.value)
													}
													className="px-2 py-1 text-xs border border-gray-300 rounded bg-white"
												>
													<option value="General">General</option>
													<option value="Registration">Registration</option>
													<option value="Insurance">Insurance</option>
													<option value="Maintenance">Maintenance</option>
													<option value="Other">Other</option>
												</select>
											</div>
											<button
												type="button"
												onClick={() => removeDocument(doc.id)}
												className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all ml-2"
											>
												<Trash2 className="w-4 h-4" />
											</button>
										</div>
									))}
								</div>
							</div>
						)}

						{documents.length === 0 && (
							<div className="text-center py-6 text-sm text-gray-500">
								No documents uploaded yet
							</div>
						)}
					</div>

					{/* Action Buttons */}
					<div className="bg-white rounded-xl shadow-md p-4">
						<div className="flex items-center justify-end gap-2">
							{onClose && (
								<button
									type="button"
									onClick={onClose}
									className="px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-all font-medium"
								>
									Cancel
								</button>
							)}

							<button
								type="submit"
								className="px-6 py-2 text-sm bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:shadow-lg transition-all font-medium flex items-center gap-2"
							>
								<Save className="w-4 h-4" />
								{isEdit ? "Update Aircraft" : "Save Aircraft"}
							</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};

export default AddAircraft;
