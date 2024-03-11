// ImageSelector.js
import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import CameraComponent from "./CameraComponent/CameraComponent";
import UploadImageComponent from "./UploadImageComponent/UploadImageComponent";
import DetectionResultsComponent from "./DetectionResultsComponent/DetectionResultsComponent";

const ImageSelector = () => {
	const [selectedImage, setSelectedImage] = useState(null);
	const [showCamera, setShowCamera] = useState(false);
	const [showUpload, setShowUpload] = useState(false);
	const [showResults, setShowResults] = useState(false);

	const handlePictureTaken = (uri) => {
		setShowCamera(false);
		setSelectedImage(uri);
	};

	const handleImageSelected = (uri) => {
		setSelectedImage(uri);
		setShowUpload(false);
	};

	const handleOpenCamera = () => {
		setShowCamera(true);
		setShowUpload(false);
	};

	const handleOpenUpload = () => {
		setShowUpload(true);
		setShowCamera(false);
	};

	const handleClearImage = () => {
		setSelectedImage(null);
	};

	const handleDetect = async () => {
		try {
			const apiUrl = "http://127.0.0.1:8000/upload";

			const formData = new FormData();
			formData.append("file", {
				uri: selectedImage,
				type: "image/jpeg",
				name: "image.jpg",
			});

			const response = await fetch(apiUrl, {
				method: "POST",
				body: formData,
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});

			if (response.ok) {
				const result = await response.json();
				// Handle the API result as needed
				console.log("API Result:", result);
				setShowResults(true);
			} else {
				console.error("Error in API request:", response.statusText);
			}
		} catch (error) {
			console.log("here");
			console.error("Error in API request:", error);
		}
	};

	return (
		<View>
			{showCamera ? (
				<CameraComponent
					onPictureTaken={handlePictureTaken}
					onClose={() => setShowCamera(false)}
				/>
			) : showUpload ? (
				<UploadImageComponent
					onImageSelected={handleImageSelected}
					onClose={() => setShowUpload(false)}
				/>
			) : showResults ? (
				<DetectionResultsComponent selectedImage={selectedImage} />
			) : (
				<View>
					<TouchableOpacity onPress={handleOpenCamera}>
						<Text>Open Camera</Text>
					</TouchableOpacity>
					<TouchableOpacity onPress={handleOpenUpload}>
						<Text>Upload Image</Text>
					</TouchableOpacity>
				</View>
			)}

			{selectedImage && !showResults && (
				<View>
					<Text>Selected Image:</Text>
					<Image
						source={{ uri: selectedImage }}
						style={{ width: 200, height: 200 }}
					/>
					<TouchableOpacity onPress={handleClearImage}>
						<Text>Clear Image</Text>
					</TouchableOpacity>
					<TouchableOpacity onPress={handleDetect}>
						<Text>Detect</Text>
					</TouchableOpacity>
					{/* Display the API results here */}
				</View>
			)}
		</View>
	);
};

export default ImageSelector;
