import AppTitle from '@/components/atoms/AppTitle';
import TabSelector from '@/components/molecules/TabSelector';
import SceneLayout from '@/templates/SceneLayout';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import AssembledViewScreen from './AssembledViewScreen';
import LayerViewScreen from './LayerViewScreen';

interface Layer {
  name: string;
  modelPath: any;
  yOffset: number;
}

interface BurgerViewerScreenProps {
  activeTab: 'layers' | 'assembled';
  currentLayerIndex: number;
  layers: Layer[];
  onTabChange: (tab: 'layers' | 'assembled') => void;
  onLayerNavigate: (index: number) => void;
}

const BurgerViewerScreen = ({
  activeTab,
  currentLayerIndex,
  layers,
  onTabChange,
  onLayerNavigate,
}: BurgerViewerScreenProps) => {
  return (
    <SceneLayout>
      <View style={styles.content}>
        <AppTitle text="Mi Hamburguesa"/>
        
        <TabSelector activeTab={activeTab} onTabChange={onTabChange} />
        
        <View style={styles.viewContainer}>
          {activeTab === 'layers' ? (
            <LayerViewScreen
              layers={layers}
              currentIndex={currentLayerIndex}
              onNavigate={onLayerNavigate}
            />
          ) : (
            <AssembledViewScreen layers={layers} />
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
    gap: 25,
    alignItems: 'center',
  },
  viewContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default BurgerViewerScreen;