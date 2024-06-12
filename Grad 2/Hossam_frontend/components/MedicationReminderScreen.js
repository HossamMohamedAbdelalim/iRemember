import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Alert,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { scheduleNotificationAsync } from "expo-notifications";

const MedicationReminderScreen = () => {
  const [medicineName, setMedicineName] = useState("");
  const [dosage, setDosage] = useState("");
  const [time, setTime] = useState(null);
  const [isTimePickerVisible, setTimePickerVisible] = useState(false);
  const [medicationList, setMedicationList] = useState([]);

  const handleConfirm = (selectedTime) => {
    setTime(selectedTime);
    hideTimePicker();
  };

  const showTimePicker = () => {
    setTimePickerVisible(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisible(false);
  };

  const handleAddMedication = async () => {
    if (!medicineName || !dosage || !time) {
      alert(
        "Please fill out all fields and select a time for the medication reminder."
      );
      return;
    }

    // Schedule notification
    await scheduleNotificationAsync({
      content: {
        title: "Medication Reminder",
        body: `It's time to take your ${medicineName} (${dosage})`,
      },
      trigger: {
        hour: time.getHours(),
        minute: time.getMinutes(),
        repeats: true,
      },
    });

    setMedicationList([
      ...medicationList,
      {
        medicineName: medicineName,
        dosage: dosage,
        time: time.toLocaleTimeString(),
      },
    ]);

    setMedicineName("");
    setDosage("");
    setTime(null);
    Alert.alert("Success", "Medication reminder added successfully!");
  };

  const handleDeleteMedication = (index) => {
    setMedicationList(medicationList.filter((_, i) => i !== index));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Medication Reminder</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Medicine Name"
          value={medicineName}
          onChangeText={setMedicineName}
        />
        <TextInput
          style={styles.input}
          placeholder="Dosage"
          value={dosage}
          onChangeText={setDosage}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={showTimePicker}>
        <Text style={styles.buttonText}>Select Time</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.addButton} onPress={handleAddMedication}>
        <Text style={styles.buttonText}>Add Medication</Text>
      </TouchableOpacity>

      <DateTimePickerModal
        isVisible={isTimePickerVisible}
        mode="time"
        onConfirm={handleConfirm}
        onCancel={hideTimePicker}
      />

      <Text style={styles.listHeader}>Medication List</Text>
      <FlatList
        data={medicationList}
        renderItem={({ item, index }) => (
          <View style={styles.medicationItem}>
            <View style={styles.medicationInfo}>
              <Text>{item.medicineName}</Text>
              <Text>{item.dosage}</Text>
              <Text>{item.time}</Text>
            </View>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => handleDeleteMedication(index)}
            >
              <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    marginBottom: 20,
    width: "100%",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  button: {
    backgroundColor: "#2196F3",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 20,
    width: "100%",
  },
  addButton: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 20,
    width: "100%",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  listHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  medicationItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 5,
    width: "100%",
  },
  medicationInfo: {
    flex: 1,
  },
  deleteButton: {
    backgroundColor: "#FF6347",
    padding: 5,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
  deleteButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default MedicationReminderScreen;
