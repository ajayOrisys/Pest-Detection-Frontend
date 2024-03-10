import React from "react";
import { View, Image, SafeAreaView } from "react-native";
import styles from "./header.style";
import { COLORS, images } from "../../../constants";

const Header = () => {
  return (
    <SafeAreaView>
      <View style={styles.headerContainer}>
        <View style={styles.logoContainer}>
          <Image
            style={styles.logoImg("100%")}
            source={images.appLogo}
            resizeMode="contain"
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Header;
