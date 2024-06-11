// App.js
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

import ChatScreen from "./components/ChatScreen";
import LoginScreen from "./components/LoginScreen";
import RegisterScreen from "./components/RegisterScreen";
import HomeScreen from "./components/HomeScreen";
import ProfileSetupScreen from "./components/ProfileSetupScreen";
import AdditionalProfilesScreen from "./components/AdditionalProfilesScreen";
import FriendsScreen from "./components/FriendsScreen";
import FamilyScreen from "./components/FamilyScreen";
import RelativesScreen from "./components/RelativesScreen";
import ColleaguesScreen from "./components/ColleaguesScreen";
import NeighborsScreen from "./components/NeighborsScreen";
import CategorySelectionScreen from "./components/CategorySelectionScreen";
import ProfileOverviewScreen from "./components/ProfileOverviewScreen";
import MedicationReminderScreen from "./components/MedicationReminderScreen";
import GPSLocationScreen from "./components/GPSLocationScreen"; // Import GPSLocationScreen

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="ProfileSetup" component={ProfileSetupScreen} />
        <Stack.Screen
          name="AdditionalProfiles"
          component={AdditionalProfilesScreen}
        />
        <Stack.Screen
          name="CategorySelection"
          component={CategorySelectionScreen}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={({ navigation }) => ({
            title: "Home",
            headerRight: () => (
              <TouchableOpacity
                style={styles.profileButton}
                onPress={() => navigation.navigate("ProfileOverview")}
              >
                <Text style={styles.profileText}>Profile</Text>
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen name="Friends" component={FriendsScreen} />
        <Stack.Screen name="Family" component={FamilyScreen} />
        <Stack.Screen name="Relatives" component={RelativesScreen} />
        <Stack.Screen name="Colleagues" component={ColleaguesScreen} />
        <Stack.Screen name="Neighbors" component={NeighborsScreen} />
        <Stack.Screen name="Chat" component={ChatScreen} />
        <Stack.Screen
          name="ProfileOverview"
          component={ProfileOverviewScreen}
        />
        <Stack.Screen
          name="MedicationReminder"
          component={MedicationReminderScreen}
        />
        <Stack.Screen
          name="GPSLocation"
          component={GPSLocationScreen} // Add GPSLocationScreen to the stack
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  profileButton: {
    marginRight: 10,
  },
  profileText: {
    fontSize: 18,
    color: "blue",
  },
});

export default App;
