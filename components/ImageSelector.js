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
	const [predictions, setPredictions] = useState(null); // State to hold predictions

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
		setShowResults(false); // Reset showResults state when clearing the image
	};

	const handleDetect = async () => {
		

		try {
			const apiUrl = "http://192.168.1.42:8000/upload";
			const formData = new FormData();

			if (!selectedImage) {
				console.error("No image selected");
				return;
			}

			// Assuming selectedImage is a File object, if not, modify accordingly
			formData.append("file", selectedImage);
			console.log(formData)
			

			const response = await axios.post(apiUrl, formData, {
				headers: {
					Accept: "application/json, text/plain, /",
					"Content-Type": "multipart/form-data",
				},
			});
			console.log(response);

			if (response.status === 200) {
				// If response is successful, set predictions and showResults to true
				setPredictions(response.data.predictions);
				console.log(response.data.predictions);
				setShowResults(true);
			} else {
				console.error("Error in API request:", response.statusText);
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
			) : showResults ? ( // Render DetectionResultsComponent when showResults is true
				<DetectionResultsComponent
					selectedImage={selectedImage}
					predictions={predictions} // Pass predictions as prop
				/>
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
