import React, { useState } from "react";
import {
	Users,
	Plus,
	Search,
	Filter,
	Grid3x3,
	List,
	Eye,
	Edit,
	Trash2,
	Building2,
	User,
	AlertCircle,
} from "lucide-react";

const ClientList = ({
	clients,
	loading,
	onAddNew,
	onEdit,
	onView,
	onDelete,
}) => {
	const [viewMode, setViewMode] = useState("grid");
	const [searchQuery, setSearchQuery] = useState("");
	const [filterRole, setFilterRole] = useState("all");
	const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
	const [clientToDelete, setClientToDelete] = useState(null);

	const clientRoles = ["COMPANY", "OTHERS"];

	// Filter clients
	const filteredClients = clients.filter((client) => {
		const matchesSearch =
			client.ct_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
			client.ct_emailAddress
				.toLowerCase()
				.includes(searchQuery.toLowerCase()) ||
			client.ct_city.toLowerCase().includes(searchQuery.toLowerCase()) ||
			(client.ct_company &&
				client.ct_company.toLowerCase().includes(searchQuery.toLowerCase()));
		const matchesFilter = filterRole === "all" || client.ct_role === filterRole;
		return matchesSearch && matchesFilter;
	});

	// Get icon for client role
	const getClientIcon = (role) => {
		return role === "COMPANY" ? Building2 : User;
	};

	// Get badge color for client role
	const getBadgeColor = (role) => {
		return role === "COMPANY"
			? "bg-blue-100 text-blue-700"
			: "bg-purple-100 text-purple-700";
	};

	// Statistics
	const stats = [
		{
			label: "Total Clients",
			value: clients.length,
			icon: Users,
			color: "blue",
		},
		{
			label: "Companies",
			value: clients.filter((c) => c.ct_role === "COMPANY").length,
			icon: Building2,
			color: "green",
		},
		{
			label: "Individuals",
			value: clients.filter((c) => c.ct_role === "OTHERS").length,
			icon: User,
			color: "purple",
		},
	];

	const handleDeleteClick = (client) => {
		setClientToDelete(client);
		setShowDeleteConfirm(true);
	};

	const confirmDelete = () => {
		if (clientToDelete) {
			onDelete(clientToDelete.ct_id);
		}
		setShowDeleteConfirm(false);
		setClientToDelete(null);
	};

	if (loading) {
		return (
			<div className="flex items-center justify-center min-h-screen">
				<div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
			</div>
		);
	}

	return (
		<>
			{/* Header */}
			<div className="mb-6">
				<div className="flex items-center justify-between mb-6">
					<div>
						<h1 className="text-4xl font-bold text-gray-900 mb-2">
							Client Management
						</h1>
						<p className="text-gray-600">
							Manage your corporate and individual clients
						</p>
					</div>
					<button
						onClick={onAddNew}
						className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all flex items-center gap-2 shadow-lg font-semibold"
					>
						<Plus className="w-5 h-5" />
						Add Client
					</button>
				</div>
			</div>

			{/* Search & Filter */}
			<div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
				<div className="flex flex-col md:flex-row gap-4">
					{/* Search */}
					<div className="flex-1 relative">
						<Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
						<input
							type="text"
							placeholder="Search by name, email, company, or city..."
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							className="w-full pl-12 pr-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
						/>
					</div>

					{/* Filter */}
					<div className="flex items-center gap-2">
						<Filter className="w-5 h-5 text-gray-400" />
						<select
							value={filterRole}
							onChange={(e) => setFilterRole(e.target.value)}
							className="px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
						>
							<option value="all">All Types</option>
							<option value="COMPANY">Company</option>
							<option value="OTHERS">Individual</option>
						</select>
					</div>

					{/* View Toggle */}
					<div className="flex gap-2">
						<button
							onClick={() => setViewMode("grid")}
							className={`p-3 rounded-xl transition-all ${
								viewMode === "grid"
									? "bg-blue-600 text-white"
									: "bg-gray-100 text-gray-600 hover:bg-gray-200"
							}`}
						>
							<Grid3x3 className="w-5 h-5" />
						</button>
						<button
							onClick={() => setViewMode("list")}
							className={`p-3 rounded-xl transition-all ${
								viewMode === "list"
									? "bg-blue-600 text-white"
									: "bg-gray-100 text-gray-600 hover:bg-gray-200"
							}`}
						>
							<List className="w-5 h-5" />
						</button>
					</div>
				</div>
			</div>

			{/* Client Display */}
			{filteredClients.length === 0 ? (
				<div className="bg-white rounded-2xl shadow-lg p-12 text-center">
					<div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
						<Users className="w-10 h-10 text-gray-400" />
					</div>
					<h3 className="text-xl font-bold text-gray-900 mb-2">
						No Clients Found
					</h3>
					<p className="text-gray-600 mb-6">
						{searchQuery || filterRole !== "all"
							? "Try adjusting your search or filters"
							: "Get started by adding your first client"}
					</p>
					{!searchQuery && filterRole === "all" && (
						<button
							onClick={onAddNew}
							className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all inline-flex items-center gap-2 font-semibold"
						>
							<Plus className="w-5 h-5" />
							Add First Client
						</button>
					)}
				</div>
			) : viewMode === "grid" ? (
				/* Grid View */
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{filteredClients.map((client) => {
						const ClientIcon = getClientIcon(client.ct_role);
						const badgeColor = getBadgeColor(client.ct_role);
						return (
							<div
								key={client.ct_id}
								className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all overflow-hidden group"
							>
								{/* Gradient Header */}
								<div className="bg-gradient-to-br from-blue-600 to-blue-800 p-6 text-white">
									<div className="flex items-start justify-between mb-4">
										<div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
											<ClientIcon className="w-7 h-7 text-white" />
										</div>
										<span
											className={`px-3 py-1 rounded-full text-xs font-semibold bg-white/20 text-white`}
										>
											{client.ct_role === "COMPANY" ? "Company" : "Individual"}
										</span>
									</div>
									<h3 className="text-2xl font-bold mb-1">{client.ct_name}</h3>
									<p className="text-blue-100 text-sm">
										{client.ct_emailAddress}
									</p>
								</div>

								{/* Card Body */}
								<div className="p-6">
									<div className="grid grid-cols-1 gap-4 mb-6">
										{client.ct_company && (
											<div>
												<p className="text-xs text-gray-500 mb-1">Company</p>
												<p className="font-semibold text-gray-900 text-sm">
													{client.ct_company}
												</p>
											</div>
										)}
										<div>
											<p className="text-xs text-gray-500 mb-1">Location</p>
											<p className="font-semibold text-gray-900 text-sm">
												{client.ct_city}, {client.ct_country}
											</p>
										</div>
										{client.ct_role === "COMPANY" && client.ct_paymentTerms && (
											<div>
												<p className="text-xs text-gray-500 mb-1">
													Payment Terms
												</p>
												<p className="font-semibold text-gray-900 text-sm">
													{client.ct_paymentTerms}
												</p>
											</div>
										)}
										{client.ct_role === "OTHERS" && client.ct_nationality && (
											<div>
												<p className="text-xs text-gray-500 mb-1">
													Nationality
												</p>
												<p className="font-semibold text-gray-900 text-sm">
													{client.ct_nationality}
												</p>
											</div>
										)}
									</div>

									{/* Actions */}
									<div className="flex gap-2">
										<button
											onClick={() => onView(client)}
											className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all flex items-center justify-center gap-2 font-medium"
										>
											<Eye className="w-4 h-4" />
											View
										</button>
										<button
											onClick={() => onEdit(client)}
											className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all"
										>
											<Edit className="w-4 h-4" />
										</button>
										<button
											onClick={() => handleDeleteClick(client)}
											className="px-4 py-2 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-all"
										>
											<Trash2 className="w-4 h-4" />
										</button>
									</div>
								</div>
							</div>
						);
					})}
				</div>
			) : (
				/* List View */
				<div className="bg-white rounded-2xl shadow-lg overflow-hidden">
					<table className="w-full">
						<thead className="bg-gray-50 border-b-2 border-gray-200">
							<tr>
								<th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
									Client
								</th>
								<th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
									Type
								</th>
								<th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
									Location
								</th>
								<th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
									Contact
								</th>
								<th className="px-6 py-4 text-right text-xs font-bold text-gray-600 uppercase tracking-wider">
									Actions
								</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-gray-200">
							{filteredClients.map((client) => {
								const ClientIcon = getClientIcon(client.ct_role);
								const badgeColor = getBadgeColor(client.ct_role);
								return (
									<tr
										key={client.ct_id}
										className="hover:bg-gray-50 transition-colors"
									>
										<td className="px-6 py-4">
											<div className="flex items-center gap-3">
												<div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center">
													<ClientIcon className="w-6 h-6 text-white" />
												</div>
												<div>
													<p className="font-bold text-gray-900">
														{client.ct_name}
													</p>
													{client.ct_company && (
														<p className="text-sm text-gray-500">
															{client.ct_company}
														</p>
													)}
												</div>
											</div>
										</td>
										<td className="px-6 py-4">
											<span
												className={`px-3 py-1 rounded-full text-xs font-semibold ${badgeColor}`}
											>
												{client.ct_role === "COMPANY"
													? "Company"
													: "Individual"}
											</span>
										</td>
										<td className="px-6 py-4">
											<p className="font-semibold text-gray-900">
												{client.ct_city}
											</p>
											<p className="text-sm text-gray-500">
												{client.ct_country}
											</p>
										</td>
										<td className="px-6 py-4">
											<div className="text-sm">
												<p className="text-gray-900">{client.ct_phoneNo}</p>
												<p className="text-gray-500">
													{client.ct_emailAddress}
												</p>
											</div>
										</td>
										<td className="px-6 py-4">
											<div className="flex items-center justify-end gap-2">
												<button
													onClick={() => onView(client)}
													className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
													title="View Details"
												>
													<Eye className="w-5 h-5" />
												</button>
												<button
													onClick={() => onEdit(client)}
													className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-all"
													title="Edit"
												>
													<Edit className="w-5 h-5" />
												</button>
												<button
													onClick={() => handleDeleteClick(client)}
													className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all"
													title="Delete"
												>
													<Trash2 className="w-5 h-5" />
												</button>
											</div>
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
			)}

			{/* Delete Confirmation Modal */}
			{showDeleteConfirm && clientToDelete && (
				<div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
					<div className="bg-white rounded-2xl max-w-md w-full p-8 shadow-2xl">
						<div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
							<AlertCircle className="w-8 h-8 text-red-600" />
						</div>
						<h3 className="text-2xl font-bold text-gray-900 text-center mb-2">
							Delete Client
						</h3>
						<p className="text-gray-600 text-center mb-6">
							Are you sure you want to delete{" "}
							<strong>{clientToDelete.ct_name}</strong>? This action cannot be
							undone.
						</p>
						<div className="flex gap-3">
							<button
								onClick={() => {
									setShowDeleteConfirm(false);
									setClientToDelete(null);
								}}
								className="flex-1 px-6 py-3 text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition-all font-semibold"
							>
								Cancel
							</button>
							<button
								onClick={confirmDelete}
								className="flex-1 px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all font-semibold"
							>
								Delete
							</button>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default ClientList;
