// DetectionResultsComponent.js
import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const DetectionResultsComponent = ({ selectedImage }) => {
  // Placeholder function for processing results
  const processResults = () => {
    // Implement your logic to process results here
    console.log("Processing results...");
  };

  return (
    <View style={styles.container}>
      <Text>Detection Results</Text>
      <Image source={{ uri: selectedImage }} style={styles.image} />
      <Text>Additional result information goes here</Text>
      <Text>Another result detail</Text>
      {/* Add more result components or logic here */}
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
  image: {
    width: 200,
    height: 200,
    marginVertical: 10,
  },
});

export default DetectionResultsComponent;
