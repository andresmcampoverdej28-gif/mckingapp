import { Environment } from '@react-three/drei/native';
import { Canvas, useFrame } from '@react-three/fiber/native';
import React, { useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Group } from 'three';
import InteractiveLayerModel from '../atoms/InteractiveLayerModel';

interface BurgerLayer {
  id: string;
  name: string;
  modelUrl: string;
  yOffset: number;
}

interface CustomBurger3DProps {
  layers: BurgerLayer[];
  selectedLayerId: string | null;
  onLayerSelect: (id: string) => void;
  size?: number;
}

function RotatingBurger({ 
  layers, 
  selectedLayerId, 
  onLayerSelect 
}: { 
  layers: BurgerLayer[]; 
  selectedLayerId: string | null;
  onLayerSelect: (id: string) => void;
}) {
  const groupRef = useRef<Group>(null);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.15;
    }
  });

  return (
    <group ref={groupRef}>
      {layers.map((layer) => (
        <InteractiveLayerModel
          key={layer.id}
          modelUrl={layer.modelUrl}
          position={[0, layer.yOffset, 0]}
          scale={0.5}
          isSelected={selectedLayerId === layer.id}
          onSelect={() => onLayerSelect(layer.id)}
        />
      ))}
    </group>
  );
}

const CustomBurger3D = ({ 
  layers, 
  selectedLayerId, 
  onLayerSelect,
  size = 320 
}: CustomBurger3DProps) => {
  const selectedLayer = layers.find(l => l.id === selectedLayerId);
  const centerY = layers.length > 0 
    ? layers.reduce((sum, layer) => sum + layer.yOffset, 0) / layers.length 
    : 0;

  return (
    <View style={styles.container}>
      <View style={[styles.canvas, { width: size, height: size }]}>
        <Canvas
          camera={{
            position: [4, 3, 4],
            fov: 45,
            near: 0.1,
            far: 1000,
          }}
          onCreated={({ camera }) => {
            camera.lookAt(0, centerY, 0);
          }}
        >
          <ambientLight intensity={0.6} />
          <directionalLight 
            position={[5, 8, 5]} 
            intensity={1.5}
            castShadow
          />
          <directionalLight 
            position={[-5, 5, -5]} 
            intensity={0.5}
          />
          <pointLight 
            position={[0, 6, 0]} 
            intensity={0.6}
          />
          
          <RotatingBurger 
            layers={layers} 
            selectedLayerId={selectedLayerId}
            onLayerSelect={onLayerSelect}
          />
          
          <Environment preset="sunset" />
        </Canvas>
      </View>

      {selectedLayer && (
        <View style={styles.nameBox}>
          <Text style={styles.nameText}>{selectedLayer.name}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: 15,
  },
  canvas: {
    backgroundColor: 'transparent',
  },
  nameBox: {
    backgroundColor: 'rgba(243, 156, 18, 0.9)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 12,
  },
  nameText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default CustomBurger3D;