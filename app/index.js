import { React } from "react";
import { View, Text, SafeAreaView, ScrollView } from "react-native";
import { StyleSheet } from "react-native";
import { COLORS } from "../constants";
import Header from "../components/common/header";

const styles = StyleSheet.create({
	container: {
		padding: 30,
	},
});

const Home = () => {
	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
			<Header />
			<ScrollView></ScrollView>
		</SafeAreaView>
	);
};

export default Home;
