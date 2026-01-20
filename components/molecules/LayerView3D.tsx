import LayerModel3D from '@/components/atoms/LayerModel3D';
import { Environment, PerspectiveCamera } from '@react-three/drei/native';
import { Canvas } from '@react-three/fiber/native';
import React from 'react';
import { StyleSheet, View } from 'react-native';

interface LayerView3DProps {
  modelPath: any;
  size?: number;
}

const LayerView3D = ({ modelPath, size = 300 }: LayerView3DProps) => {
  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        
        <ambientLight intensity={Math.PI / 2} />
        <spotLight 
          position={[10, 10, 10]} 
          angle={0.15} 
          penumbra={1} 
          decay={0} 
          intensity={Math.PI} 
        />
        <pointLight 
          position={[-10, -10, -10]} 
          decay={0} 
          intensity={Math.PI} 
        />
        
        <LayerModel3D modelPath={modelPath} position={[0, 0, 0]} scale={2} />
        
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