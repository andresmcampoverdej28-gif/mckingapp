import { Environment } from '@react-three/drei/native';
import { Canvas, useFrame } from '@react-three/fiber/native';
import React, { useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { Group } from 'three';
import LayerModel3D from '../atoms/LayerModel3D';

interface Layer {
  modelUrl: string;
  yOffset: number;
}

interface AssembledBurger3DProps {
  layers: Layer[];
  size?: number;
}

function RotatingBurger({ layers }: { layers: Layer[] }) {
  const groupRef = useRef<Group>(null);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      {layers.map((layer, index) => (
        <LayerModel3D
          key={index}
          modelUrl={layer.modelUrl}
          position={[0, layer.yOffset, 0]}
          scale={1.25}
        />
      ))}
    </group>
  );
}

const AssembledBurger3D = ({ layers, size = 350 }: AssembledBurger3DProps) => {
  const centerY = layers.length > 0 
    ? layers.reduce((sum, layer) => sum + layer.yOffset, 0) / layers.length 
    : 0;

  return (
    <View style={[styles.container, { width: size, height: size }]}>
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
        
        <RotatingBurger layers={layers} />
        
        <Environment preset="sunset" />
      </Canvas>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
  },
});

export default AssembledBurger3D;