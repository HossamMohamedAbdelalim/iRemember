// components/ProfileOverviewScreen.js
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";

const ProfileOverviewScreen = ({ navigation }) => {
  // Mock data for user's profile
  const userProfile = {
    firstName: "John",
    lastName: "Doe",
    birthday: "1990-01-01",
    photo: null,
  };

  const categories = [
    "Friends",
    "Family",
    "Relatives",
    "Colleagues",
    "Neighbors",
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile Overview</Text>
      {userProfile.photo && (
        <Image source={{ uri: userProfile.photo }} style={styles.image} />
      )}
      <Text
        style={styles.profileText}
      >{`${userProfile.firstName} ${userProfile.lastName}`}</Text>
      <Text style={styles.profileText}>Birthday: {userProfile.birthday}</Text>
      <Text style={styles.subtitle}>Manage Categories:</Text>
      {categories.map((category) => (
        <TouchableOpacity
          key={category}
          style={styles.button}
          onPress={() => navigation.navigate(category)}
        >
          <Text style={styles.buttonText}>{category}</Text>
        </TouchableOpacity>
      ))}
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
  profileText: {
    fontSize: 18,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
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
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
  },
});

export default ProfileOverviewScreen;
