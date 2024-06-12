// components/ChatBubble.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ChatBubble = ({ role, content }) => (
  <View
    style={[
      styles.messageContainer,
      role === 'user' ? styles.userBubble : styles.assistantBubble,
      role === 'user' ? { marginLeft: 10 } : { marginRight: 10 },
    ]}
  >
    <Text style={styles.messageText}>{content}</Text>
  </View>
);

const styles = StyleSheet.create({
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
});

export default ChatBubble;
