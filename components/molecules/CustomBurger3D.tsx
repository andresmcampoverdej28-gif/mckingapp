import { Environment } from '@react-three/drei/native';
import { Canvas, useFrame, useThree } from '@react-three/fiber/native';
import React, { useEffect, useRef } from 'react';
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
          scale={4.5}
          isSelected={selectedLayerId === layer.id}
          onSelect={() => onLayerSelect(layer.id)}
        />
      ))}
    </group>
  );
}

// Componente para ajustar dinámicamente la cámara
function AdaptiveCamera({ layers }: { layers: BurgerLayer[] }) {
  const { camera } = useThree();
  
  useEffect(() => {
    if (layers.length > 0) {
      // Calcular la altura máxima de la hamburguesa
      const maxYOffset = Math.max(...layers.map(layer => layer.yOffset));
      const minYOffset = Math.min(...layers.map(layer => layer.yOffset));
      const burgerHeight = maxYOffset - minYOffset + 1.2; // +1.2 para margen
      
      // Calcular el centro vertical de la hamburguesa
      const centerY = (maxYOffset + minYOffset) / 2;
      
      // Ajustar la distancia de la cámara basado en la altura
      // Cuanto más alta la hamburguesa, más lejos se aleja la cámara
      const baseDistance = 6;
      const heightFactor = 1.5;
      const distance = baseDistance + (burgerHeight * heightFactor);
      
      // Ajustar la altura de la cámara para mantener el centro en vista
      const cameraHeight = centerY + distance * 0.3;
      
      // Actualizar posición de la cámara
      camera.position.set(distance, cameraHeight, distance);
      camera.lookAt(0, centerY, 0);
      camera.updateProjectionMatrix();
    }
  }, [layers, camera]);

  return null; // Este componente no renderiza nada
}

const CustomBurger3D = ({ 
  layers, 
  selectedLayerId, 
  onLayerSelect,
  size = 320 
}: CustomBurger3DProps) => {
  const selectedLayer = layers.find(l => l.id === selectedLayerId);

  return (
    <View style={styles.container}>
      <View style={[styles.canvas, { width: size, height: size }]}>
        <Canvas
          camera={{
            position: [6, 3, 6],
            fov: 45,
            near: 0.1,
            far: 1000,
          }}
        >
          <AdaptiveCamera layers={layers} />
          
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