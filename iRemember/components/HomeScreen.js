import React from "react";
import { View, TouchableOpacity, Text, Image, StyleSheet } from "react-native"; // Import Image component

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/icon.png")} // Specify the path to your PNG image
        style={styles.image}
      />
      <Text style={styles.headerText}>
        Hi, I am iRemember. I am designed to support you with your dementia and
        will do my best assisst you to be self-dependent.
      </Text>

      <View style={styles.row}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("iRememberBot")}
        >
          <Text style={styles.buttonText}>Ask Me!</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Who's That?</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.row}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("GPSLocation")}
        >
          <Text style={styles.buttonText}>Where am I?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>My Medications</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20, // Add padding to center the text and buttons
  },
  headerText: {
    textAlign: "center",
    marginBottom: 20,
    fontSize: 16,
    color: "#666", // You can adjust the color as needed
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#2196F3",
    padding: 15,
    borderRadius: 10,
    width: "45%", // Adjust as needed
    alignItems: "center",
    marginHorizontal: 10, // Adjust spacing between buttons as needed
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default HomeScreen;
