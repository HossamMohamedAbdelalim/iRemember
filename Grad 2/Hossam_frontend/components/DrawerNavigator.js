// components/DrawerNavigator.js
import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

import HomeScreen from "./HomeScreen";
import FriendsScreen from "./FriendsScreen";
import FamilyScreen from "./FamilyScreen";
import RelativesScreen from "./RelativesScreen";
import ColleaguesScreen from "./ColleaguesScreen";
import NeighborsScreen from "./NeighborsScreen";
import ChatScreen from "./ChatScreen";

const Drawer = createDrawerNavigator();

const CustomDrawerContent = ({ navigation }) => (
  <TouchableOpacity
    style={styles.logoutButton}
    onPress={() => navigation.navigate("Login")}
  >
    <Text style={styles.logoutText}>Logout</Text>
  </TouchableOpacity>
);

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerRight: () => (
          <TouchableOpacity
            style={styles.burgerMenu}
            onPress={() => navigation.toggleDrawer()}
          >
            <Text style={styles.burgerText}>☰</Text>
          </TouchableOpacity>
        ),
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Friends" component={FriendsScreen} />
      <Drawer.Screen name="Family" component={FamilyScreen} />
      <Drawer.Screen name="Relatives" component={RelativesScreen} />
      <Drawer.Screen name="Colleagues" component={ColleaguesScreen} />
      <Drawer.Screen name="Neighbors" component={NeighborsScreen} />
      <Drawer.Screen name="Chat" component={ChatScreen} />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  burgerMenu: {
    marginRight: 10,
  },
  burgerText: {
    fontSize: 24,
  },
  logoutButton: {
    margin: 10,
    padding: 10,
    backgroundColor: "red",
    borderRadius: 5,
    alignItems: "center",
  },
  logoutText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default DrawerNavigator;
