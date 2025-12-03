import React, { useState } from "react";
import AircraftList from "./AircraftList";
import AddAircraft from "./AddAircraft";
import AircraftDetails from "./AircraftDetails";

const AircraftManagement = () => {
	const [currentView, setCurrentView] = useState("list"); // 'list', 'add', 'edit', 'details'
	const [selectedAircraft, setSelectedAircraft] = useState(null);
	const [selectedAircraftId, setSelectedAircraftId] = useState(null);

	const handleAddAircraft = () => {
		setCurrentView("add");
		setSelectedAircraft(null);
	};

	const handleEditAircraft = (aircraft) => {
		setSelectedAircraft(aircraft);
		setCurrentView("edit");
	};

	const handleViewDetails = (aircraftId) => {
		setSelectedAircraftId(aircraftId);
		setCurrentView("details");
	};

	const handleAddSuccess = (newAircraft) => {
		console.log("Aircraft saved:", newAircraft);
		setCurrentView("list");
	};

	const handleEditSuccess = (updatedAircraft) => {
		console.log("Aircraft updated:", updatedAircraft);
		setCurrentView("list");
		setSelectedAircraft(null);
	};

	const handleClose = () => {
		setCurrentView("list");
		setSelectedAircraft(null);
		setSelectedAircraftId(null);
	};

	const handleDeleteFromDetails = (aircraftId) => {
		console.log("Delete aircraft:", aircraftId);
		handleClose();
	};

	return (
		<>
			{/* List View */}
			{currentView === "list" && (
				<AircraftList
					onAdd={handleAddAircraft}
					onEdit={handleEditAircraft}
					onViewDetails={handleViewDetails}
				/>
			)}

			{/* Add Aircraft View */}
			{currentView === "add" && (
				<AddAircraft onClose={handleClose} onSuccess={handleAddSuccess} />
			)}

			{/* Edit Aircraft View */}
			{currentView === "edit" && selectedAircraft && (
				<AddAircraft
					aircraft={selectedAircraft}
					onClose={handleClose}
					onSuccess={handleEditSuccess}
					isEdit={true}
				/>
			)}

			{/* Aircraft Details Modal */}
			{currentView === "details" && selectedAircraftId && (
				<AircraftDetails
					aircraftId={selectedAircraftId}
					onClose={handleClose}
					onEdit={handleEditAircraft}
					onDelete={handleDeleteFromDetails}
				/>
			)}
		</>
	);
};

export default AircraftManagement;
