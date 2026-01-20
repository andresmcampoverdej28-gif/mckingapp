import { useGLTF } from '@react-three/drei/native';
import React from 'react';
import type { GLTF } from 'three-stdlib';

interface LayerModel3DProps {
  modelPath: any;
  position?: [number, number, number];
  scale?: number;
}

type GLTFResult = GLTF & {
  nodes: any;
  materials: any;
};

const LayerModel3D = ({ 
  modelPath, 
  position = [0, 0, 0],
  scale = 1 
}: LayerModel3DProps) => {
  const gltf = useGLTF(modelPath) as GLTFResult;

  return (
    <group position={position} scale={scale}>
      <primitive object={gltf.scene.clone()} />
    </group>
  );
};

export default LayerModel3D;