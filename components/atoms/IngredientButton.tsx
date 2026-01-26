import { LucideIcon } from 'lucide-react-native';
import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

interface IngredientButtonProps {
  name: string;
  icon: LucideIcon;
  onPress: () => void;
  color?: string;
}

const IngredientButton = ({ 
  name, 
  icon: Icon,
  onPress,
  color = '#f39c12'
}: IngredientButtonProps) => {
  return (
    <Pressable style={[styles.button, { backgroundColor: color }]} onPress={onPress}>
      <Icon color="#fff" size={32} style={styles.icon} />
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
  icon: {
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