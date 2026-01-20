import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

interface LayerNavigatorProps {
  currentIndex: number;
  totalLayers: number;
  onPrevious: () => void;
  onNext: () => void;
}

const LayerNavigator = ({ 
  currentIndex, 
  totalLayers, 
  onPrevious, 
  onNext 
}: LayerNavigatorProps) => {
  return (
    <View style={styles.container}>
      <Pressable 
        style={[styles.button, currentIndex === 0 && styles.buttonDisabled]}
        onPress={onPrevious}
        disabled={currentIndex === 0}
      >
        <Text style={styles.arrow}>←</Text>
      </Pressable>

      <Text style={styles.counter}>
        {currentIndex + 1} / {totalLayers}
      </Text>

      <Pressable 
        style={[styles.button, currentIndex === totalLayers - 1 && styles.buttonDisabled]}
        onPress={onNext}
        disabled={currentIndex === totalLayers - 1}
      >
        <Text style={styles.arrow}>→</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  button: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#f39c12',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 3,
  },
  buttonDisabled: {
    backgroundColor: '#95a5a6',
    opacity: 0.5,
  },
  arrow: {
    fontSize: 28,
    color: '#fff',
    fontWeight: 'bold',
  },
  counter: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '600',
    minWidth: 60,
    textAlign: 'center',
  },
});

export default LayerNavigator;