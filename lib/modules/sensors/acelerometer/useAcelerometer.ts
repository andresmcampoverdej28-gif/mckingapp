import { useEffect, useRef } from 'react';
import { SensorService } from '@/lib/modules/sensors/acelerometer/acelerometer.service';
import { isShaking } from '@/lib/core/logic/motion';

interface UseAccelerometerProps {
  onShake: () => void;
  enabled?: boolean; // Para poder pausar/reanudar
}

const useAccelerometer = ({ 
  onShake, 
  enabled = true 
}: UseAccelerometerProps) => {
  const subscriptionRef = useRef<any>(null);
  const lastShakeTimeRef = useRef<number>(0);
  const COOLDOWN_MS = 500; // Evitar múltiples detecciones consecutivas

  useEffect(() => {
    if (!enabled) {
      // Si está deshabilitado, limpiar suscripción
      if (subscriptionRef.current) {
        SensorService.unsubscribe(subscriptionRef.current);
        subscriptionRef.current = null;
      }
      return;
    }

    // Iniciar la suscripción al acelerómetro
    subscriptionRef.current = SensorService.subscribe((data) => {
      // Verificar si hay agitación
      if (isShaking(data)) {
        const now = Date.now();
        
        // Aplicar cooldown para evitar múltiples triggers
        if (now - lastShakeTimeRef.current > COOLDOWN_MS) {
          lastShakeTimeRef.current = now;
          onShake();
        }
      }
    });

    // Cleanup: desuscribirse al desmontar o cambiar dependencias
    return () => {
      if (subscriptionRef.current) {
        SensorService.unsubscribe(subscriptionRef.current);
        subscriptionRef.current = null;
      }
    };
  }, [onShake, enabled]);

  // No retorna nada porque es un hook de side-effect puro
  // La comunicación es a través del callback onShake
};

export default useAccelerometer;