import React, { useState } from 'react';
import BurgerViewerScreen from '@/components/organisms/BurgerViewerScreen';
import { burgerModels } from '@/lib/config/burgerModels';

const LAYER_SPACING = 0.6;

// Capas predefinidas
const BURGER_LAYERS = [
  { 
    name: 'Pan Inferior', 
    modelUrl: burgerModels.panInferior,
    yOffset: 0
  },
  { 
    name: 'Carne', 
    modelUrl: burgerModels.carne,
    yOffset: LAYER_SPACING
  },
  { 
    name: 'Tomate', 
    modelUrl: burgerModels.tomate,
    yOffset: LAYER_SPACING * 2
  },
  { 
    name: 'Lechuga', 
    modelUrl: burgerModels.lechuga,
    yOffset: LAYER_SPACING * 3
  },
  { 
    name: 'Queso', 
    modelUrl: burgerModels.queso,
    yOffset: LAYER_SPACING * 4
  },
  { 
    name: 'Pan Superior', 
    modelUrl: burgerModels.panSuperior,
    yOffset: LAYER_SPACING * 5
  },
];

// Mapa de ingredientes disponibles
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
  
  // Estado para hamburguesa personalizada
  const [customLayers, setCustomLayers] = useState([
    { 
      id: 'bottom-bread', 
      name: 'Pan Inferior', 
      modelUrl: burgerModels.panInferior, 
      yOffset: 0 
    },
    { 
      id: 'top-bread', 
      name: 'Pan Superior', 
      modelUrl: burgerModels.panSuperior, 
      yOffset: LAYER_SPACING 
    },
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
      // Insertar antes del pan superior
      const newLayers = [...prev];
      const topBreadIndex = newLayers.length - 1;
      
      const newLayer = {
        id: `${key}-${Date.now()}`,
        name: ingredient.name,
        modelUrl: ingredient.modelUrl,
        yOffset: newLayers[topBreadIndex - 1]?.yOffset + LAYER_SPACING || LAYER_SPACING,
      };

      // Insertar el nuevo ingrediente antes del pan superior
      newLayers.splice(topBreadIndex, 0, newLayer);

      // Actualizar la posición del pan superior
      newLayers[newLayers.length - 1].yOffset = newLayer.yOffset + LAYER_SPACING;

      return newLayers;
    });
  };

  const handleRemoveLast = () => {
    setCustomLayers(prev => {
      if (prev.length <= 2) return prev; // No quitar los panes
      
      const newLayers = [...prev];
      // Quitar el penúltimo (antes del pan superior)
      newLayers.splice(newLayers.length - 2, 1);
      
      // Actualizar posición del pan superior
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
      { 
        id: 'bottom-bread', 
        name: 'Pan Inferior', 
        modelUrl: burgerModels.panInferior, 
        yOffset: 0 
      },
      { 
        id: 'top-bread', 
        name: 'Pan Superior', 
        modelUrl: burgerModels.panSuperior, 
        yOffset: LAYER_SPACING 
      },
    ]);
    setSelectedLayerId(null);
  };

  const handleLayerSelect = (id: string) => {
    setSelectedLayerId(prevId => prevId === id ? null : id);
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
    />
  );
}