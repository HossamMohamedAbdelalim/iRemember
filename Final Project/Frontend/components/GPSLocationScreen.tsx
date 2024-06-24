// components/GPSLocationScreen.js
import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Share,
  Alert,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import MapViewDirections from "react-native-maps-directions";
import { GOOGLE_API_KEY } from "../environments";
import Icon from "react-native-vector-icons/FontAwesome";
import axios from "axios";

export default function GPSLocationScreen() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [destination, setDestination] = useState(null);

  useEffect(() => {
    const fetchLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);

      // Start sending location updates
      const locationSubscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 10000,
          distanceInterval: 0,
        },
        (newLocation) => {
          setLocation(newLocation);
          sendLocationToServer(newLocation);
        }
      );

      return () => locationSubscription.remove();
    };

    fetchLocation();
  }, []);

  const sendLocationToServer = async (location) => {
    try {
      await axios.post("http://localhost:3000/update-location", {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    } catch (error) {
      console.error("Error updating location:", error);
    }
  };

  const handleAddMarker = (coordinate) => {
    setMarkers([...markers, { coordinate, key: markers.length }]);
    setDestination(coordinate);
  };

  const handleDeleteMarker = (markerIndex) => {
    const updatedMarkers = markers.filter((_, index) => index !== markerIndex);
    setMarkers(updatedMarkers);
    setDestination(null);
  };

  const handleShareLocation = () => {
    const shareUrl = `http://localhost:3000/live-location`; // Replace with your local server URL
    Share.share({
      title: "My Live Location",
      message: `Check out my live location: ${shareUrl}`,
      url: shareUrl,
    });
  };

  const handleDestinationReached = () => {
    Alert.alert("Destination Reached", "You have reached your destination!");
    setDestination(null);
  };

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
              handleAddMarker(e.nativeEvent.coordinate);
            }
          }}
        >
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
            title="You are here!"
            pinColor="blue"
          />
          {markers.map((marker, index) => (
            <Marker
              key={index}
              coordinate={marker.coordinate}
              title={`Marker ${index + 1}`}
              pinColor="red"
            />
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
              strokeWidth={4}
              strokeColor="hotpink"
              onReady={() => handleDestinationReached()}
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
          <Text style={styles.iconButtonText}>Share</Text>
        </TouchableOpacity>
        {destination && (
          <TouchableOpacity
            onPress={() => handleDeleteMarker(markers.length - 1)}
            style={styles.iconButton}
          >
            <Icon name="trash" size={30} color="white" />
            <Text style={styles.iconButtonText}>Delete</Text>
          </TouchableOpacity>
        )}
      </View>
      {errorMsg ? <Text style={styles.errorText}>{errorMsg}</Text> : null}
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
    backgroundColor: "#fff",
  },
  iconButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#399cbd",
    padding: 10,
    borderRadius: 10,
  },
  iconButtonText: {
    color: "white",
    marginLeft: 5,
    fontSize: 16,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginTop: 10,
  },
});
