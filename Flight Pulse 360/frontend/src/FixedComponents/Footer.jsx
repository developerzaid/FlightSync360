import React from "react";
import { Plane } from "lucide-react";

const Footer = () => {
	return (
		<footer className="bg-white border-t border-gray-200 mt-auto">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
				<div className="flex flex-col md:flex-row items-center justify-between gap-4">
					{/* Left - Logo and Brand */}
					<div className="flex items-center gap-2">
						<div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
							<Plane className="w-5 h-5 text-white transform -rotate-45" />
						</div>
						<div>
							<p className="text-sm font-semibold text-gray-900">
								FlightPulse360
							</p>
							<p className="text-xs text-gray-500">
								Aviation Service Management
							</p>
						</div>
					</div>

					{/* Center - Copyright */}
					<div className="text-center">
						<p className="text-sm text-gray-600">
							© {new Date().getFullYear()} FlightPulse360. All rights reserved.
						</p>
					</div>

					{/* Right - Developer Credit */}
					<div className="text-center md:text-right">
						<p className="text-sm text-gray-600">
							Developed by{" "}
							<span className="font-semibold text-blue-600">
								Hazyaz Technologies
							</span>
						</p>
						<p className="text-xs text-gray-500 mt-0.5">
							Innovative Software Solutions
						</p>
					</div>
				</div>

				{/* Optional: Additional Footer Links */}
				<div className="mt-6 pt-6 border-t border-gray-200">
					<div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600">
						<a href="#" className="hover:text-blue-600 transition-colors">
							Terms of Service
						</a>
						<a href="#" className="hover:text-blue-600 transition-colors">
							Privacy Policy
						</a>
						<a href="#" className="hover:text-blue-600 transition-colors">
							Documentation
						</a>
						<a href="#" className="hover:text-blue-600 transition-colors">
							Support
						</a>
						<a href="#" className="hover:text-blue-600 transition-colors">
							Contact Us
						</a>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
