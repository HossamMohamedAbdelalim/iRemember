// components/CategorySelectionScreen.js
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const CategorySelectionScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Category</Text>
      {["Friends", "Family", "Relatives", "Colleagues", "Neighbors"].map(
        (category) => (
          <TouchableOpacity
            key={category}
            style={styles.button}
            onPress={() => navigation.navigate(category)}
          >
            <Text style={styles.buttonText}>{category}</Text>
          </TouchableOpacity>
        )
      )}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Home")}
      >
        <Text style={styles.buttonText}>Finish</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#2196F3",
    padding: 10,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
    marginBottom: 15,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default CategorySelectionScreen;
