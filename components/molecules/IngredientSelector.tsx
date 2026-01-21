import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import IngredientButton from '../atoms/IngredientButton';

interface Ingredient {
  key: string;
  name: string;
  emoji: string;
  color: string;
}

interface IngredientSelectorProps {
  onSelectIngredient: (key: string) => void;
}

const AVAILABLE_INGREDIENTS: Ingredient[] = [
  { key: 'carne', name: 'Carne', emoji: '🥩', color: '#8b4513' },
  { key: 'queso', name: 'Queso', emoji: '🧀', color: '#ffd700' },
  { key: 'lechuga', name: 'Lechuga', emoji: '🥬', color: '#32cd32' },
  { key: 'tomate', name: 'Tomate', emoji: '🍅', color: '#ff6347' },
];

const IngredientSelector = ({ onSelectIngredient }: IngredientSelectorProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Agregar ingrediente:</Text>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {AVAILABLE_INGREDIENTS.map((ingredient) => (
          <IngredientButton
            key={ingredient.key}
            name={ingredient.name}
            emoji={ingredient.emoji}
            color={ingredient.color}
            onPress={() => onSelectIngredient(ingredient.key)}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
  },
  scrollContent: {
    gap: 12,
    paddingHorizontal: 20,
  },
});

export default IngredientSelector;