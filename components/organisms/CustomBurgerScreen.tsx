import React from 'react';
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';
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
  size?: number;
}

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const CustomBurgerScreen = ({
  layers,
  selectedLayerId,
  onAddIngredient,
  onRemoveLast,
  onClear,
  onLayerSelect,
  size = Math.min(320, SCREEN_HEIGHT * 0.35),
}: CustomBurgerScreenProps) => {
  // Filtrar solo ingredientes (sin panes)
  const ingredients = layers.filter(layer => 
    layer.id !== 'bottom-bread' && layer.id !== 'top-bread'
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={true}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Armar Hamburguesa</Text>
        </View>

        <CustomBurger3D 
          layers={layers}
          selectedLayerId={selectedLayerId}
          onLayerSelect={onLayerSelect}
          size={size}
        />

        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>
            Ingredientes: {ingredients.length}
          </Text>
          <Text style={styles.hint}>
            Toca un ingrediente en la hamburguesa para seleccionarlo
          </Text>
        </View>

        {/* Mostrar lista de ingredientes agregados (solo lectura) */}
        {ingredients.length > 0 && (
          <View style={styles.ingredientsContainer}>
            <Text style={styles.sectionTitle}>Ingredientes Agregados:</Text>
            <View style={styles.ingredientsList}>
              {ingredients.map((ingredient, index) => (
                <View key={ingredient.id} style={styles.ingredientItem}>
                  <Text style={styles.ingredientNumber}>{index + 1}.</Text>
                  <Text style={styles.ingredientName}>{ingredient.name}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Agregar Nuevo Ingrediente:</Text>
          <IngredientSelector onSelectIngredient={onAddIngredient} />
        </View>

        <View style={styles.spacer} />
      </ScrollView>

      {/* Controles FIJOS en la parte inferior */}
      <View style={styles.fixedControls}>
        <BuilderControls
          onUndo={onRemoveLast}
          onClear={onClear}
          canUndo={ingredients.length > 0}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  header: {
    width: '100%',
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  infoContainer: {
    alignItems: 'center',
    marginVertical: 16,
    paddingHorizontal: 20,
  },
  infoText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  hint: {
    fontSize: 13,
    color: '#aaa',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  ingredientsContainer: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },
  section: {
    width: '100%',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 12,
    textAlign: 'center',
  },
  ingredientsList: {
    width: '100%',
    maxHeight: 150,
  },
  ingredientItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    marginBottom: 6,
  },
  ingredientNumber: {
    color: '#3498db',
    fontSize: 14,
    fontWeight: 'bold',
    marginRight: 10,
    minWidth: 25,
  },
  ingredientName: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  spacer: {
    height: 20,
  },
  fixedControls: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(26, 26, 26, 0.95)',
    borderTopWidth: 1,
    borderTopColor: '#333',
    paddingVertical: 16,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 10,
  },
});

export default CustomBurgerScreen;