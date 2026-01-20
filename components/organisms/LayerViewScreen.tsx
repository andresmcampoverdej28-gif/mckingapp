import React from 'react';
import { View, StyleSheet } from 'react-native';
import LayerView3D from '@/components/molecules/LayerView3D';
import LayerInfo from '@/components/atoms/LayerInfo';
import LayerNavigator from '@/components/molecules/LayerNavigator';

interface Layer {
  name: string;
  modelPath: any;
}

interface LayerViewScreenProps {
  layers: Layer[];
  currentIndex: number;
  onNavigate: (index: number) => void;
}

const LayerViewScreen = ({ 
  layers, 
  currentIndex, 
  onNavigate 
}: LayerViewScreenProps) => {
  const currentLayer = layers[currentIndex];

  const handlePrevious = () => {
    if (currentIndex > 0) {
      onNavigate(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < layers.length - 1) {
      onNavigate(currentIndex + 1);
    }
  };

  return (
    <View style={styles.container}>
      <LayerView3D modelPath={currentLayer.modelPath} size={320} />
      
      <View style={styles.info}>
        <LayerInfo name={currentLayer.name} />
        <LayerNavigator
          currentIndex={currentIndex}
          totalLayers={layers.length}
          onPrevious={handlePrevious}
          onNext={handleNext}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: 30,
  },
  info: {
    alignItems: 'center',
    gap: 20,
  },
});

export default LayerViewScreen;