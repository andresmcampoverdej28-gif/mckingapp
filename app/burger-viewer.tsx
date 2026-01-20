import BurgerViewerScreen from '@/components/organisms/BurgerViewerScreen';
import React, { useState } from 'react';

// Definir las capas de la hamburguesa
const BURGER_LAYERS = [
  { 
    name: 'Pan Superior', 
    modelPath: require('@/assets/models/panSuperior.glb'),
    yOffset: 1.5
  },
  { 
    name: 'Queso', 
    modelPath: require('@/assets/models/queso.glb'),
    yOffset: 1.2
  },
  { 
    name: 'Lechuga', 
    modelPath: require('@/assets/models/lechuga.glb'),
    yOffset: 0.9
  },
  { 
    name: 'Tomate', 
    modelPath: require('@/assets/models/tomate.glb'),
    yOffset: 0.6
  },
  { 
    name: 'Carne', 
    modelPath: require('@/assets/models/carne.glb'),
    yOffset: 0.3
  },
  { 
    name: 'Pan Inferior', 
    modelPath: require('@/assets/models/panInferior.glb'),
    yOffset: 0
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