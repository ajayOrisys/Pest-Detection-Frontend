// DetectionResultsComponent.js
import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const DetectionResultsComponent = ({ selectedImage, predictions }) => {
	// Placeholder function for processing results


	const processResults = () => {
		// Implement your logic to process results here
		console.log("Processing results...");
	};

	return (
		<View style={styles.container}>
			<Text>Detection Results</Text>
			<View style={styles.imageContainer}>
				<Image source={{ uri: selectedImage?.uri }} style={styles.image} />
			</View>
			<Text style={styles.defectedTextContainer}>
				Prediction:{" "}
				<Text style={styles.defectedText}>{predictions?.predictions[0].label}</Text>
			</Text>
			<View>
				<Text>Process Results:</Text>
				<Text onPress={processResults}>Click to Process</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	imageContainer: {
		flex: 0,
		width: 200,
		height: 200,
		marginTop: 300,
	},
	image: {
		width: "100%",
		height: "100%",
		marginVertical: 10,
	},
	defectedTextContainer: {
		height: 30,
		marginTop: 80,
	},
	defectedText: {
		fontWeight: "bold",
	},
});

export default DetectionResultsComponent;
