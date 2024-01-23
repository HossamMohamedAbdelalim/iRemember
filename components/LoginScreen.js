// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
// } from "react-native";
// import axios from "axios";

// const LoginScreen = ({ navigation }) => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleLogin = async () => {
//     if (!email || !password) {
//       console.error("Please enter both email and password");
//       return; // Don't proceed if fields are empty
//     }

//     try {
//       const response = await axios.post(
//         "http://192.168.1.103:7777/users/login",
//         {
//           name: email, // Ensure this matches the server's expected field
//           password,
//         }
//       );
//       if (response.status === 200) {
//         console.log("Login successful:", response.data);
//         navigation.navigate("Home");
//       } else {
//         console.error("Login failed:", response.data.message);
//       }
//     } catch (error) {
//       if (error.response) {
//         // The request was made and the server responded with an error status code (4xx or 5xx)
//         console.error("Login error:", error.response.data);
//       } else if (error.request) {
//         // The request was made but no response was received (e.g., no internet connection)
//         console.error("No response received:", error.request);
//       } else {
//         // Something else happened while setting up the request
//         console.error("Request setup error:", error.message);
//       }
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Login</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Email"
//         onChangeText={(text) => setEmail(text)}
//         value={email}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Password"
//         secureTextEntry
//         onChangeText={(text) => setPassword(text)}
//         value={password}
//       />
//       <TouchableOpacity style={styles.button} onPress={handleLogin}>
//         <Text style={styles.buttonText}>Login</Text>
//       </TouchableOpacity>
//       <TouchableOpacity onPress={() => navigation.navigate("Register")}>
//         <Text style={styles.linkText}>
//           Don't have an account? Register here.
//         </Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     padding: 20,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//     marginBottom: 20,
//   },
//   input: {
//     width: "100%",
//     height: 40,
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 8,
//     marginBottom: 15,
//     padding: 10,
//   },
//   button: {
//     backgroundColor: "#2196F3",
//     padding: 10,
//     borderRadius: 8,
//     width: "100%",
//     alignItems: "center",
//   },
//   buttonText: {
//     color: "#fff",
//     fontWeight: "bold",
//   },
//   linkText: {
//     marginTop: 20,
//     color: "#2196F3",
//   },
// });

// export default LoginScreen;

import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import axios from "axios";
import * as LocalAuthentication from "expo-local-authentication";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      console.error("Please enter both email and password");
      return; // Don't proceed if fields are empty
    }

    try {
      const response = await axios.post(
        "http://192.168.1.103:7777/users/login",
        {
          name: email, // Ensure this matches the server's expected field
          password,
        }
      );
      if (response.status === 200) {
        console.log("Login successful:", response.data);
        navigation.navigate("Home");
      } else {
        console.error("Login failed:", response.data.message);
      }
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with an error status code (4xx or 5xx)
        console.error("Login error:", error.response.data);
      } else if (error.request) {
        // The request was made but no response was received (e.g., no internet connection)
        console.error("No response received:", error.request);
      } else {
        // Something else happened while setting up the request
        console.error("Request setup error:", error.message);
      }
    }
  };

  const authenticateFingerprint = async () => {
    try {
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: "Authenticate with your fingerprint",
        disableDeviceFallback: false, // Set to true if you want to disable fallback to PIN or passcode
      });

      if (result.success) {
        // Fingerprint authentication successful
        console.log("Authentication successful");
        navigation.navigate("Home");
      } else {
        // Fingerprint authentication failed
        console.log("Authentication failed");
      }
    } catch (error) {
      console.error("Authentication error:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
        value={email}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
        value={password}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={authenticateFingerprint}>
        <Text style={styles.buttonText}>Login with Biometrics</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Register")}>
        <Text style={styles.linkText}>
          Don't have an account? Register here.
        </Text>
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
  input: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 15,
    padding: 10,
  },
  button: {
    backgroundColor: "#2196F3",
    padding: 10,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
    marginBottom: 10, // Add spacing between buttons
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  linkText: {
    marginTop: 10, // Adjust spacing
    color: "#2196F3",
  },
});

export default LoginScreen;
