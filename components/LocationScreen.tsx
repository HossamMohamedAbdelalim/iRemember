import React, { useState, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity, Text, Share } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import MapViewDirections from "react-native-maps-directions";
import { GOOGLE_API_KEY } from "../environments";
import Icon from "react-native-vector-icons/FontAwesome"; // Import the icon library you choose

export default function LocationScreen() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [destination, setDestination] = useState(null);
  const [showSetDestinationButton, setShowSetDestinationButton] =
    useState(false);

  useEffect(() => {
    const fetchLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
    };

    fetchLocation();
  }, []);

  const handleAddMarker = (coordinate, title = "") => {
    setMarkers([
      ...markers,
      { coordinate, title, key: markers.length, deleted: false },
    ]);
    setShowSetDestinationButton(true);
  };

  const handleDeleteMarker = (markerIndex) => {
    const updatedMarkers = [...markers];
    updatedMarkers[markerIndex].deleted = true;
    setMarkers(updatedMarkers);
  };

  const handleDeleteDestination = () => {
    setDestination(null);
    setShowSetDestinationButton(false);
  };

  const handleShareLocation = () => {
    if (location) {
      const shareUrl = `https://www.google.com/maps/search/?api=1&query=${location.coords.latitude},${location.coords.longitude}`;
      Share.share({
        title: "My Location",
        message: `Check out my location: ${shareUrl}`,
        url: shareUrl,
      });
    }
  };

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return (
    <View style={styles.container}>
      {location && (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          onPress={(e) => {
            if (!destination) {
              handleAddMarker(e.nativeEvent.coordinate, "Destination");
            }
          }}
        >
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
            title="You are here!"
          />
          {markers.map((marker, index) => (
            <View key={index}>
              {marker.deleted ? null : (
                <Marker coordinate={marker.coordinate} title={marker.title} />
              )}
              {marker.deleted ? null : (
                <TouchableOpacity
                  onPress={() => handleDeleteMarker(index)}
                  style={styles.deleteButton}
                >
                  <Text style={styles.deleteButtonText}>Delete</Text>
                </TouchableOpacity>
              )}
            </View>
          ))}
          {destination && (
            <MapViewDirections
              origin={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
              }}
              destination={{
                latitude: destination.latitude,
                longitude: destination.longitude,
              }}
              apikey={GOOGLE_API_KEY}
              strokeWidth={3}
              strokeColor="hotpink"
            />
          )}
        </MapView>
      )}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={handleShareLocation}
          style={styles.iconButton}
        >
          <Icon name="share" size={30} color="white" />
        </TouchableOpacity>
        {destination && (
          <TouchableOpacity
            onPress={handleDeleteDestination}
            style={styles.iconButton}
          >
            <Icon name="trash" size={30} color="white" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
  iconButton: {
    backgroundColor: "#399cbd",
    padding: 10,
    borderRadius: 10,
  },
  deleteButton: {
    backgroundColor: "red",
    padding: 5,
    borderRadius: 5,
    marginTop: 5,
  },
  deleteButtonText: {
    color: "white",
    textAlign: "center",
  },
});
