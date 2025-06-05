import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface Props {
  text: string;
}

export default function CustomReminder({ text }: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 15,
    marginVertical: 8,
    borderRadius: 10,
    backgroundColor: '#D9F8C4',
  },
  text: {
    fontSize: 16,
  },
});
