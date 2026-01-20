import LayerModel3D from '@/components/atoms/LayerModel3D';
import { Environment, PerspectiveCamera } from '@react-three/drei/native';
import { Canvas } from '@react-three/fiber/native';
import React from 'react';
import { StyleSheet, View } from 'react-native';

interface Layer {
  modelPath: any;
  yOffset: number;
}

interface AssembledBurger3DProps {
  layers: Layer[];
  size?: number;
}

const AssembledBurger3D = ({ layers, size = 350 }: AssembledBurger3DProps) => {
  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 2, 6]} />
        
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
        
        <group>
          {layers.map((layer, index) => (
            <LayerModel3D
              key={index}
              modelPath={layer.modelPath}
              position={[0, layer.yOffset, 0]}
              scale={1.8}
            />
          ))}
        </group>
        
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