// components/ChatScreen.js
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import axios from 'axios';
import { OPENAI_API_KEY } from '@env';

const ChatScreen = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const [context, setContext] = useState('You are a helpful assistant for users who suffer from dementia.');

  const updateContext = (newContext) => {
    setContext(newContext);
  };

  const handleInput = async () => {
    try {
      const userInput = input;
      let response;

      // Check if the user input includes certain phrases and set context accordingly
      if (userInput.toLowerCase().includes('good medication for my dementia')) {
        const medicationInfo = 'Some medications indicated for dementia include: ' +
          'Donepezil, which is used for mild to severe dementia due to Alzheimer\'s, ' +
          'Galantamine, for mild to moderate dementia due to Alzheimer\'s, ' +
          'and Memantine, for moderate to severe dementia due to Alzheimer\'s. ' +
          'Please consult with a healthcare provider for the best treatment options for your condition.';
        updateContext(medicationInfo);
      } else if (userInput.toLowerCase().includes('side effects of dementia medications')) {
        const sideEffectsInfo = 'Common side effects of dementia medications may include nausea, vomiting, ' +
          'loss of appetite, and increased frequency of bowel movements for cholinesterase inhibitors like Donepezil. ' +
          'Memantine may cause dizziness, headache, and constipation. ' +
          'It\'s important to discuss with your healthcare provider about the side effects.';
        updateContext(sideEffectsInfo);
      }
      if (
        userInput.toLowerCase().includes('emotional changes in dementia') ||
        userInput.toLowerCase().includes('effects on self-esteem in dementia') ||
        userInput.toLowerCase().includes('how to deal with emotional changes in dementia')
      ) {
        const emotionalResponse = 'People with dementia often experience changes in their emotional responses. ' +
          'They may have less control over their feelings and how to express them. ' +
          'These changes are partly caused by damage to the person\'s brain. It\'s important to look beyond the words or behaviors ' +
          'you see to the feelings that the person might be trying to express. ' +
          'Strong emotions may also be caused by unmet needs. Carers should try to work out what these needs are and meet them where possible. ' +
          'Dementia may cause people to feel insecure and lose confidence in themselves and their abilities. ' +
          'However, some people form new relationships as a result of their diagnosis, through activities such as attending a class or support group. ' +
          'High self-esteem allows some people to cope better with chronic health conditions.';
        updateContext(emotionalResponse);
      }
      if (
        userInput.toLowerCase().includes('brain exercises for dementia patients') ||
        userInput.toLowerCase().includes('what activities help dementia patients') ||
        userInput.toLowerCase().includes('how to improve cognitive function in dementia')
      ) {
        const brainExerciseResponse = 'There are many different types of brain games available for dementia patients. ' +
          'Some popular options include crossword puzzles, Sudoku, and memory games. ' +
          'There are also more active games designed for seniors, such as dancing or gardening. ' +
          'No matter what type of brain game you choose, the important thing is to keep your mind active and engaged. ' +
          'Regular practice can help improve cognitive function and delay the condition’s onset.';
        updateContext(brainExerciseResponse); 
      }
      else {
        // Default context if no specific query matches
        updateContext('Your name is PastPal but people can call you PP You are a helpful assistant for users who suffer from dementia.');
      }


      // Make the API request with updated context
      response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: context, // Use the context state here
            },
            {
              role: 'user',
              content: userInput,
            },
          ],
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${OPENAI_API_KEY}`,
          },
        }
      );

      const assistantResponse = response.data.choices[0].message.content;
      setChatMessages([...chatMessages, { role: 'user', content: userInput }, { role: 'assistant', content: assistantResponse }]);
      setOutput(assistantResponse);
    } catch (error) {
      console.error(error);
      setOutput('Oops! Something went wrong. Please try again.');
    }
    setInput('');
  };



  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}>
      <ScrollView contentContainerStyle={styles.chatContainer}>
        {chatMessages.map((message, index) => (
          <View
            key={index}
            style={[
              styles.messageContainer,
              message.role === 'user' ? styles.userBubble : styles.assistantBubble,
              message.role === 'user' ? { marginLeft: 10 } : { marginRight: 10 },
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
    justifyContent: 'flex-end',
    padding: 10,
    paddingBottom: 60,
  },
  messageContainer: {
    maxWidth: '70%',
    marginVertical: 5,
    padding: 10,
    borderRadius: 15,
  },
  userBubble: {
    backgroundColor: 'white',
    alignSelf: 'flex-end',
  },
  assistantBubble: {
    backgroundColor: '#2196F3',
    alignSelf: 'flex-start',
  },
  messageText: {
    fontSize: 16,
    color: 'black',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#F2F2F2',
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderRadius: 20,
    padding: 10,
    marginRight: 10,
    backgroundColor: '#fff',
  },
  sendButton: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 20,
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  speechButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 20,
  },
  speechButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ChatScreen;
