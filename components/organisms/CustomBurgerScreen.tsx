import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import BuilderControls from '../molecules/BuilderControls';
import CustomBurger3D from '../molecules/CustomBurger3D';
import IngredientSelector from '../molecules/IngredientSelector';

interface BurgerLayer {
  id: string;
  name: string;
  modelUrl: string;
  yOffset: number;
}

interface CustomBurgerScreenProps {
  layers: BurgerLayer[];
  selectedLayerId: string | null;
  onAddIngredient: (key: string) => void;
  onRemoveLast: () => void;
  onClear: () => void;
  onLayerSelect: (id: string) => void;
}

const CustomBurgerScreen = ({
  layers,
  selectedLayerId,
  onAddIngredient,
  onRemoveLast,
  onClear,
  onLayerSelect,
}: CustomBurgerScreenProps) => {
  const ingredientCount = layers.length - 2; // Excluir panes

  return (
    <View style={styles.container}>
      <CustomBurger3D 
        layers={layers}
        selectedLayerId={selectedLayerId}
        onLayerSelect={onLayerSelect}
        size={320}
      />

      <View style={styles.info}>
        <Text style={styles.infoText}>
          Ingredientes: {ingredientCount}
        </Text>
        <Text style={styles.hint}>
          Toca un ingrediente para verlo más grande
        </Text>
      </View>

      <IngredientSelector onSelectIngredient={onAddIngredient} />

      <BuilderControls
        onUndo={onRemoveLast}
        onClear={onClear}
        canUndo={ingredientCount > 0}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 20,
    gap: 15,
  },
  info: {
    alignItems: 'center',
    gap: 5,
  },
  infoText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  hint: {
    fontSize: 12,
    color: '#aaa',
    fontStyle: 'italic',
    textAlign: 'center',
  },
});

export default CustomBurgerScreen;