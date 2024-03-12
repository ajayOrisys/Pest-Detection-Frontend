// ImageSelector.js
import React, { useState } from "react";
import axios from "axios";
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
		// await axios
		// 	.get("http://www.google.com")
		// 	.then((response) => console.log(response.data))
		// 	.catch((error) => console.log(error));

		try {
			const apiUrl = "http://192.168.1.110:8000/upload";
			const formData = new FormData();

			// Assuming selectedImage is a File object, if not, modify accordingly
			formData.append("file", selectedImage);

			console.log("Sending API request to:", apiUrl);
			console.log("Form Data:", formData);

			const response = await axios.post(apiUrl, formData, {
				headers: {
					Accept: "application/json, text/plain, /",
					"Content-Type": "multipart/form-data",
				},
			});

			console.log("API Response Status:", response.status);

			if (response.status === 200) {
				console.log("API Result:", response.data);
				setShowResults(true);
			} else {
				console.error("Error in API request:", response.statusText);
				console.log("API Response Data:", response.data);
				console.log("Full API Response:", response);
			}
		} catch (error) {
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
