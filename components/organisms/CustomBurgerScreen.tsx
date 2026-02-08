import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import PurchaseButton from '../atoms/PurchaseButton';
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
  onPurchase: () => void;
}

const CustomBurgerScreen = ({
  layers,
  selectedLayerId,
  onAddIngredient,
  onRemoveLast,
  onClear,
  onLayerSelect,
  onPurchase,
}: CustomBurgerScreenProps) => {
  const ingredientCount = layers.length - 2;

  return (
    <View style={styles.mainContainer}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
        alwaysBounceVertical={false}
      >
        {/* Vista 3D */}
        <CustomBurger3D 
          layers={layers}
          selectedLayerId={selectedLayerId}
          onLayerSelect={onLayerSelect}
          size={240}
        />

        {/* Información */}
        <View style={styles.info}>
          <Text style={styles.infoText}>
            Ingredientes: {ingredientCount}
          </Text>
          <Text style={styles.hint}>
            Toca un ingrediente para verlo más grande
          </Text>
        </View>

        {/* Selector de ingredientes */}
        <View style={styles.section}>
          <IngredientSelector onSelectIngredient={onAddIngredient} />
        </View>

        {/* Espacio extra al final para asegurar que se vean los controles */}
        <View style={styles.largeBottomSpace} />
      </ScrollView>
      
      {/* Controles y Botón de comprar FIJOS en la parte inferior */}
      <View style={styles.fixedBottomContainer}>
        <View style={styles.bottomSection}>
          <BuilderControls
            onUndo={onRemoveLast}
            onClear={onClear}
            canUndo={ingredientCount > 0}
          />
        </View>
        
        <View style={styles.bottomSection}>
          <PurchaseButton 
            onPress={onPurchase}
            disabled={ingredientCount === 0}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    width: '100%',
  },
  scrollView: {
    flex: 1,
    width: '100%',
  },
  container: {
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 2,
    gap: 45,
    paddingBottom: 140, // ESPACIO EXTRA PARA LOS BOTONES FIJOS
  },
  info: {
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 20,
    width: '100%',
    maxWidth: 400,
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
  section: {
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
  },
  largeBottomSpace: {
    height: 60,
  },
  fixedBottomContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)', // FONDO SEMITRANSPARENTE
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: '#333',
    alignItems: 'center',
    gap: 12,
  },
  bottomSection: {
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
  },
});

export default CustomBurgerScreen;