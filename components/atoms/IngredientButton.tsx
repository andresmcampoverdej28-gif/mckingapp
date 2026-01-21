import React from 'react';
import { Pressable, Text, StyleSheet, View } from 'react-native';

interface IngredientButtonProps {
  name: string;
  emoji: string;
  onPress: () => void;
  color?: string;
}

const IngredientButton = ({ 
  name, 
  emoji, 
  onPress,
  color = '#f39c12'
}: IngredientButtonProps) => {
  return (
    <Pressable style={[styles.button, { backgroundColor: color }]} onPress={onPress}>
      <Text style={styles.emoji}>{emoji}</Text>
      <Text style={styles.name}>{name}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
    minWidth: 90,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  emoji: {
    fontSize: 32,
    marginBottom: 4,
  },
  name: {
    fontSize: 12,
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
  },
});

export default IngredientButton;