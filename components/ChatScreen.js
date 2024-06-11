// components/ChatScreen.js
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import axios from "axios";
import { OPENAI_API_KEY } from "@env";

const ChatScreen = () => {
  const [input, setInput] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [context, setContext] = useState(
    "You are a helpful assistant for users who suffer from dementia."
  );

  const updateContext = (newContext) => {
    setContext(newContext);
  };

  const handleInput = async () => {
    const userInput = input;
    let response;

    // Context setting based on specific phrases in user input
    if (userInput.toLowerCase().includes("good medication for my dementia")) {
      updateContext(
        "Some medications indicated for dementia include Donepezil, Galantamine, and Memantine. Consult with a healthcare provider for the best treatment options."
      );
    } else if (
      userInput.toLowerCase().includes("side effects of dementia medications")
    ) {
      updateContext(
        "Common side effects of dementia medications include nausea, vomiting, loss of appetite, and increased bowel movements for cholinesterase inhibitors like Donepezil. Memantine may cause dizziness, headache, and constipation."
      );
    } else if (
      userInput.toLowerCase().includes("emotional changes in dementia") ||
      userInput.toLowerCase().includes("effects on self-esteem in dementia")
    ) {
      updateContext(
        "People with dementia often experience changes in their emotional responses. It's important to understand and address these changes with empathy and support."
      );
    } else if (
      userInput.toLowerCase().includes("brain exercises for dementia patients")
    ) {
      updateContext(
        "Brain games like crossword puzzles, Sudoku, and memory games, as well as physical activities like dancing or gardening, can help keep the mind active and improve cognitive function in dementia patients."
      );
    } else {
      updateContext(
        "You are a helpful assistant for users who suffer from dementia."
      );
    }

    // Exponential backoff utility function
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    const makeApiRequest = async (retryCount = 0) => {
      const maxRetries = 5;
      const delayBase = 1000;

      try {
        response = await axios.post(
          "https://api.openai.com/v1/chat/completions",
          {
            model: "gpt-4o",
            messages: [
              { role: "system", content: context },
              { role: "user", content: userInput },
            ],
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${OPENAI_API_KEY}`,
            },
          }
        );
        return response.data.choices[0].message.content;
      } catch (error) {
        if (
          error.response &&
          error.response.status === 429 &&
          retryCount < maxRetries
        ) {
          const retryAfter =
            parseInt(error.response.headers["retry-after"]) || delayBase;
          const delayTime = retryAfter * Math.pow(2, retryCount);
          console.warn(`Retrying in ${delayTime / 1000} seconds...`);
          await delay(delayTime);
          return makeApiRequest(retryCount + 1);
        }
        throw error;
      }
    };

    try {
      const assistantResponse = await makeApiRequest();
      setChatMessages([
        ...chatMessages,
        { role: "user", content: userInput },
        { role: "assistant", content: assistantResponse },
      ]);
    } catch (error) {
      console.error(error);
      setChatMessages([
        ...chatMessages,
        { role: "user", content: userInput },
        {
          role: "assistant",
          content: "Oops! Something went wrong. Please try again.",
        },
      ]);
    }

    setInput("");
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
    >
      <ScrollView contentContainerStyle={styles.chatContainer}>
        {chatMessages.map((message, index) => (
          <View
            key={index}
            style={[
              styles.messageContainer,
              message.role === "user"
                ? styles.userBubble
                : styles.assistantBubble,
            ]}
          >
            <Text style={styles.messageText}>{message.content}</Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type your message here"
          onChangeText={(text) => setInput(text)}
          value={input}
          onSubmitEditing={handleInput}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleInput}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  chatContainer: {
    flexGrow: 1,
    justifyContent: "flex-end",
    padding: 10,
    paddingBottom: 60,
  },
  messageContainer: {
    maxWidth: "70%",
    marginVertical: 5,
    padding: 10,
    borderRadius: 15,
  },
  userBubble: {
    backgroundColor: "white",
    alignSelf: "flex-end",
  },
  assistantBubble: {
    backgroundColor: "#2196F3",
    alignSelf: "flex-start",
  },
  messageText: {
    fontSize: 16,
    color: "black",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#F2F2F2",
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderRadius: 20,
    padding: 10,
    marginRight: 10,
    backgroundColor: "#fff",
  },
  sendButton: {
    backgroundColor: "#2196F3",
    padding: 10,
    borderRadius: 20,
  },
  sendButtonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default ChatScreen;
