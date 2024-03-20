// UploadImageComponent.js
import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";

const UploadImageComponent = ({ onImageSelected, onClose }) => {
	const [mediaLibraryPermission, setMediaLibraryPermission] = useState(null);

	useEffect(() => {
		(async () => {
			const { status } =
				await ImagePicker.getMediaLibraryPermissionsAsync();
			setMediaLibraryPermission(status === "granted");
		})();
	}, []);

	const handleUploadPress = async () => {
		// if (!mediaLibraryPermission) {
		//   console.log(mediaLibraryPermission)
		//   console.log("Media library permission not granted");
		//   // Handle the case when permission is not granted
		//   return;
		// }

		try {
			const result = await ImagePicker.launchImageLibraryAsync({
				mediaTypes: ImagePicker.MediaTypeOptions.Images,
				allowsEditing: true,
				base64: false,
			});

			if (!result.canceled) {
				onImageSelected(result.assets[0].uri);
				
				// Call your API with the image data (result.base64)
				// Handle the API response
			} else {
				console.log("ImagePicker Cancelled");
			}
		} catch (error) {
			console.error("Expo ImagePicker Error: ", error);
		}
	};

	return (
		<View>
			<TouchableOpacity onPress={handleUploadPress}>
				<Text>Choose File</Text>
			</TouchableOpacity>

			<TouchableOpacity onPress={onClose}>
				<Text>Close File Upload</Text>
			</TouchableOpacity>
		</View>
	);
};

export default UploadImageComponent;
