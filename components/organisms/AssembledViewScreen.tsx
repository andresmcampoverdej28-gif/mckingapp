import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import AssembledBurger3D from '@/components/molecules/AssembledBurger3D';

interface Layer {
  name: string;
  modelPath: any;
  yOffset: number;
}

interface AssembledViewScreenProps {
  layers: Layer[];
}

const AssembledViewScreen = ({ layers }: AssembledViewScreenProps) => {
  return (
    <View style={styles.container}>
      <AssembledBurger3D layers={layers} size={360} />
      
      <View style={styles.info}>
        <Text style={styles.title}>Hamburguesa Completa</Text>
        <Text style={styles.subtitle}>
          {layers.length} ingredientes
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: 20,
  },
  info: {
    alignItems: 'center',
    gap: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  subtitle: {
    fontSize: 16,
    color: '#aaa',
  },
});

export default AssembledViewScreen;