import React, { useState, useEffect } from "react";
import ClientList from "./ClientList";
import AddClient from "./AddClient";
import ClientDetails from "./ClientDetails";
import { CheckCircle } from "lucide-react";

const ClientManagement = () => {
	const [clients, setClients] = useState([]);
	const [loading, setLoading] = useState(false);
	const [showAddEditModal, setShowAddEditModal] = useState(false);
	const [showDetailsModal, setShowDetailsModal] = useState(false);
	const [selectedClient, setSelectedClient] = useState(null);
	const [isEditMode, setIsEditMode] = useState(false);
	const [successMessage, setSuccessMessage] = useState("");

	// Mock data - Replace with API call
	useEffect(() => {
		fetchClients();
	}, []);

	const fetchClients = async () => {
		setLoading(true);
		try {
			// TODO: Replace with actual API call
			// const response = await fetch('/api/clients');
			// const data = await response.json();

			// Mock data for now
			const mockData = [
				{
					ct_id: "CL-2024-001",
					uxUniversalCompanyId: "COMP-001",
					ct_name: "John Smith",
					ct_company: "Global Aviation Partners LLC",
					ct_phoneNo: "+1 212 555 0100",
					ct_emailAddress: "john.smith@globalaviation.com",
					ct_country: "United States",
					ct_city: "New York",
					ct_address: "450 Park Avenue, Manhattan, NY 10022",
					ct_role: "COMPANY",
					ct_taxId: "US-TAX-123456789",
					ct_paymentTerms: "Net 30",
					ct_bankDetails: "Chase Bank - Account: ****5678",
					ct_Insurance: "Lloyd's of London - Policy: AV-2024-456",
					ct_passportNo: "",
					ct_passportExpiry: "",
					ct_dob: "",
					ct_nationality: "",
					ct_additionalNotes:
						"Premium corporate client. Handles international charter operations.",
					ct_documents: [],
				},
				{
					ct_id: "CL-2024-002",
					uxUniversalCompanyId: "COMP-001",
					ct_name: "Sarah Al-Mansoori",
					ct_company: "",
					ct_phoneNo: "+971 4 555 7890",
					ct_emailAddress: "sarah.almansoori@email.com",
					ct_country: "United Arab Emirates",
					ct_city: "Dubai",
					ct_address: "Palm Jumeirah, Villa 234",
					ct_role: "OTHERS",
					ct_taxId: "",
					ct_paymentTerms: "",
					ct_bankDetails: "",
					ct_Insurance: "",
					ct_passportNo: "AE987654321",
					ct_passportExpiry: "2028-06-15",
					ct_dob: "1985-03-20",
					ct_nationality: "Emirati",
					ct_additionalNotes:
						"VIP individual client. Prefers luxury aircraft. Frequent Middle East to Europe routes.",
					ct_documents: [],
				},
				{
					ct_id: "CL-2024-003",
					uxUniversalCompanyId: "COMP-001",
					ct_name: "Michael Chen",
					ct_company: "Pacific Enterprises Ltd",
					ct_phoneNo: "+852 2345 6789",
					ct_emailAddress: "michael.chen@pacific-ent.hk",
					ct_country: "Hong Kong",
					ct_city: "Central",
					ct_address: "IFC Tower 2, 8 Finance Street",
					ct_role: "COMPANY",
					ct_taxId: "HK-TAX-987654321",
					ct_paymentTerms: "Net 15",
					ct_bankDetails: "HSBC Hong Kong - Account: ****1234",
					ct_Insurance: "AIG - Policy: COM-2024-789",
					ct_passportNo: "",
					ct_passportExpiry: "",
					ct_dob: "",
					ct_nationality: "",
					ct_additionalNotes:
						"Corporate client specializing in Asia-Pacific business travel.",
					ct_documents: [],
				},
			];

			setClients(mockData);
		} catch (error) {
			console.error("Error fetching clients:", error);
			showSuccessMessage("Error loading clients", "error");
		} finally {
			setLoading(false);
		}
	};

	// Handler: Add new client
	const handleAddNew = () => {
		setIsEditMode(false);
		setSelectedClient(null);
		setShowAddEditModal(true);
	};

	// Handler: Edit client
	const handleEdit = (client) => {
		setIsEditMode(true);
		setSelectedClient(client);
		setShowAddEditModal(true);
	};

	// Handler: View client details
	const handleView = (client) => {
		setSelectedClient(client);
		setShowDetailsModal(true);
	};

	// Handler: Delete client
	const handleDelete = async (clientId) => {
		try {
			// TODO: Replace with actual API call
			// await fetch(`/api/clients/${clientId}`, { method: 'DELETE' });

			setClients(clients.filter((c) => c.ct_id !== clientId));
			showSuccessMessage("Client deleted successfully!");
		} catch (error) {
			console.error("Error deleting client:", error);
			showSuccessMessage("Error deleting client", "error");
		}
	};

	// Handler: Save client (create or update) - Handles files
	const handleSave = async (clientDataOrFormData) => {
		try {
			// Check if we have FormData (with files) or plain object
			const isFormData = clientDataOrFormData instanceof FormData;

			if (isEditMode) {
				// TODO: Replace with actual API call
				// if (isFormData) {
				//   await fetch(`/api/clients/${selectedClient.ct_id}`, {
				//     method: 'PUT',
				//     headers: { 'Authorization': `Bearer ${token}` },
				//     body: clientDataOrFormData
				//   });
				// } else {
				//   await fetch(`/api/clients/${selectedClient.ct_id}`, {
				//     method: 'PUT',
				//     headers: {
				//       'Authorization': `Bearer ${token}`,
				//       'Content-Type': 'application/json'
				//     },
				//     body: JSON.stringify(clientDataOrFormData)
				//   });
				// }

				// For mock: extract data from FormData if needed
				let clientData = clientDataOrFormData;
				if (isFormData) {
					clientData = {};
					for (let [key, value] of clientDataOrFormData.entries()) {
						if (key !== "files") {
							clientData[key] = value;
						}
					}
				}

				setClients(
					clients.map((c) =>
						c.ct_id === selectedClient.ct_id
							? { ...clientData, ct_id: selectedClient.ct_id }
							: c
					)
				);
				showSuccessMessage("Client updated successfully!");
			} else {
				// TODO: Replace with actual API call
				// const response = await fetch('/api/clients', {
				//   method: 'POST',
				//   headers: isFormData ? { 'Authorization': `Bearer ${token}` } : {
				//     'Authorization': `Bearer ${token}`,
				//     'Content-Type': 'application/json'
				//   },
				//   body: isFormData ? clientDataOrFormData : JSON.stringify(clientDataOrFormData)
				// });
				// const newClient = await response.json();

				// For mock: extract data from FormData if needed
				let clientData = clientDataOrFormData;
				if (isFormData) {
					clientData = {};
					for (let [key, value] of clientDataOrFormData.entries()) {
						if (key !== "files") {
							clientData[key] = value;
						}
					}
				}

				const newClient = {
					...clientData,
					ct_id: `CL-2024-${String(clients.length + 1).padStart(3, "0")}`,
					uxUniversalCompanyId: "COMP-001",
				};
				setClients([...clients, newClient]);
				showSuccessMessage("Client added successfully!");
			}

			setShowAddEditModal(false);
		} catch (error) {
			console.error("Error saving client:", error);
			showSuccessMessage("Error saving client", "error");
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

				{/* Client List Component */}
				<ClientList
					clients={clients}
					loading={loading}
					onAddNew={handleAddNew}
					onEdit={handleEdit}
					onView={handleView}
					onDelete={handleDelete}
				/>

				{/* Add/Edit Modal */}
				{showAddEditModal && (
					<AddClient
						client={selectedClient}
						isEditMode={isEditMode}
						onSave={handleSave}
						onClose={() => setShowAddEditModal(false)}
					/>
				)}

				{/* Details Modal */}
				{showDetailsModal && selectedClient && (
					<ClientDetails
						client={selectedClient}
						onClose={() => setShowDetailsModal(false)}
						onEdit={() => {
							setShowDetailsModal(false);
							handleEdit(selectedClient);
						}}
						onDelete={() => {
							setShowDetailsModal(false);
							handleDelete(selectedClient.ct_id);
						}}
					/>
				)}
			</div>
		</div>
	);
};

export default ClientManagement;
