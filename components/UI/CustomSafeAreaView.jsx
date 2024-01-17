import React from "react";
import { StyleSheet, SafeAreaView, Platform, StatusBar } from "react-native";

const CustomSafeAreaView = (props) => {
  return (
    <SafeAreaView style={styles.androidSafeArea} className={props.classValue}>
      {props.children}
    </SafeAreaView>
  );
};

export default CustomSafeAreaView;

const styles = StyleSheet.create({
  androidSafeArea: {
    paddingTop: Platform.select({
      android: StatusBar.currentHeight + 8,
      ios: 0,
    }),
  },
});
