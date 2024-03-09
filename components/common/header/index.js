import { View, Image } from "react-native";
import styles from "./header.style";
import { images } from "../../../constants";

const Header = () => {
	return (
		<View style={styles.headerContainer}>
			<View style={styles.logoContainer}>
				<Image style={styles.logoImg("100%")} source={images.appLogo} resizeMode="contain" />
			</View>
		</View>
	);
};

export default Header