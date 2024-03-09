// app/screens/ResultScreen.js
import React from 'react';
import { View, Text } from 'react-native';
import { useRoute } from '@react-navigation/native';

const ResultScreen = () => {
  const route = useRoute();
  const { result } = route.params;

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>API Result:</Text>
      {/* Display your API result here */}
      <Text>{JSON.stringify(result)}</Text>
    </View>
  );
};

export default ResultScreen;
