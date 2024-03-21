// ImageSelector.js
import React, { useState } from "react";
import axios from "axios";
import { View, Text, Image, TouchableOpacity } from "react-native";
import CameraComponent from "./CameraComponent/CameraComponent";
import UploadImageComponent from "./UploadImageComponent/UploadImageComponent";
import DetectionResultsComponent from "./DetectionResultsComponent/DetectionResultsComponent";
import * as FileSystem from "expo-file-system";

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
	console.log(selectedImage, "selectedImage");

	const handleDetect = async () => {
		const apiUrl = "http://192.168.1.42:8000/upload";

		try {
			const formData = new FormData();

			if (!selectedImage) {
				console.error("No image selected");
				return;
			}

			formData.append("file", {
				uri: selectedImage?.uri,
				name: "image.jpg",
				type: "image/jpeg",
			});

			console.log("Check 2");

			const axiosResponse = await axios.post(apiUrl, formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});
			console.log("Axios Response:", axiosResponse.data);
			// Handle response...

			console.log("Check 3");
			console.log(axiosResponse);

			if (axiosResponse.status === 200) {
				// If response is successful, set predictions and showResults to true
				setPredictions(axiosResponse.data.predictions);

				setShowResults(true);
			} else {
				console.error(
					"Error in API request 200:",
					axiosResponse.statusText
				);
			}
		} catch (error) {
			console.error("Error occurred:", error);
		}
		// const formData = new FormData();
		// formData.append('file', {
		//   uri: selectedImage?.uri,
		//   name: 'image.jpg',
		//   type: 'image/jpeg',
		// });

		// try {
		//   const response = await fetch(apiUrl, {
		// 	method: 'POST',
		// 	body: formData,
		// 	headers: {
		// 	  'Content-Type': 'multipart/form-data',
		// 	},
		//   });

		//   const data = await response.json();
		//   console.log('File uploaded successfully:', data);
		//   // Handle success
		// } catch (error) {
		//   console.error('Error uploading file:', error.message);
		//   // Handle error
		// }
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
						source={{ uri: selectedImage?.uri }}
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
