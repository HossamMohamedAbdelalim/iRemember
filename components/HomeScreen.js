// components/HomeScreen.js
import React from "react";
import { View, TouchableOpacity, Text, StyleSheet, Image } from "react-native";

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image source={require("../assets/icon.png")} style={styles.image} />
      <Text style={styles.headerText}>
        Hi, I am iRemember. I am designed to support you with your dementia and
        will do my best to assist you in being self-dependent.
      </Text>

      <View style={styles.row}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Chat")}
        >
          <Text style={styles.buttonText}>Ask Me!</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("ProfileOverview")}
        >
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

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("MedicationReminder")}
        >
          <Text style={styles.buttonText}>Medication Reminder</Text>
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
    paddingHorizontal: 20,
    backgroundColor: "#f5f5f5",
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  headerText: {
    textAlign: "center",
    marginBottom: 30,
    fontSize: 18,
    color: "#333",
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
    width: "100%",
  },
  button: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 10,
    width: "45%",
    alignItems: "center",
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default HomeScreen;
