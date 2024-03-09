import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
	headerContainer: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
	logoContainer: {
		height: 70,
		width: 150,
		padding: 10,
	},
	logoImg: (dimension) => ({
		width: dimension,
		height: dimension,
	}),
});

export default styles;
