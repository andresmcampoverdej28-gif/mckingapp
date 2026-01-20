import BurgerViewerScreen from '@/components/organisms/BurgerViewerScreen';
import React, { useState } from 'react';

// Ajustar los offsets Y para mejor proporción
const BURGER_LAYERS = [
  { 
    name: 'Pan Superior', 
    modelPath: require('../assets/models/panSuperior.glb'),
    yOffset: 2.5  // Ajustado
  },
  { 
    name: 'Queso', 
    modelPath: require('../assets/models/queso.glb'),
    yOffset: 2.0  // Ajustado
  },
  { 
    name: 'Lechuga', 
    modelPath: require('../assets/models/lechuga.glb'),
    yOffset: 1.5  // Ajustado
  },
  { 
    name: 'Tomate', 
    modelPath: require('../assets/models/tomate.glb'),
    yOffset: 1.0  // Ajustado
  },
  { 
    name: 'Carne', 
    modelPath: require('../assets/models/carne.glb'),
    yOffset: 0.5  // Ajustado
  },
  { 
    name: 'Pan Inferior', 
    modelPath: require('../assets/models/panInferior.glb'),
    yOffset: 0    // Base
  },
];

export default function BurgerViewer() {
  const [activeTab, setActiveTab] = useState<'layers' | 'assembled'>('layers');
  const [currentLayerIndex, setCurrentLayerIndex] = useState(0);

  const handleTabChange = (tab: 'layers' | 'assembled') => {
    setActiveTab(tab);
  };

  const handleLayerNavigate = (index: number) => {
    setCurrentLayerIndex(index);
  };

  return (
    <BurgerViewerScreen
      activeTab={activeTab}
      currentLayerIndex={currentLayerIndex}
      layers={BURGER_LAYERS}
      onTabChange={handleTabChange}
      onLayerNavigate={handleLayerNavigate}
    />
  );
}