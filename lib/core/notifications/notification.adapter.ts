import Constants from 'expo-constants';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

// ============================================
// TIPOS
// ============================================
export type NotificationPermissionStatus = 'granted' | 'denied' | 'undetermined';

export interface NotificationSetupResult {
  token: string | null;
  status: NotificationPermissionStatus;
  error?: string;
}

// ============================================
// CONFIGURACIÓN GLOBAL DE NOTIFICACIONES
// ============================================
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

// ============================================
// ADAPTER PRINCIPAL
// ============================================
export const NotificationAdapter = {

  // 1. Obtener permisos actuales
  getPermissionStatus: async (): Promise<NotificationPermissionStatus> => {
    const { status } = await Notifications.getPermissionsAsync();
    return status as NotificationPermissionStatus;
  },

  // 2. Solicitar permisos
  requestPermissions: async (): Promise<NotificationPermissionStatus> => {
    const { status } = await Notifications.requestPermissionsAsync();
    return status as NotificationPermissionStatus;
  },

  // 3. Configurar canal Android
  setupAndroidChannel: async (): Promise<void> => {
    if (Platform.OS !== 'android') return;

    await Notifications.setNotificationChannelAsync('default', {
      name: 'Notificaciones',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#f39c12',
      sound: 'default',
      enableVibrate: true,
      showBadge: true,
    });
  },

  // 4. Obtener token de Expo Push
  getExpoPushToken: async (): Promise<string | null> => {
    const projectId = Constants.expoConfig?.extra?.eas?.projectId;

    if (!projectId) {
      console.warn('⚠️ No se encontró projectId en expoConfig. Verifica app.json/app.config.js');
      return null;
    }

    try {
      const { data } = await Notifications.getExpoPushTokenAsync({ projectId });
      return data;
    } catch (error: any) {
      console.error('❌ Error obteniendo token:', error.message);
      return null;
    }
  },

  // 5. Método principal: registrar dispositivo para notificaciones
  registerForPushNotificationsAsync: async (): Promise<NotificationSetupResult> => {
    // Solo en dispositivos físicos
    if (!Device.isDevice) {
      console.warn('⚠️ Push Notifications solo funcionan en dispositivos físicos.');
      return { token: null, status: 'denied', error: 'Simulador no soportado' };
    }

    // Configurar canal Android
    await NotificationAdapter.setupAndroidChannel();

    // Verificar permisos actuales
    let status = await NotificationAdapter.getPermissionStatus();

    // Solicitar permisos si no están concedidos
    if (status !== 'granted') {
      status = await NotificationAdapter.requestPermissions();
    }

    // Sin permiso, no hay token
    if (status !== 'granted') {
      console.warn('🚫 Permiso de notificaciones denegado.');
      return { token: null, status: 'denied', error: 'Permiso denegado por el usuario' };
    }

    // Obtener token
    const token = await NotificationAdapter.getExpoPushToken();

    if (!token) {
      return { token: null, status: 'granted', error: 'No se pudo obtener el token' };
    }

    console.log('🔑 Token obtenido:', token);
    return { token, status: 'granted' };
  },

  // 6. Suscribirse a notificaciones recibidas (foreground)
  onNotificationReceived: (
    callback: (notification: Notifications.Notification) => void
  ): (() => void) => {
    const subscription = Notifications.addNotificationReceivedListener(callback);
    return () => subscription.remove();
  },

  // 7. Suscribirse a tap en notificaciones (background/killed)
  onNotificationTapped: (
    callback: (response: Notifications.NotificationResponse) => void
  ): (() => void) => {
    const subscription = Notifications.addNotificationResponseReceivedListener(callback);
    return () => subscription.remove();
  },
};