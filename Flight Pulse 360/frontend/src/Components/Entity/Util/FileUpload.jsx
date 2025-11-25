import React, { useState } from "react";
import {
	Upload,
	X,
	FileText,
	Image as ImageIcon,
	File,
	CheckCircle,
} from "lucide-react";

const FileUpload = ({
	files = [],
	onChange,
	maxFiles = 10,
	maxSizeMB = 10,
	acceptedTypes = ".pdf,.doc,.docx,.jpg,.jpeg,.png",
}) => {
	const [dragActive, setDragActive] = useState(false);

	// Get file icon based on type
	const getFileIcon = (fileName) => {
		const extension = fileName.split(".").pop().toLowerCase();

		if (["jpg", "jpeg", "png", "gif", "webp"].includes(extension)) {
			return ImageIcon;
		} else if (["pdf"].includes(extension)) {
			return FileText;
		} else {
			return File;
		}
	};

	// Format file size
	const formatFileSize = (bytes) => {
		if (bytes === 0) return "0 Bytes";
		const k = 1024;
		const sizes = ["Bytes", "KB", "MB", "GB"];
		const i = Math.floor(Math.log(bytes) / Math.log(k));
		return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
	};

	// Handle file selection
	const handleFileSelect = (e) => {
		const selectedFiles = Array.from(e.target.files);
		processFiles(selectedFiles);
	};

	// Process and validate files
	const processFiles = (selectedFiles) => {
		// Check max files limit
		if (files.length + selectedFiles.length > maxFiles) {
			alert(`Maximum ${maxFiles} files allowed`);
			return;
		}

		// Validate file sizes
		const maxSizeBytes = maxSizeMB * 1024 * 1024;
		const validFiles = selectedFiles.filter((file) => {
			if (file.size > maxSizeBytes) {
				alert(`${file.name} is too large. Max size is ${maxSizeMB}MB`);
				return false;
			}
			return true;
		});

		// Add new files to existing files
		const updatedFiles = [...files, ...validFiles];
		onChange(updatedFiles);
	};

	// Handle drag events
	const handleDrag = (e) => {
		e.preventDefault();
		e.stopPropagation();
		if (e.type === "dragenter" || e.type === "dragover") {
			setDragActive(true);
		} else if (e.type === "dragleave") {
			setDragActive(false);
		}
	};

	// Handle drop
	const handleDrop = (e) => {
		e.preventDefault();
		e.stopPropagation();
		setDragActive(false);

		const droppedFiles = Array.from(e.dataTransfer.files);
		processFiles(droppedFiles);
	};

	// Remove file
	const removeFile = (indexToRemove) => {
		const updatedFiles = files.filter((_, index) => index !== indexToRemove);
		onChange(updatedFiles);
	};

	return (
		<div className="space-y-4">
			{/* Upload Area */}
			<div
				className={`relative border-2 border-dashed rounded-xl p-6 transition-all ${
					dragActive
						? "border-blue-500 bg-blue-50"
						: "border-gray-300 bg-gray-50 hover:border-gray-400"
				}`}
				onDragEnter={handleDrag}
				onDragLeave={handleDrag}
				onDragOver={handleDrag}
				onDrop={handleDrop}
			>
				<input
					type="file"
					id="file-upload"
					multiple
					accept={acceptedTypes}
					onChange={handleFileSelect}
					className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
				/>

				<div className="text-center">
					<div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
						<Upload className="w-6 h-6 text-blue-600" />
					</div>
					<p className="text-sm font-semibold text-gray-900 mb-1">
						Click to upload or drag and drop
					</p>
					<p className="text-xs text-gray-500">
						PDF, DOC, JPG, PNG up to {maxSizeMB}MB (Max {maxFiles} files)
					</p>
				</div>
			</div>

			{/* File List */}
			{files.length > 0 && (
				<div className="space-y-2">
					<p className="text-sm font-semibold text-gray-700">
						Uploaded Files ({files.length}/{maxFiles})
					</p>

					<div className="space-y-2">
						{files.map((file, index) => {
							const FileIcon = getFileIcon(file.name);
							return (
								<div
									key={index}
									className="flex items-center gap-3 p-3 bg-white border-2 border-gray-200 rounded-xl hover:border-blue-300 transition-all group"
								>
									{/* File Icon */}
									<div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
										<FileIcon className="w-5 h-5 text-blue-600" />
									</div>

									{/* File Info */}
									<div className="flex-1 min-w-0">
										<p className="text-sm font-semibold text-gray-900 truncate">
											{file.name}
										</p>
										<p className="text-xs text-gray-500">
											{formatFileSize(file.size)}
										</p>
									</div>

									{/* Success Icon */}
									<CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />

									{/* Remove Button */}
									<button
										type="button"
										onClick={() => removeFile(index)}
										className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all opacity-0 group-hover:opacity-100"
									>
										<X className="w-4 h-4" />
									</button>
								</div>
							);
						})}
					</div>
				</div>
			)}
		</div>
	);
};

export default FileUpload;
