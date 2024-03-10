import React from "react";
import { View, SafeAreaView, StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Header from "../components/common/header";
import ImageSelector from "../components/ImageSelector";
import { COLORS } from "../constants";

const Stack = createStackNavigator();

const Home = () => {
	return (
		<Stack.Navigator>
			<Stack.Screen
				name="Home"
				component={HomeScreen}
				options={{
					header: () => <Header />,
				}}
			/>
			<Stack.Screen name="ImageSelector" component={ImageSelector} />
		</Stack.Navigator>
	);
};

const HomeScreen = ({ navigation }) => {
	return (
		<SafeAreaView style={styles.container}>
			<View>
				<ImageSelector navigation={navigation} />
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: COLORS.lightWhite,
	},
});

export default Home;
