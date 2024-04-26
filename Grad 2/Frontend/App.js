import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

import ChatScreen from "./components/ChatScreen";
import LoginScreen from "./components/LoginScreen";
import RegisterScreen from "./components/RegisterScreen";
import "react-native-url-polyfill/auto";
import HomeScreen from "./components/HomeScreen";
import LocationScreen from "./components/LocationScreen";
import MedicationReminderScreen from "./components/MedicationReminderScreen";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={({ navigation }) => ({
            title: "Home",
            headerRight: () => (
              <TouchableOpacity
                style={styles.logoutButton}
                onPress={() => {
                  // Perform logout actions here
                  // For example, navigate to the "Login" screen
                  navigation.navigate("Login");
                }}
              >
                <Text style={styles.logoutText}>Logout</Text>
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen name="iRememberBot" component={ChatScreen} />
        <Stack.Screen name="GPSLocation" component={LocationScreen} />
        <Stack.Screen
          name="MedicationReminder"
          component={MedicationReminderScreen}
        />
        {/* Add more screens if needed */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  logoutButton: {
    marginRight: 10, // Move the button to the right side
  },
  logoutText: {
    color: "red",
    fontSize: 16,
  },
});

export default App;
