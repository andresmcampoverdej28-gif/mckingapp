import SceneLayout from '@/templates/SceneLayout';
import { useRouter } from 'expo-router';
import { Eye, Hamburger } from 'lucide-react-native';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function Index() {
  const router = useRouter();

  return (
    <SceneLayout>
      <View style={styles.content}>
        <View style={styles.titleContainer}>
          <Hamburger color="#f39c12" size={80} />
          <Text style={styles.title}>Welcome to Kolossos'Burger</Text>
        </View>
        
        <Text style={styles.subtitle}>Visualiza una hamburguesa en 3D</Text>
        
        <Pressable 
          style={styles.button} 
          onPress={() => router.push('/burger-viewer' as any)}
        >
          <Eye color="#fff" size={32} />
          <Text style={styles.buttonText}>Ver Hamburguesa</Text>
        </Pressable>
      </View>
    </SceneLayout>
  );
}

const styles = StyleSheet.create({
  content: {
    alignItems: 'center',
    gap: 40,
  },
  titleContainer: {
    alignItems: 'center',
    gap: 20,
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#fff',
  },
  subtitle: {
    fontSize: 18,
    color: '#aaa',
    textAlign: 'center',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    backgroundColor: '#f39c12',
    paddingHorizontal: 45,
    paddingVertical: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  buttonText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
  },
});