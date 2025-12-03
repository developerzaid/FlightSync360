import React, { useState, useEffect } from "react";
import VendorList from "./VendorList";
import AddVendor from "./AddVendor";
import VendorDetails from "./VendorDetails";
import { CheckCircle } from "lucide-react";

const VendorManagement = () => {
	const [vendors, setVendors] = useState([]);
	const [loading, setLoading] = useState(false);
	const [showAddEditModal, setShowAddEditModal] = useState(false);
	const [showDetailsModal, setShowDetailsModal] = useState(false);
	const [selectedVendor, setSelectedVendor] = useState(null);
	const [isEditMode, setIsEditMode] = useState(false);
	const [successMessage, setSuccessMessage] = useState("");

	// Mock data - Replace with API call
	useEffect(() => {
		fetchVendors();
	}, []);

	const fetchVendors = async () => {
		setLoading(true);
		try {
			// TODO: Replace with actual API call
			// const response = await fetch('/api/vendors');
			// const data = await response.json();

			// Mock data for now
			const mockData = [
				{
					vn_Id: "VN-2024-001",
					uxUniversalCompanyId: "COMP-001",
					vn_name: "John Smith",
					vn_company: "Global Fuel Services Ltd",
					vn_phoneNo: "+44 20 7946 0958",
					vn_alternatePhoneNo: "+44 20 7946 0959",
					vn_emailAddress: "john.smith@globalfuel.com",
					vn_alternateEmailAddress: "info@globalfuel.com",
					vn_serviceType: "Fuel Services",
					vn_country: "United Kingdom",
					vn_city: "London",
					vn_address: "123 Aviation Way, Heathrow",
					vn_taxId: "GB123456789",
					vn_paymentTerms: "Net 30",
					vn_bankDetails: "HSBC - GB29 NWBK 6016 1331 9268 19",
					vn_Insurance: "Lloyd's of London - Policy #LL-2024-456",
					vn_additionalNotes:
						"Preferred vendor for European operations. 24/7 availability.",
					vn_documents: "insurance_cert.pdf,vat_registration.pdf",
				},
				{
					vn_Id: "VN-2024-002",
					uxUniversalCompanyId: "COMP-001",
					vn_name: "Maria Garcia",
					vn_company: "Premier Ground Handling Inc",
					vn_phoneNo: "+1 305 555 0123",
					vn_alternatePhoneNo: "+1 305 555 0124",
					vn_emailAddress: "maria@premierground.com",
					vn_alternateEmailAddress: "ops@premierground.com",
					vn_serviceType: "Ground Handling",
					vn_country: "United States",
					vn_city: "Miami",
					vn_address: "500 Airport Terminal Blvd",
					vn_taxId: "US98-7654321",
					vn_paymentTerms: "Net 15",
					vn_bankDetails: "Chase Bank - US12 3456 7890 1234 5678 90",
					vn_Insurance: "AIG Aviation - Policy #AIG-2024-789",
					vn_additionalNotes: "Excellent track record. Handles VIP services.",
					vn_documents: "license.pdf,insurance.pdf,certifications.pdf",
				},
				{
					vn_Id: "VN-2024-003",
					uxUniversalCompanyId: "COMP-001",
					vn_name: "Ahmed Al-Rahman",
					vn_company: "Middle East Permits & Clearance",
					vn_phoneNo: "+971 4 123 4567",
					vn_alternatePhoneNo: "+971 4 123 4568",
					vn_emailAddress: "ahmed@mepclearance.ae",
					vn_alternateEmailAddress: "permits@mepclearance.ae",
					vn_serviceType: "Permits & Clearances",
					vn_country: "United Arab Emirates",
					vn_city: "Dubai",
					vn_address: "Dubai International Airport, Terminal 3",
					vn_taxId: "AE100123456700003",
					vn_paymentTerms: "Advance Payment",
					vn_bankDetails: "Emirates NBD - AE07 0331 2345 6789 0123 456",
					vn_Insurance: "Dubai Insurance - Policy #DI-2024-321",
					vn_additionalNotes:
						"Fast permit processing. Covers all Middle East regions.",
					vn_documents: "trade_license.pdf,authorization.pdf",
				},
			];

			setVendors(mockData);
		} catch (error) {
			console.error("Error fetching vendors:", error);
			showSuccessMessage("Error loading vendors", "error");
		} finally {
			setLoading(false);
		}
	};

	// Handler: Add new vendor
	const handleAddNew = () => {
		setIsEditMode(false);
		setSelectedVendor(null);
		setShowAddEditModal(true);
	};

	// Handler: Edit vendor
	const handleEdit = (vendor) => {
		setIsEditMode(true);
		setSelectedVendor(vendor);
		setShowAddEditModal(true);
	};

	// Handler: View vendor details
	const handleView = (vendor) => {
		setSelectedVendor(vendor);
		setShowDetailsModal(true);
	};

	// Handler: Delete vendor
	const handleDelete = async (vendorId) => {
		try {
			// TODO: Replace with actual API call
			// await fetch(`/api/vendors/${vendorId}`, { method: 'DELETE' });

			setVendors(vendors.filter((v) => v.vn_Id !== vendorId));
			showSuccessMessage("Vendor deleted successfully!");
		} catch (error) {
			console.error("Error deleting vendor:", error);
			showSuccessMessage("Error deleting vendor", "error");
		}
	};

	// Handler: Save vendor (create or update)
	const handleSave = async (vendorData) => {
		try {
			if (isEditMode) {
				// TODO: Replace with actual API call
				// await fetch(`/api/vendors/${selectedVendor.vn_Id}`, {
				//   method: 'PUT',
				//   body: JSON.stringify(vendorData)
				// });

				setVendors(
					vendors.map((v) =>
						v.vn_Id === selectedVendor.vn_Id
							? { ...vendorData, vn_Id: selectedVendor.vn_Id }
							: v
					)
				);
				showSuccessMessage("Vendor updated successfully!");
			} else {
				// TODO: Replace with actual API call
				// const response = await fetch('/api/vendors', {
				//   method: 'POST',
				//   body: JSON.stringify(vendorData)
				// });
				// const newVendor = await response.json();

				const newVendor = {
					...vendorData,
					vn_Id: `VN-2024-${String(vendors.length + 1).padStart(3, "0")}`,
					uxUniversalCompanyId: "COMP-001",
				};
				setVendors([...vendors, newVendor]);
				showSuccessMessage("Vendor added successfully!");
			}

			setShowAddEditModal(false);
		} catch (error) {
			console.error("Error saving vendor:", error);
			showSuccessMessage("Error saving vendor", "error");
		}
	};

	// Helper: Show success/error message
	const showSuccessMessage = (message, type = "success") => {
		setSuccessMessage({ message, type });
		setTimeout(() => setSuccessMessage(""), 3000);
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6">
			<div className="max-w-7xl mx-auto">
				{/* Success/Error Message */}
				{successMessage && (
					<div
						className={`${
							successMessage.type === "error"
								? "bg-red-50 border-red-200 text-red-800"
								: "bg-green-50 border-green-200 text-green-800"
						} border-2 rounded-2xl p-4 mb-6 flex items-center gap-3`}
					>
						<CheckCircle
							className={`w-6 h-6 ${
								successMessage.type === "error"
									? "text-red-600"
									: "text-green-600"
							} flex-shrink-0`}
						/>
						<p className="font-medium">{successMessage.message}</p>
					</div>
				)}

				{/* Vendor List Component */}
				<VendorList
					vendors={vendors}
					loading={loading}
					onAddNew={handleAddNew}
					onEdit={handleEdit}
					onView={handleView}
					onDelete={handleDelete}
				/>

				{/* Add/Edit Modal */}
				{showAddEditModal && (
					<AddVendor
						vendor={selectedVendor}
						isEditMode={isEditMode}
						onSave={handleSave}
						onClose={() => setShowAddEditModal(false)}
					/>
				)}

				{/* Details Modal */}
				{showDetailsModal && selectedVendor && (
					<VendorDetails
						vendor={selectedVendor}
						onClose={() => setShowDetailsModal(false)}
						onEdit={() => {
							setShowDetailsModal(false);
							handleEdit(selectedVendor);
						}}
						onDelete={() => {
							setShowDetailsModal(false);
							handleDelete(selectedVendor.vn_Id);
						}}
					/>
				)}
			</div>
		</div>
	);
};

export default VendorManagement;
