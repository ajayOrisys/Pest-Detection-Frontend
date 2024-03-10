import React, { useState, useRef, useEffect } from "react";
import { View, TouchableOpacity, Text, Alert } from "react-native";
import { Camera } from "expo-camera";

const CameraComponent = ({ onPictureTaken, onClose }) => {
	const [type, setType] = useState(Camera.Constants.Type.back);
	const [hasPermission, setHasPermission] = useState(null);
	const [isCameraOpen, setIsCameraOpen] = useState(false);
	const cameraRef = useRef(null);

	useEffect(() => {
		(async () => {
			const { status } = await Camera.requestCameraPermissionsAsync();
			setHasPermission(status === "granted");
		})();
	}, [hasPermission]); // Include hasPermission in the dependency array

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

	const handleOpenCamera = () => {
		setIsCameraOpen(true);
	};

	const handleCloseCamera = () => {
		setIsCameraOpen(false);
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
			{!isCameraOpen && (
				<TouchableOpacity onPress={handleOpenCamera}>
					<Text style={{ color: "black" }}>Open Camera</Text>
				</TouchableOpacity>
			)}

			{isCameraOpen && (
				<View>
					<Camera
						style={{ flex: 1, height: 500 }}
						type={type}
						ref={cameraRef}
					>
						<View>
							<TouchableOpacity onPress={toggleCameraType}>
								<Text style={{ color: "black" }}>
									Flip Camera
								</Text>
							</TouchableOpacity>
							<TouchableOpacity onPress={handleTakePicture}>
								<Text style={{ color: "black" }}>
									Take Picture
								</Text>
							</TouchableOpacity>
							<TouchableOpacity onPress={handleCloseCamera}>
								<Text style={{ color: "black" }}>
									Close Camera
								</Text>
							</TouchableOpacity>
						</View>
					</Camera>
				</View>
			)}
		</View>
	);
};

export default CameraComponent;
