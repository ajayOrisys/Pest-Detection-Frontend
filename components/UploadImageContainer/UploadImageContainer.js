import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { launchImageLibrary } from "react-native-image-picker";

const UploadImageComponent = ({ onImageSelected }) => {
  const handleUploadPress = () => {
    launchImageLibrary(
      {
        mediaType: "photo",
        includeBase64: true,
      },
      (response) => {
        if (!response.didCancel) {
          onImageSelected(response.uri);
        }
      }
    );
  };

  return (
    <View>
      <Text>Upload Image:</Text>
      <TouchableOpacity onPress={handleUploadPress}>
        <Text>Choose Image</Text>
      </TouchableOpacity>
    </View>
  );
};

export default UploadImageComponent;
