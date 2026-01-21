import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

interface BuilderControlsProps {
  onUndo: () => void;
  onClear: () => void;
  canUndo: boolean;
}

const BuilderControls = ({ onUndo, onClear, canUndo }: BuilderControlsProps) => {
  return (
    <View style={styles.container}>
      <Pressable 
        style={[styles.button, !canUndo && styles.buttonDisabled]}
        onPress={onUndo}
        disabled={!canUndo}
      >
        <Text style={styles.icon}>↩️</Text>
        <Text style={styles.buttonText}>Quitar último</Text>
      </Pressable>

      <Pressable 
        style={[styles.button, styles.clearButton]}
        onPress={onClear}
      >
        <Text style={styles.icon}>🗑️</Text>
        <Text style={styles.buttonText}>Reiniciar</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 15,
    paddingHorizontal: 20,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#3498db',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    flex: 1,
    justifyContent: 'center',
  },
  clearButton: {
    backgroundColor: '#e74c3c',
  },
  buttonDisabled: {
    backgroundColor: '#95a5a6',
    opacity: 0.5,
  },
  icon: {
    fontSize: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default BuilderControls;