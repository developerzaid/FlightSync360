import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
	Plane,
	Bell,
	Settings,
	User,
	Menu,
	X,
	ChevronDown,
	Home,
	FileText,
	Package,
	Users,
	DollarSign,
	BarChart3,
	Calendar,
	Fuel,
	Warehouse,
	FileCheck,
	Headset,
	LogOut,
} from "lucide-react";

const Header = () => {
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const [showNotifications, setShowNotifications] = useState(false);
	const [showUserMenu, setShowUserMenu] = useState(false);

	// Mock user data
	const user = {
		name: "John Smith",
		email: "john.smith@example.com",
		company: "Elite Aviation LLC",
		role: "Operations Manager",
	};
	const navigate = useNavigate();
	// Mock notifications
	const notifications = [
		{
			id: 1,
			type: "success",
			message: "Fuel service confirmed for TRIP-2024-001234",
			time: "5 min ago",
		},
		{
			id: 2,
			type: "warning",
			message: "Permit pending approval - DXB",
			time: "1 hour ago",
		},
		{
			id: 3,
			type: "info",
			message: "New quote received from vendor",
			time: "2 hours ago",
		},
	];

	// Navigation menu items
	const menuItems = [
		{
			category: "Main",
			items: [
				{ icon: Home, label: "Dashboard", path: "/dashboard" },
				{ icon: FileText, label: "Trips", path: "/trips" },
				{ icon: Calendar, label: "Calendar", path: "/calendar" },
			],
		},
		{
			category: "Services",
			items: [
				{ icon: Fuel, label: "Fuel Services", path: "/services/fuel" },
				{
					icon: Warehouse,
					label: "Ground Handling",
					path: "/services/ground-handling",
				},
				{
					icon: FileCheck,
					label: "Permits & Clearances",
					path: "/services/permits",
				},
				{ icon: Users, label: "Crew Services", path: "/services/crew" },
				{
					icon: Headset,
					label: "Trip Support",
					path: "/services/trip-support",
				},
			],
		},
		{
			category: "Management",
			items: [
				{ icon: Package, label: "Vendors", path: "/vendors" },
				{ icon: Users, label: "Clients", path: "/clients" },
				{ icon: Plane, label: "Aircraft", path: "/aircrafts" },
				{ icon: Users, label: "Crew", path: "/crews" },

				{ icon: DollarSign, label: "Financial", path: "/financials" },
				{ icon: BarChart3, label: "Reports", path: "/reports" },
			],
		},
	];

	return (
		<>
			{/* Header */}
			<header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
				<div className="px-6">
					<div className="flex items-center justify-between h-16">
						{/* Left Side - Hamburger Menu + Logo */}
						<div className="flex items-center gap-4">
							{/* Hamburger Menu Button */}
							<button
								onClick={() => setSidebarOpen(!sidebarOpen)}
								className="p-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
								title="Toggle Menu"
							>
								<Menu className="w-6 h-6" />
							</button>

							{/* Logo and Name */}
							<div className="flex items-center gap-3">
								<div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center shadow-lg">
									<Plane className="w-6 h-6 text-white transform -rotate-45" />
								</div>
								<div>
									<h1 className="text-xl font-bold text-gray-900 leading-tight">
										FlightPulse360
									</h1>
									<p className="text-xs text-gray-500">
										Aviation Service Management
									</p>
								</div>
							</div>
						</div>

						{/* Right Side - Icons */}
						<div className="flex items-center gap-3">
							{/* Notifications */}
							<div className="relative">
								<button
									onClick={() => {
										setShowNotifications(!showNotifications);
										setShowUserMenu(false);
									}}
									className="relative p-2.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
									title="Notifications"
								>
									<Bell className="w-5 h-5" />
									{notifications.length > 0 && (
										<span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
									)}
								</button>

								{/* Notifications Dropdown */}
								{showNotifications && (
									<>
										<div
											className="fixed inset-0 z-40"
											onClick={() => setShowNotifications(false)}
										></div>
										<div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
											<div className="px-4 py-3 border-b border-gray-200">
												<h3 className="text-sm font-semibold text-gray-900">
													Notifications
												</h3>
											</div>
											<div className="max-h-96 overflow-y-auto">
												{notifications.map((notif) => (
													<div
														key={notif.id}
														className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100"
													>
														<div className="flex items-start gap-3">
															<div
																className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
																	notif.type === "success"
																		? "bg-green-500"
																		: notif.type === "warning"
																		? "bg-yellow-500"
																		: "bg-blue-500"
																}`}
															></div>
															<div className="flex-1 min-w-0">
																<p className="text-sm text-gray-900">
																	{notif.message}
																</p>
																<p className="text-xs text-gray-500 mt-1">
																	{notif.time}
																</p>
															</div>
														</div>
													</div>
												))}
											</div>
											<div className="px-4 py-2 border-t border-gray-200">
												<button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
													View all notifications
												</button>
											</div>
										</div>
									</>
								)}
							</div>

							{/* Settings */}
							<button
								className="p-2.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
								title="Settings"
							>
								<Settings className="w-5 h-5" />
							</button>

							{/* Divider */}
							<div className="w-px h-8 bg-gray-300 mx-1"></div>

							{/* User Menu */}
							<div className="relative">
								<button
									onClick={() => {
										setShowUserMenu(!showUserMenu);
										setShowNotifications(false);
									}}
									className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 rounded-lg transition-colors"
								>
									<div className="w-9 h-9 bg-blue-600 rounded-full flex items-center justify-center">
										<User className="w-5 h-5 text-white" />
									</div>
									<div className="text-left">
										<p className="text-sm font-medium text-gray-900 leading-tight">
											{user.name}
										</p>
										<p className="text-xs text-gray-500">{user.role}</p>
									</div>
									<ChevronDown className="w-4 h-4 text-gray-600" />
								</button>

								{/* User Dropdown */}
								{showUserMenu && (
									<>
										<div
											className="fixed inset-0 z-40"
											onClick={() => setShowUserMenu(false)}
										></div>
										<div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
											<div className="px-4 py-3 border-b border-gray-200">
												<p className="text-sm font-medium text-gray-900">
													{user.name}
												</p>
												<p className="text-xs text-gray-500 mt-0.5">
													{user.email}
												</p>
												<p className="text-xs text-gray-500 mt-1">
													{user.company}
												</p>
												<p className="text-xs text-blue-600 mt-1 font-medium">
													{user.role}
												</p>
											</div>
											<div className="py-2">
												<button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-3">
													<User className="w-4 h-4" />
													My Profile
												</button>
												<button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-3">
													<Settings className="w-4 h-4" />
													Account Settings
												</button>
											</div>
											<div className="border-t border-gray-200 pt-2">
												<button className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-3">
													<LogOut className="w-4 h-4" />
													Sign Out
												</button>
											</div>
										</div>
									</>
								)}
							</div>
						</div>
					</div>
				</div>
			</header>

			{/* Sidebar Navigation */}
			{sidebarOpen && (
				<>
					{/* Overlay */}
					<div
						className="fixed inset-0 bg-black bg-opacity-50 z-40"
						onClick={() => setSidebarOpen(false)}
					></div>

					{/* Sidebar */}
					<div className="fixed top-0 left-0 h-full w-72 bg-white shadow-2xl z-50">
						{/* Sidebar Header */}
						<div className="flex items-center justify-between p-5 border-b border-gray-200">
							<div className="flex items-center gap-3">
								<div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center shadow-lg">
									<Plane className="w-6 h-6 text-white transform -rotate-45" />
								</div>
								<div>
									<h2 className="text-lg font-bold text-gray-900">
										FlightPulse360
									</h2>
									<p className="text-xs text-gray-500">Menu</p>
								</div>
							</div>
							<button
								onClick={() => setSidebarOpen(false)}
								className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
							>
								<X className="w-5 h-5" />
							</button>
						</div>

						{/* Sidebar Content */}
						<div className="overflow-y-auto h-[calc(100vh-81px)] p-4">
							{menuItems.map((section, idx) => (
								<div key={idx} className="mb-6">
									<h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-3">
										{section.category}
									</h3>
									<div className="space-y-1">
										{section.items.map((item, itemIdx) => {
											const Icon = item.icon;
											return (
												<button
													key={itemIdx}
													onClick={() => {
														// handle navigation here
														navigate(item.path);
														console.log("Navigate to:", item.path);
														setSidebarOpen(false);
													}}
													className="w-full flex items-center gap-3 px-3 py-2.5 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors group"
												>
													<Icon className="w-5 h-5 text-gray-500 group-hover:text-blue-600 flex-shrink-0" />
													<span className="text-sm font-medium">
														{item.label}
													</span>
												</button>
											);
										})}
									</div>
								</div>
							))}
						</div>
					</div>
				</>
			)}
		</>
	);
};

export default Header;
