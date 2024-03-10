import React, { useState } from "react";
import { View, Image, Platform, Text } from "react-native";
import CameraComponent from "./CameraComponent/CameraComponent";
import UploadImageComponent from "./UploadImageContainer/UploadImageContainer";

const ImageSelector = () => {
	const [selectedImage, setSelectedImage] = useState(null);

	const handlePictureTaken = (uri) => {
		setSelectedImage(uri);
		// Call your API with the image data (uri)
		// Handle the API response
	};

	const handleImageSelected = (uri) => {
		setSelectedImage(uri);
		// Call your API with the image data (uri)
		// Handle the API response
	};

	return (
		<View>
			{/* Render components based on the platform */}
			{Platform.OS === "web" ? (
				<UploadImageComponent onImageSelected={handleImageSelected} />
			) : (
				<CameraComponent
					onPictureTaken={handlePictureTaken}
					onImageSelected={handleImageSelected}
				/>
			)}

			{selectedImage && (
				<View>
					<Text>Selected Image:</Text>
					<Image
						source={{ uri: selectedImage }}
						style={{ width: 200, height: 200 }}
					/>
					{/* Display the API results here */}
				</View>
			)}
		</View>
	);
};

export default ImageSelector;
