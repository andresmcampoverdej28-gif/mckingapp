import BurgerViewerScreen from '@/components/organisms/BurgerViewerScreen';
import { burgerModels } from '@/lib/config/burgerModels';
import React, { useState } from 'react';
import { Alert } from 'react-native';

const LAYER_SPACING = 0.6;

const BURGER_LAYERS = [
  { name: 'Pan Inferior', modelUrl: burgerModels.panInferior, yOffset: 0 },
  { name: 'Carne', modelUrl: burgerModels.carne, yOffset: LAYER_SPACING },
  { name: 'Tomate', modelUrl: burgerModels.tomate, yOffset: LAYER_SPACING * 2 },
  { name: 'Lechuga', modelUrl: burgerModels.lechuga, yOffset: LAYER_SPACING * 3 },
  { name: 'Queso', modelUrl: burgerModels.queso, yOffset: LAYER_SPACING * 4 },
  { name: 'Pan Superior', modelUrl: burgerModels.panSuperior, yOffset: LAYER_SPACING * 5 },
];

const INGREDIENT_MAP: Record<string, { name: string; modelUrl: string }> = {
  carne: { name: 'Carne', modelUrl: burgerModels.carne },
  queso: { name: 'Queso', modelUrl: burgerModels.queso },
  lechuga: { name: 'Lechuga', modelUrl: burgerModels.lechuga },
  tomate: { name: 'Tomate', modelUrl: burgerModels.tomate },
};

export default function BurgerViewer() {
  const [activeTab, setActiveTab] = useState<'layers' | 'assembled' | 'custom'>('layers');
  const [currentLayerIndex, setCurrentLayerIndex] = useState(0);
  const [selectedLayerId, setSelectedLayerId] = useState<string | null>(null);
  
  const [customLayers, setCustomLayers] = useState([
    { id: 'bottom-bread', name: 'Pan Inferior', modelUrl: burgerModels.panInferior, yOffset: 0 },
    { id: 'top-bread', name: 'Pan Superior', modelUrl: burgerModels.panSuperior, yOffset: LAYER_SPACING },
  ]);

  const handleTabChange = (tab: 'layers' | 'assembled' | 'custom') => {
    setActiveTab(tab);
    setSelectedLayerId(null);
  };

  const handleLayerNavigate = (index: number) => {
    setCurrentLayerIndex(index);
  };

  const handleAddIngredient = (key: string) => {
    const ingredient = INGREDIENT_MAP[key];
    if (!ingredient) return;

    setCustomLayers(prev => {
      const newLayers = [...prev];
      const topBreadIndex = newLayers.length - 1;
      
      const newLayer = {
        id: `${key}-${Date.now()}`,
        name: ingredient.name,
        modelUrl: ingredient.modelUrl,
        yOffset: newLayers[topBreadIndex - 1]?.yOffset + LAYER_SPACING || LAYER_SPACING,
      };

      newLayers.splice(topBreadIndex, 0, newLayer);
      newLayers[newLayers.length - 1].yOffset = newLayer.yOffset + LAYER_SPACING;

      return newLayers;
    });
  };

  const handleRemoveLast = () => {
    setCustomLayers(prev => {
      if (prev.length <= 2) return prev;
      
      const newLayers = [...prev];
      newLayers.splice(newLayers.length - 2, 1);
      
      const lastIngredientIndex = newLayers.length - 2;
      newLayers[newLayers.length - 1].yOffset = 
        lastIngredientIndex >= 0 
          ? newLayers[lastIngredientIndex].yOffset + LAYER_SPACING 
          : LAYER_SPACING;
      
      return newLayers;
    });
    setSelectedLayerId(null);
  };

  const handleClearCustom = () => {
    setCustomLayers([
      { id: 'bottom-bread', name: 'Pan Inferior', modelUrl: burgerModels.panInferior, yOffset: 0 },
      { id: 'top-bread', name: 'Pan Superior', modelUrl: burgerModels.panSuperior, yOffset: LAYER_SPACING },
    ]);
    setSelectedLayerId(null);
  };

  const handleLayerSelect = (id: string) => {
    setSelectedLayerId(prevId => prevId === id ? null : id);
  };

  // ← NUEVA FUNCIÓN
  const handlePurchase = () => {
    const ingredientCount = customLayers.length - 2;
    
    if (ingredientCount === 0) {
      Alert.alert(
        'Hamburguesa vacía',
        'Agrega al menos un ingrediente antes de comprar',
        [{ text: 'OK' }]
      );
      return;
    }

    const ingredientsList = customLayers
      .slice(1, -1) // Excluir panes
      .map(layer => layer.name)
      .join(', ');

    Alert.alert(
      '🛒 Comprar Hamburguesa',
      `Tu hamburguesa tiene:\n\n${ingredientsList}\n\nTotal: ${ingredientCount} ingredientes`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Confirmar', 
          onPress: () => {
            // Aquí irá la lógica futura
            Alert.alert('✅ Compra exitosa', '¡Disfruta tu hamburguesa!');
          }
        }
      ]
    );
  };

  return (
    <BurgerViewerScreen
      activeTab={activeTab}
      currentLayerIndex={currentLayerIndex}
      layers={BURGER_LAYERS}
      customLayers={customLayers}
      selectedLayerId={selectedLayerId}
      onTabChange={handleTabChange}
      onLayerNavigate={handleLayerNavigate}
      onAddIngredient={handleAddIngredient}
      onRemoveLast={handleRemoveLast}
      onClearCustom={handleClearCustom}
      onLayerSelect={handleLayerSelect}
      onPurchase={handlePurchase} // ← NUEVO
    />
  );
}