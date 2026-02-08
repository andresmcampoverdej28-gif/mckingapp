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
    <Pressable 
      style={[styles.button, { backgroundColor: color }]} 
      onPress={onPress}
    >
      <Icon color="#fff" size={28} style={styles.icon} />
      <Text style={styles.name}>{name}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 10,  // Reducido de 15
    paddingHorizontal: 16, // Reducido de 20
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center', // Añadido para centrar contenido
    minWidth: 90,
    maxHeight: 80, // LÍMITE DE ALTURA AÑADIDO
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  icon: {
    marginBottom: 2, // Reducido de 4
  },
  name: {
    fontSize: 12,
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
  },
});

export default IngredientButton;