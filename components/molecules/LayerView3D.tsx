import { Environment } from '@react-three/drei/native';
import { Canvas, useFrame } from '@react-three/fiber/native';
import React, { useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { Group } from 'three';
import LayerModel3D from '../atoms/LayerModel3D';

interface LayerView3DProps {
  modelPath: any;
  size?: number;
}

// Componente para rotar suavemente el ingrediente
function RotatingLayer({ modelPath }: { modelPath: any }) {
  const groupRef = useRef<Group>(null);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <group ref={groupRef}>
      <LayerModel3D modelPath={modelPath} position={[0, 0, 0]} scale={1.5} />
    </group>
  );
}

const LayerView3D = ({ modelPath, size = 300 }: LayerView3DProps) => {
  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Canvas
        camera={{
          position: [3, 2.5, 3],
          fov: 50,
          near: 0.1,
          far: 1000,
        }}
        onCreated={({ camera }) => {
          camera.lookAt(0, 0, 0); // Mirar al centro (0, 0, 0)
        }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight 
          position={[5, 5, 5]} 
          intensity={1.2}
          castShadow
        />
        <directionalLight 
          position={[-5, 3, -5]} 
          intensity={0.4}
        />
        <pointLight 
          position={[0, 5, 0]} 
          intensity={0.5}
        />
        
        <RotatingLayer modelPath={modelPath} />
        
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

export default LayerView3D;