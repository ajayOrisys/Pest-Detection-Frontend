// CameraComponent.js
import React, { useState, useRef, useEffect } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { Camera } from "expo-camera";

if (typeof window !== "undefined" && !window.Worker) {
	// Create a mock Worker (simplified example)
	window.Worker = function () {
		this.onmessage = () => {};
		this.postMessage = () => {};
	};
}

const CameraComponent = ({ onPictureTaken, onClose }) => {
	const [type, setType] = useState(Camera.Constants.Type.back);
	const [hasPermission, setHasPermission] = useState(null);
	const cameraRef = useRef(null);

	useEffect(() => {
		(async () => {
			const { status } = await Camera.requestCameraPermissionsAsync();
			setHasPermission(status === "granted");
		})();
	}, []);

	const toggleCameraType = () => {
		setType((current) =>
			current === Camera.Constants.Type.back
				? Camera.Constants.Type.front
				: Camera.Constants.Type.back
		);
	};

	const handleTakePicture = async () => {
		if (!hasPermission) {
			Alert.alert("Camera permission denied");
			return;
		}

		const photo = await cameraRef.current.takePictureAsync({
			base64: true,
		});
		onPictureTaken(photo.uri);
	};

	if (hasPermission === null) {
		// Camera permissions are still loading
		return <View />;
	}

	if (!hasPermission) {
		// Camera permissions are not granted yet
		return (
			<View>
				<Text style={{ textAlign: "center" }}>
					We need your permission to show the camera
				</Text>
			</View>
		);
	}

	return (
		<View>
			
				<Camera
					style={{ flex: 0, height: 500 }}
					type={type}
					ref={cameraRef}
				>
					<View>
						<TouchableOpacity onPress={toggleCameraType}>
							<Text style={{ color: "white" }}>Flip Camera</Text>
						</TouchableOpacity>
						<TouchableOpacity onPress={handleTakePicture}>
							<Text style={{ color: "white" }}>Take Picture</Text>
						</TouchableOpacity>
						<TouchableOpacity onPress={onClose}>
							<Text style={{ color: "white" }}>Close Camera</Text>
						</TouchableOpacity>
					</View>
				</Camera>
			
		</View>
	);
};

export default CameraComponent;
