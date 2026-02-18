import CustomAlert from '@/components/molecules/CustomAlert';
import BurgerViewerScreen from '@/components/organisms/BurgerViewerScreen';
import { burgerModels } from '@/lib/config/burgerModels';
import { usePushNotifications } from '@/lib/core/notifications/usePushNotifications';
import { supabase } from '@/lib/core/supabase/client.supabase';
import { useAuth } from '@/lib/modules/auth/authProvider';
import React, { useCallback, useState } from 'react';

// ============================================
// CONSTANTES
// ============================================
const LAYER_SPACING = 0.6;

const BURGER_LAYERS = [
  { name: 'Pan Inferior',  modelUrl: burgerModels.panInferior,  yOffset: 0 },
  { name: 'Carne',         modelUrl: burgerModels.carne,         yOffset: LAYER_SPACING },
  { name: 'Tomate',        modelUrl: burgerModels.tomate,        yOffset: LAYER_SPACING * 2 },
  { name: 'Lechuga',       modelUrl: burgerModels.lechuga,       yOffset: LAYER_SPACING * 3 },
  { name: 'Queso',         modelUrl: burgerModels.queso,         yOffset: LAYER_SPACING * 4 },
  { name: 'Pan Superior',  modelUrl: burgerModels.panSuperior,   yOffset: LAYER_SPACING * 5 },
];

const INGREDIENT_MAP: Record<string, { name: string; modelUrl: string }> = {
  carne:   { name: 'Carne',   modelUrl: burgerModels.carne },
  queso:   { name: 'Queso',   modelUrl: burgerModels.queso },
  lechuga: { name: 'Lechuga', modelUrl: burgerModels.lechuga },
  tomate:  { name: 'Tomate',  modelUrl: burgerModels.tomate },
};

const INITIAL_CUSTOM_LAYERS = [
  { id: 'bottom-bread', name: 'Pan Inferior', modelUrl: burgerModels.panInferior, yOffset: 0 },
  { id: 'top-bread',    name: 'Pan Superior', modelUrl: burgerModels.panSuperior,  yOffset: LAYER_SPACING },
];

// ============================================
// TIPOS
// ============================================
type TabType = 'layers' | 'assembled' | 'custom';
type AlertType = 'success' | 'error' | 'warning' | 'info' | 'purchase';

interface AlertConfig {
  type: AlertType;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}

interface CustomLayer {
  id: string;
  name: string;
  modelUrl: string;
  yOffset: number;
}

