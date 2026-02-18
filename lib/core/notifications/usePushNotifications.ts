import { useEffect, useRef, useState } from 'react';
import { Platform } from 'react-native';
import { supabase } from '../supabase/client.supabase';
import { NotificationAdapter } from './notification.adapter';

export interface PushNotificationState {
  token: string | null;
  isRegistered: boolean;
  isLoading: boolean;
  error: string | null;
}

export const usePushNotifications = (userId?: string) => {
  const [state, setState] = useState<PushNotificationState>({
    token: null,
    isRegistered: false,
    isLoading: false,
    error: null,
  });

  const registeredUserIdRef = useRef<string | null>(null);

  useEffect(() => {
    if (!userId) {
      console.log('⏳ [usePushNotifications] Esperando userId...');
      return;
    }

    if (registeredUserIdRef.current === userId) {
      console.log('🔁 [usePushNotifications] Usuario ya registrado, omitiendo.');
      return;
    }

    const register = async () => {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      console.log('👤 [usePushNotifications] Iniciando registro para:', userId);

      try {
        const result = await NotificationAdapter.registerForPushNotificationsAsync();
        console.log('🔑 [usePushNotifications] Resultado:', result);

        if (!result.token) {
          console.warn('❌ [usePushNotifications] No se obtuvo token:', result.error);
          setState({
            token: null,
            isRegistered: false,
            isLoading: false,
            error: result.error || 'No se obtuvo token',
          });
          return;
        }

        console.log('📱 [usePushNotifications] Token obtenido, guardando en DB...');
        await saveTokenToDatabase(result.token, userId);

        registeredUserIdRef.current = userId;
        setState({
          token: result.token,
          isRegistered: true,
          isLoading: false,
          error: null,
        });
        console.log('✅ [usePushNotifications] Registro exitoso para:', userId);
      } catch (error: any) {
        console.error('❌ [usePushNotifications] Error:', error);
        setState({
          token: null,
          isRegistered: false,
          isLoading: false,
          error: error.message || 'Error inesperado',
        });
      }
    };

    register();
  }, [userId]);

  // Suscripción a notificaciones (opcional)
  useEffect(() => {
    const unsubscribeReceived = NotificationAdapter.onNotificationReceived((notification) => {
      console.log('🔔 Notificación recibida en foreground:', notification.request.content.title);
    });

    const unsubscribeTapped = NotificationAdapter.onNotificationTapped((response) => {
      const data = response.notification.request.content.data;
      console.log('👆 Notificación tocada, data:', data);
    });

    return () => {
      unsubscribeReceived();
      unsubscribeTapped();
    };
  }, []);

  return state;
};

async function saveTokenToDatabase(token: string, userId: string): Promise<void> {
  try {
    console.log('📤 [saveTokenToDatabase] Llamando a register_device...');
    const { data, error } = await supabase.rpc('register_device', {
      p_user_id: userId,
      p_token: token,
      p_platform: Platform.OS,
    });

    if (error) {
      console.error('❌ [saveTokenToDatabase] Error en RPC:', error.message);
      throw new Error(error.message);
    }

    console.log('✅ [saveTokenToDatabase] Dispositivo registrado con ID:', data);
  } catch (error: any) {
    console.error('❌ [saveTokenToDatabase] Error:', error.message);
    throw error;
  }
}