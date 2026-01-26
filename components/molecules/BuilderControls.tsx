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
        android_ripple={{ color: 'rgba(255,255,255,0.2)' }}
      >
        <View style={styles.buttonContent}>
          <Text style={styles.icon}>↩️</Text>
          <Text style={styles.buttonText}>Quitar último</Text>
        </View>
      </Pressable>

      <Pressable 
        style={[styles.button, styles.clearButton]}
        onPress={onClear}
        android_ripple={{ color: 'rgba(255,255,255,0.2)' }}
      >
        <View style={styles.buttonContent}>
          <Text style={styles.icon}>🗑️</Text>
          <Text style={styles.buttonText}>Reiniciar</Text>
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 16,
    width: '100%',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    backgroundColor: '#3498db',
    borderRadius: 12,
    overflow: 'hidden',
    minHeight: 56,
    justifyContent: 'center',
  },
  clearButton: {
    backgroundColor: '#e74c3c',
  },
  buttonDisabled: {
    backgroundColor: '#7f8c8d',
    opacity: 0.7,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    paddingVertical: 16,
  },
  icon: {
    fontSize: 22,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default BuilderControls;