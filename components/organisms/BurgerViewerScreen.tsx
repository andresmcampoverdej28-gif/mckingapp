import SceneLayout from '@/templates/SceneLayout';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import AppTitle from '../atoms/AppTitle';
import TabSelector from '../molecules/TabSelector';
import AssembledViewScreen from './AssembledViewScreen';
import CustomBurgerScreen from './CustomBurgerScreen';
import LayerViewScreen from './LayerViewScreen';

interface Layer {
  name: string;
  modelUrl: string;
  yOffset: number;
}

interface CustomLayer {
  id: string;
  name: string;
  modelUrl: string;
  yOffset: number;
}

interface BurgerViewerScreenProps {
  activeTab: 'layers' | 'assembled' | 'custom';
  currentLayerIndex: number;
  layers: Layer[];
  customLayers: CustomLayer[];
  selectedLayerId: string | null;
  onTabChange: (tab: 'layers' | 'assembled' | 'custom') => void;
  onLayerNavigate: (index: number) => void;
  onAddIngredient: (key: string) => void;
  onRemoveLast: () => void;
  onClearCustom: () => void;
  onLayerSelect: (id: string) => void;
}

const BurgerViewerScreen = ({
  activeTab,
  currentLayerIndex,
  layers,
  customLayers,
  selectedLayerId,
  onTabChange,
  onLayerNavigate,
  onAddIngredient,
  onRemoveLast,
  onClearCustom,
  onLayerSelect,
}: BurgerViewerScreenProps) => {
  return (
    <SceneLayout>
      <View style={styles.content}>
        <AppTitle text="Kolossos' Burger"/>
        
        <TabSelector activeTab={activeTab} onTabChange={onTabChange} />
        
        <View style={styles.viewContainer}>
          {activeTab === 'layers' && (
            <LayerViewScreen
              layers={layers}
              currentIndex={currentLayerIndex}
              onNavigate={onLayerNavigate}
            />
          )}
          
          {activeTab === 'assembled' && (
            <AssembledViewScreen layers={layers} />
          )}
          
          {activeTab === 'custom' && (
            <CustomBurgerScreen
              layers={customLayers}
              selectedLayerId={selectedLayerId}
              onAddIngredient={onAddIngredient}
              onRemoveLast={onRemoveLast}
              onClear={onClearCustom}
              onLayerSelect={onLayerSelect}
            />
          )}
        </View>
      </View>
    </SceneLayout>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingVertical: 20,
    gap: 20,
    alignItems: 'center',
  },
  viewContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default BurgerViewerScreen;