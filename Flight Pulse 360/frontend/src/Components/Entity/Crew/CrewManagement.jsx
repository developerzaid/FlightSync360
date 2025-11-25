import React, { useState, useEffect } from "react";
import CrewList from "./CrewList";
import AddCrew from "./AddCrew";
import CrewDetails from "./CrewDetails";
import { CheckCircle } from "lucide-react";

const CrewManagement = () => {
	const [crew, setCrew] = useState([]);
	const [loading, setLoading] = useState(false);
	const [showAddEditModal, setShowAddEditModal] = useState(false);
	const [showDetailsModal, setShowDetailsModal] = useState(false);
	const [selectedCrew, setSelectedCrew] = useState(null);
	const [isEditMode, setIsEditMode] = useState(false);
	const [successMessage, setSuccessMessage] = useState("");

	// Mock data - Replace with API call
	useEffect(() => {
		fetchCrew();
	}, []);

	const fetchCrew = async () => {
		setLoading(true);
		try {
			// TODO: Replace with actual API call
			// const response = await fetch('/api/crew');
			// const data = await response.json();

			// Mock data for now
			const mockData = [
				{
					cr_id: "CR-2024-001",
					uxUniversalCompanyId: "COMP-001",
					cr_name: "Captain James Rodriguez",
					cr_type: "Pilot",
					cr_email: "james.rodriguez@flightpulse.com",
					cr_phone: "+1 305 555 0100",
					cr_passportNo: "US123456789",
					cr_visaDetails: "Valid until Dec 2026 - Multiple countries",
					cr_licenseNo: "ATP-US-123456",
					cr_licenseExpiryDate: "2027-06-15",
					cr_totalFlightHours: "8500",
					cr_typeRatingCertificate: "Boeing 737, Airbus A320, Embraer 190",
					cr_baseLocation: "Miami International Airport (MIA)",
					cr_languageSpoken: "English, Spanish, Portuguese",
					cr_notes:
						"Senior captain with excellent safety record. Available for international routes.",
					ac_documents: "license.pdf,medical_cert.pdf,type_rating.pdf",
				},
				{
					cr_id: "CR-2024-002",
					uxUniversalCompanyId: "COMP-001",
					cr_name: "Sarah Chen",
					cr_type: "Cabin Attendant",
					cr_email: "sarah.chen@flightpulse.com",
					cr_phone: "+44 20 7946 0123",
					cr_passportNo: "GB987654321",
					cr_visaDetails: "EU/UK/US visa valid",
					cr_licenseNo: "CA-UK-789012",
					cr_licenseExpiryDate: "2026-03-20",
					cr_totalFlightHours: "3200",
					cr_typeRatingCertificate: "Safety & Emergency Procedures Certified",
					cr_baseLocation: "London Heathrow (LHR)",
					cr_languageSpoken: "English, Mandarin, Cantonese",
					cr_notes: "Excellent customer service skills. First aid certified.",
					ac_documents: "cabin_crew_cert.pdf,first_aid.pdf,safety_training.pdf",
				},
				{
					cr_id: "CR-2024-003",
					uxUniversalCompanyId: "COMP-001",
					cr_name: "Ahmed Hassan",
					cr_type: "Ground Staff",
					cr_email: "ahmed.hassan@flightpulse.com",
					cr_phone: "+971 4 123 4500",
					cr_passportNo: "AE112233445",
					cr_visaDetails: "GCC work permit valid",
					cr_licenseNo: "GS-UAE-456789",
					cr_licenseExpiryDate: "2025-12-31",
					cr_totalFlightHours: "N/A",
					cr_typeRatingCertificate: "Ground Operations, Cargo Handling",
					cr_baseLocation: "Dubai International Airport (DXB)",
					cr_languageSpoken: "Arabic, English, Hindi",
					cr_notes: "Experienced in ground operations and cargo management.",
					ac_documents: "ground_staff_cert.pdf,security_clearance.pdf",
				},
			];

			setCrew(mockData);
		} catch (error) {
			console.error("Error fetching crew:", error);
			showSuccessMessage("Error loading crew", "error");
		} finally {
			setLoading(false);
		}
	};

	// Handler: Add new crew member
	const handleAddNew = () => {
		setIsEditMode(false);
		setSelectedCrew(null);
		setShowAddEditModal(true);
	};

	// Handler: Edit crew member
	const handleEdit = (crewMember) => {
		setIsEditMode(true);
		setSelectedCrew(crewMember);
		setShowAddEditModal(true);
	};

	// Handler: View crew details
	const handleView = (crewMember) => {
		setSelectedCrew(crewMember);
		setShowDetailsModal(true);
	};

	// Handler: Delete crew member
	const handleDelete = async (crewId) => {
		try {
			// TODO: Replace with actual API call
			// await fetch(`/api/crew/${crewId}`, { method: 'DELETE' });

			setCrew(crew.filter((c) => c.cr_id !== crewId));
			showSuccessMessage("Crew member deleted successfully!");
		} catch (error) {
			console.error("Error deleting crew member:", error);
			showSuccessMessage("Error deleting crew member", "error");
		}
	};

	// Handler: Save crew member (create or update) - UPDATED to handle files
	const handleSave = async (crewDataOrFormData) => {
		try {
			// Check if we have FormData (with files) or plain object
			const isFormData = crewDataOrFormData instanceof FormData;

			if (isEditMode) {
				// TODO: Replace with actual API call
				// if (isFormData) {
				//   await fetch(`/api/crew/${selectedCrew.cr_id}`, {
				//     method: 'PUT',
				//     headers: { 'Authorization': `Bearer ${token}` },
				//     body: crewDataOrFormData
				//   });
				// } else {
				//   await fetch(`/api/crew/${selectedCrew.cr_id}`, {
				//     method: 'PUT',
				//     headers: {
				//       'Authorization': `Bearer ${token}`,
				//       'Content-Type': 'application/json'
				//     },
				//     body: JSON.stringify(crewDataOrFormData)
				//   });
				// }

				// For mock: extract data from FormData if needed
				let crewData = crewDataOrFormData;
				if (isFormData) {
					crewData = {};
					for (let [key, value] of crewDataOrFormData.entries()) {
						if (key !== "files") {
							crewData[key] = value;
						}
					}
				}

				setCrew(
					crew.map((c) =>
						c.cr_id === selectedCrew.cr_id
							? { ...crewData, cr_id: selectedCrew.cr_id }
							: c
					)
				);
				showSuccessMessage("Crew member updated successfully!");
			} else {
				// TODO: Replace with actual API call
				// const response = await fetch('/api/crew', {
				//   method: 'POST',
				//   headers: isFormData ? { 'Authorization': `Bearer ${token}` } : {
				//     'Authorization': `Bearer ${token}`,
				//     'Content-Type': 'application/json'
				//   },
				//   body: isFormData ? crewDataOrFormData : JSON.stringify(crewDataOrFormData)
				// });
				// const newCrew = await response.json();

				// For mock: extract data from FormData if needed
				let crewData = crewDataOrFormData;
				if (isFormData) {
					crewData = {};
					for (let [key, value] of crewDataOrFormData.entries()) {
						if (key !== "files") {
							crewData[key] = value;
						}
					}
				}

				const newCrew = {
					...crewData,
					cr_id: `CR-2024-${String(crew.length + 1).padStart(3, "0")}`,
					uxUniversalCompanyId: "COMP-001",
				};
				setCrew([...crew, newCrew]);
				showSuccessMessage("Crew member added successfully!");
			}

			setShowAddEditModal(false);
		} catch (error) {
			console.error("Error saving crew member:", error);
			showSuccessMessage("Error saving crew member", "error");
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

				{/* Crew List Component */}
				<CrewList
					crew={crew}
					loading={loading}
					onAddNew={handleAddNew}
					onEdit={handleEdit}
					onView={handleView}
					onDelete={handleDelete}
				/>

				{/* Add/Edit Modal */}
				{showAddEditModal && (
					<AddCrew
						crew={selectedCrew}
						isEditMode={isEditMode}
						onSave={handleSave}
						onClose={() => setShowAddEditModal(false)}
					/>
				)}

				{/* Details Modal */}
				{showDetailsModal && selectedCrew && (
					<CrewDetails
						crew={selectedCrew}
						onClose={() => setShowDetailsModal(false)}
						onEdit={() => {
							setShowDetailsModal(false);
							handleEdit(selectedCrew);
						}}
						onDelete={() => {
							setShowDetailsModal(false);
							handleDelete(selectedCrew.cr_id);
						}}
					/>
				)}
			</div>
		</div>
	);
};

export default CrewManagement;
