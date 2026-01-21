import { useGLTF } from '@react-three/drei/native';
import React, { useEffect, useRef } from 'react';
import { Box3, Group, Vector3 } from 'three';
import type { GLTF } from 'three-stdlib';

interface LayerModel3DProps {
  modelUrl: string; // Ahora recibe URL en vez de require()
  position?: [number, number, number];
  scale?: number;
}

type GLTFResult = GLTF & {
  nodes: any;
  materials: any;
};

const LayerModel3D = ({ 
  modelUrl, 
  position = [0, 0, 0],
  scale = 1.5 
}: LayerModel3DProps) => {
  const groupRef = useRef<Group>(null);
  const gltf = useGLTF(modelUrl) as GLTFResult;

  useEffect(() => {
    if (groupRef.current) {
      const box = new Box3().setFromObject(groupRef.current);
      const center = new Vector3();
      box.getCenter(center);
      groupRef.current.position.sub(center);
    }
  }, []);

  return (
    <group position={position} scale={scale}>
      <group ref={groupRef}>
        <primitive object={gltf.scene.clone()} />
      </group>
    </group>
  );
};

export default LayerModel3D;