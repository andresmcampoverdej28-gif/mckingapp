import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Undo2, Trash2 } from 'lucide-react-native';

interface BuilderControlsProps {
  onUndo: () => void;
  onClear: () => void;
  canUndo: boolean;
}

const BuilderControls = ({ onUndo, onClear, canUndo }: BuilderControlsProps) => {
  return (
    <View style={styles.container}>
      <Pressable 
        style={[styles.button, styles.undoButton, !canUndo && styles.buttonDisabled]}
        onPress={onUndo}
        disabled={!canUndo}
        android_ripple={{ color: 'rgba(255,255,255,0.3)' }}
      >
        <View style={styles.buttonContent}>
          <Undo2 color="#fff" size={22} />
          <Text style={styles.buttonText}>Quitar último</Text>
        </View>
      </Pressable>

      <Pressable 
        style={[styles.button, styles.clearButton]}
        onPress={onClear}
        android_ripple={{ color: 'rgba(255,255,255,0.3)' }}
      >
        <View style={styles.buttonContent}>
          <Trash2 color="#fff" size={22} />
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
    borderRadius: 12,
    overflow: 'hidden',
    minHeight: 56,
    justifyContent: 'center',
  },
  undoButton: {
    backgroundColor: '#3B82F6', // Azul vibrante
  },
  clearButton: {
    backgroundColor: '#EF4444', // Rojo vibrante
  },
  buttonDisabled: {
    backgroundColor: '#9CA3AF', // Gris para deshabilitado
    opacity: 0.7,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    paddingVertical: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default BuilderControls;