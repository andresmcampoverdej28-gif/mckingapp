import { usePushNotifications } from '@/lib/core/notifications/usePushNotifications';
import { AuthProvider, useAuth } from '@/lib/modules/auth/authProvider';
import { Stack } from "expo-router";
import { StatusBar } from 'expo-status-bar';

function AuthLayout() {
  const { session, loading } = useAuth();
  const userId = session?.user?.id;

  console.log('🔐 AuthLayout - loading:', loading, 'userId:', userId);

  // Registrar notificaciones cuando userId esté disponible
  usePushNotifications(userId);

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: '#1a1a2e' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' },
        contentStyle: { backgroundColor: '#1a1a2e' },
      }}
    >
      <Stack.Screen name="index" options={{ title: 'Inicio', headerShown: false }} />
      <Stack.Screen name="auth/register" options={{ title: 'Registro', headerShown: false }} />
      <Stack.Screen name="burger-viewer" options={{ title: 'Burger Viewer', headerShown: false }} />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <StatusBar style="light" />
      <AuthLayout />
    </AuthProvider>
  );
}