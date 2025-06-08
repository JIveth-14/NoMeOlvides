import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface ReminderItemProps {
  emoji: string;
  text: string;
}

export default function ReminderItem({ emoji, text }: ReminderItemProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>{emoji}</Text>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    marginBottom: 10,
    borderRadius: 8,
    backgroundColor: '#E8F0FE',
  },
  emoji: {
    fontSize: 24,
    marginRight: 10,
  },
  text: {
    fontSize: 16,
  },
});
