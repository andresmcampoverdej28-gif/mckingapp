import CustomAlert from '@/components/molecules/CustomAlert';
import BurgerViewerScreen from '@/components/organisms/BurgerViewerScreen';
import { burgerModels } from '@/lib/config/burgerModels';
import React, { useState } from 'react';

const LAYER_SPACING = 0.6;

const BURGER_LAYERS = [
  { name: 'Pan Inferior', modelUrl: burgerModels.panInferior, yOffset: 0 },
  { name: 'Carne', modelUrl: burgerModels.carne, yOffset: LAYER_SPACING },
  { name: 'Tomate', modelUrl: burgerModels.tomate, yOffset: LAYER_SPACING * 2 },
  { name: 'Lechuga', modelUrl: burgerModels.lechuga, yOffset: LAYER_SPACING * 3 },
  { name: 'Queso', modelUrl: burgerModels.queso, yOffset: LAYER_SPACING * 4 },
  { name: 'Pan Superior', modelUrl: burgerModels.panSuperior, yOffset: LAYER_SPACING * 5 },
];

const INGREDIENT_MAP: Record<string, { name: string; modelUrl: string }> = {
  carne: { name: 'Carne', modelUrl: burgerModels.carne },
  queso: { name: 'Queso', modelUrl: burgerModels.queso },
  lechuga: { name: 'Lechuga', modelUrl: burgerModels.lechuga },
  tomate: { name: 'Tomate', modelUrl: burgerModels.tomate },
};

export default function BurgerViewer() {
  const [activeTab, setActiveTab] = useState<'layers' | 'assembled' | 'custom'>('layers');
  const [currentLayerIndex, setCurrentLayerIndex] = useState(0);
  const [selectedLayerId, setSelectedLayerId] = useState<string | null>(null);
  const [showAlert, setShowAlert] = useState(false);
  
  // CORREGIDO: Incluimos todos los tipos que CustomAlert acepta
  const [alertConfig, setAlertConfig] = useState<{
    type: 'success' | 'error' | 'warning' | 'info' | 'purchase';
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    onConfirm?: () => void;
    onCancel?: () => void;
  }>({
    type: 'info', // Ahora 'info' está incluido en los tipos permitidos
    title: '',
    message: '',
  });
  
  const [customLayers, setCustomLayers] = useState([
    { id: 'bottom-bread', name: 'Pan Inferior', modelUrl: burgerModels.panInferior, yOffset: 0 },
    { id: 'top-bread', name: 'Pan Superior', modelUrl: burgerModels.panSuperior, yOffset: LAYER_SPACING },
  ]);

  const handleTabChange = (tab: 'layers' | 'assembled' | 'custom') => {
    setActiveTab(tab);
    setSelectedLayerId(null);
  };

  const handleLayerNavigate = (index: number) => {
    setCurrentLayerIndex(index);
  };

  const handleAddIngredient = (key: string) => {
    const ingredient = INGREDIENT_MAP[key];
    if (!ingredient) return;

    setCustomLayers(prev => {
      const newLayers = [...prev];
      const topBreadIndex = newLayers.length - 1;
      
      const newLayer = {
        id: `${key}-${Date.now()}`,
        name: ingredient.name,
        modelUrl: ingredient.modelUrl,
        yOffset: newLayers[topBreadIndex - 1]?.yOffset + LAYER_SPACING || LAYER_SPACING,
      };

      newLayers.splice(topBreadIndex, 0, newLayer);
      newLayers[newLayers.length - 1].yOffset = newLayer.yOffset + LAYER_SPACING;

      return newLayers;
    });
  };

  const handleRemoveLast = () => {
    setCustomLayers(prev => {
      if (prev.length <= 2) return prev;
      
      const newLayers = [...prev];
      newLayers.splice(newLayers.length - 2, 1);
      
      const lastIngredientIndex = newLayers.length - 2;
      newLayers[newLayers.length - 1].yOffset = 
        lastIngredientIndex >= 0 
          ? newLayers[lastIngredientIndex].yOffset + LAYER_SPACING 
          : LAYER_SPACING;
      
      return newLayers;
    });
    setSelectedLayerId(null);
  };

  const handleClearCustom = () => {
    setCustomLayers([
      { id: 'bottom-bread', name: 'Pan Inferior', modelUrl: burgerModels.panInferior, yOffset: 0 },
      { id: 'top-bread', name: 'Pan Superior', modelUrl: burgerModels.panSuperior, yOffset: LAYER_SPACING },
    ]);
    setSelectedLayerId(null);
  };

  const handleLayerSelect = (id: string) => {
    setSelectedLayerId(prevId => prevId === id ? null : id);
  };

  const handlePurchase = () => {
    const ingredientCount = customLayers.length - 2;
    
    if (ingredientCount === 0) {
      setAlertConfig({
        type: 'warning',
        title: '🍔 Hamburguesa vacía',
        message: '¡Necesitas agregar al menos un ingrediente antes de comprar!',
        confirmText: 'Agregar ingredientes',
        onConfirm: () => {
          setShowAlert(false);
          setActiveTab('custom');
        },
      });
      setShowAlert(true);
      return;
    }

    const ingredientsList = customLayers
      .slice(1, -1)
      .map(layer => `• ${layer.name}`)
      .join('\n');

    const totalPrice = ingredientCount * 1.5; // Ejemplo: $1.5 por ingrediente

    setAlertConfig({
      type: 'purchase',
      title: '🛒 Confirmar Compra',
      message: `Tu hamburguesa personalizada:\n\n${ingredientsList}\n\n📊 Total: ${ingredientCount} ingredientes\n💰 Precio: $${totalPrice.toFixed(2)}`,
      confirmText: 'Confirmar Compra',
      cancelText: 'Seguir Editando',
      onConfirm: () => {
        setShowAlert(false);
        
        // Mostrar alerta de éxito después de un breve delay
        setTimeout(() => {
          setAlertConfig({
            type: 'success',
            title: '¡Compra Exitosa!',
            message: 'Tu hamburguesa personalizada está en preparación.\n\n🎉 ¡Disfruta de tu creación!',
            confirmText: 'Continuar',
            onConfirm: () => {
              setShowAlert(false);
              handleClearCustom(); // Reinicia la hamburguesa
            },
          });
          setShowAlert(true);
        }, 300);
      },
      onCancel: () => {
        setShowAlert(false);
      },
    });
    setShowAlert(true);
  };

  return (
    <>
      <BurgerViewerScreen
        activeTab={activeTab}
        currentLayerIndex={currentLayerIndex}
        layers={BURGER_LAYERS}
        customLayers={customLayers}
        selectedLayerId={selectedLayerId}
        onTabChange={handleTabChange}
        onLayerNavigate={handleLayerNavigate}
        onAddIngredient={handleAddIngredient}
        onRemoveLast={handleRemoveLast}
        onClearCustom={handleClearCustom}
        onLayerSelect={handleLayerSelect}
        onPurchase={handlePurchase}
      />
      
      <CustomAlert
        visible={showAlert}
        type={alertConfig.type}
        title={alertConfig.title}
        message={alertConfig.message}
        confirmText={alertConfig.confirmText}
        cancelText={alertConfig.cancelText}
        onConfirm={alertConfig.onConfirm}
        onCancel={alertConfig.onCancel}
        onClose={() => setShowAlert(false)}
      />
    </>
  );
}