// ============================================
// COMPONENTE PRINCIPAL
// ============================================
export default function BurgerViewer() {
  // --- Auth ---
  const { session, loading: authLoading } = useAuth();
  const userId = session?.user?.id;

  // --- Inicializar registro de notificaciones (solo si hay userId) ---
  usePushNotifications(userId);

  // --- UI state ---
  const [activeTab, setActiveTab]             = useState<TabType>('layers');
  const [currentLayerIndex, setCurrentLayerIndex] = useState(0);
  const [selectedLayerId, setSelectedLayerId]     = useState<string | null>(null);
  const [showAlert, setShowAlert]                 = useState(false);
  const [alertConfig, setAlertConfig]             = useState<AlertConfig>({ type: 'info', title: '', message: '' });
  const [customLayers, setCustomLayers]           = useState<CustomLayer[]>(INITIAL_CUSTOM_LAYERS);

  // ============================================
  // HANDLERS DE UI
  // ============================================
  const handleTabChange = useCallback((tab: TabType) => {
    setActiveTab(tab);
    setSelectedLayerId(null);
  }, []);

  const handleLayerNavigate = useCallback((index: number) => {
    setCurrentLayerIndex(index);
  }, []);

  const handleAddIngredient = useCallback((key: string) => {
    const ingredient = INGREDIENT_MAP[key];
    if (!ingredient) return;

    setCustomLayers(prev => {
      const newLayers   = [...prev];
      const topIndex    = newLayers.length - 1;
      const prevYOffset = newLayers[topIndex - 1]?.yOffset ?? 0;

      const newLayer: CustomLayer = {
        id:       `${key}-${Date.now()}`,
        name:     ingredient.name,
        modelUrl: ingredient.modelUrl,
        yOffset:  prevYOffset + LAYER_SPACING,
      };

      newLayers.splice(topIndex, 0, newLayer);
      newLayers[newLayers.length - 1].yOffset = newLayer.yOffset + LAYER_SPACING;

      return newLayers;
    });
  }, []);

  const handleRemoveLast = useCallback(() => {
    setCustomLayers(prev => {
      if (prev.length <= 2) return prev;

      const newLayers          = [...prev];
      newLayers.splice(newLayers.length - 2, 1);
      const lastIngredientIdx  = newLayers.length - 2;
      newLayers[newLayers.length - 1].yOffset =
        lastIngredientIdx >= 0 ? newLayers[lastIngredientIdx].yOffset + LAYER_SPACING : LAYER_SPACING;

      return newLayers;
    });
    setSelectedLayerId(null);
  }, []);

  const handleClearCustom = useCallback(() => {
    setCustomLayers(INITIAL_CUSTOM_LAYERS.map(l => ({ ...l })));
    setSelectedLayerId(null);
  }, []);

  const handleLayerSelect = useCallback((id: string) => {
    setSelectedLayerId(prev => (prev === id ? null : id));
  }, []);

  // ============================================
  // NOTIFICACIONES DE PEDIDO
  // ============================================
  const sendOrderNotifications = useCallback(async (targetUserId: string) => {
    try {
      console.log('📬 Enviando notificación: Pedido en preparación...');
      const { error: err1 } = await supabase.rpc('send_push_notification', {
        target_user_id: targetUserId,
        title: '🔥 Pedido en preparación',
        body:  '{nombre}, tu pedido colosal está siendo preparado 🔥',
        data:  { type: 'order_preparing' },
      });

      if (err1) console.error('❌ Error en notificación 1:', err1.message);

      setTimeout(async () => {
        console.log('📬 Enviando notificación: Pedido listo...');
        const { error: err2 } = await supabase.rpc('send_push_notification', {
          target_user_id: targetUserId,
          title: '✅ ¡Pedido listo!',
          body:  'Tu colosal pedido fue terminado, ven a aniquilarlo 🔥',
          data:  { type: 'order_ready' },
        });

        if (err2) console.error('❌ Error en notificación 2:', err2.message);
      }, 20_000);

    } catch (error: any) {
      console.error('❌ Error enviando notificaciones:', error.message);
    }
  }, []);

  // ============================================
  // FLUJO DE COMPRA MEJORADO
  // ============================================
  const handlePurchase = useCallback(async () => {
    // Verificar autenticación primero
    let targetId = userId;
    if (!targetId) {
      const { data: { user } } = await supabase.auth.getUser();
      targetId = user?.id;
    }

    if (!targetId) {
      // No hay usuario autenticado
      setAlertConfig({
        type: 'warning',
        title: 'Inicia sesión',
        message: 'Debes iniciar sesión para realizar una compra.',
        confirmText: 'Aceptar',
        onConfirm: () => setShowAlert(false),
      });
      setShowAlert(true);
      return;
    }

    const ingredientCount = customLayers.length - 2;

    // Sin ingredientes
    if (ingredientCount === 0) {
      setAlertConfig({
        type:        'warning',
        title:       '🍔 Hamburguesa vacía',
        message:     '¡Agrega al menos un ingrediente antes de comprar!',
        confirmText: 'Agregar ingredientes',
        onConfirm:   () => { setShowAlert(false); setActiveTab('custom'); },
      });
      setShowAlert(true);
      return;
    }

    const ingredientsList = customLayers
      .slice(1, -1)
      .map(layer => `• ${layer.name}`)
      .join('\n');

    const totalPrice = (ingredientCount * 1.5).toFixed(2);

    setAlertConfig({
      type:        'purchase',
      title:       '🛒 Confirmar Compra',
      message:     `Tu hamburguesa personalizada:\n\n${ingredientsList}\n\n📊 Total: ${ingredientCount} ingredientes\n💰 Precio: $${totalPrice}`,
      confirmText: 'Confirmar Compra',
      cancelText:  'Seguir Editando',
      onCancel:    () => setShowAlert(false),
      onConfirm:   async () => {
        setShowAlert(false);

        // Enviar notificaciones
        await sendOrderNotifications(targetId);

        // Mostrar alerta de éxito
        setTimeout(() => {
          setAlertConfig({
            type:        'success',
            title:       '¡Compra Exitosa! 🎉',
            message:     'Tu hamburguesa está en preparación.\n\nRecibirás notificaciones del progreso.',
            confirmText: 'Continuar',
            onConfirm:   () => { setShowAlert(false); handleClearCustom(); },
          });
          setShowAlert(true);
        }, 300);
      },
    });
    setShowAlert(true);
  }, [customLayers, userId, sendOrderNotifications, handleClearCustom]);

  // ============================================
  // RENDER
  // ============================================
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