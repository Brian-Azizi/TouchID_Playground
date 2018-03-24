import React from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const styles = StyleSheet.create({
  button: {
    textAlign: 'center',
    padding: 8,
    fontSize: 18,
  },
  loading: {
    padding: 8,
  },
});

export const Button = ({
 onPress, title, color = '#007AFF', loading,
}) =>
  loading ? (
    <View style={styles.loading}>
      <ActivityIndicator color={color} />
    </View>
  ) : (
    <TouchableOpacity onPress={onPress}>
      <Text style={[styles.button, { color }]}>{title}</Text>
    </TouchableOpacity>
  );
