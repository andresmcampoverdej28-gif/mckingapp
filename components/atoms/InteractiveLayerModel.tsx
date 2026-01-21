import { Gltf } from '@react-three/drei/native';
import { ThreeEvent } from '@react-three/fiber/native';
import React, { useState } from 'react';

interface InteractiveLayerModelProps {
  modelUrl: string;
  position: [number, number, number];
  scale: number;
  isSelected: boolean;
  onSelect: () => void;
}

const InteractiveLayerModel = ({ 
  modelUrl, 
  position, 
  scale,
  isSelected,
  onSelect
}: InteractiveLayerModelProps) => {
  const [hovered, setHovered] = useState(false);

  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    onSelect();
  };

  const displayScale = isSelected ? scale * 1.3 : (hovered ? scale * 1.1 : scale);

  return (
    <Gltf 
      src={modelUrl} 
      position={position} 
      scale={displayScale}
      onClick={handleClick}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      castShadow
      receiveShadow
    />
  );
};

export default InteractiveLayerModel;