import { supabase } from '@/lib/core/supabase/client.supabase';
import SceneLayout from '@/templates/SceneLayout';
import { useRouter } from 'expo-router';
import { UserPlus } from 'lucide-react-native';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

export default function RegisterScreen() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleRegister = async () => {
        if (!email || !password) {
            Alert.alert('Error', 'Email y contraseña son obligatorios');
            return;
        }

        setLoading(true);
        try {
            console.log('📝 Iniciando registro...');
            
            // 1. Crear usuario en Auth
            const { data: { user }, error } = await supabase.auth.signUp({
                email,
                password,
            });

            if (error) throw error;
            console.log('✅ Usuario creado:', user?.id);

            // 2. Crear Perfil
            if (user) {
                const { error: profileError } = await supabase
                    .from('profiles')
                    .insert([{ 
                        id: user.id, 
                        email: user.email, 
                        first_name: 'Usuario',
                        last_name: 'Nuevo'
                    }]);
                
                if (profileError) {
                    console.error("❌ Error creando perfil:", profileError);
                    throw profileError;
                }
                
                console.log('✅ Perfil creado');
            }

            // 3. Iniciar sesión automáticamente (forzar autenticación)
            console.log('🔑 Iniciando sesión automática...');
            const { error: signInError } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (signInError) throw signInError;
            console.log('✅ Sesión iniciada');

            // 4. Redirigir
            router.replace('/burger-viewer');

        } catch (error: any) {
            console.error('❌ Error en registro:', error);
            Alert.alert("Error", error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <SceneLayout>
            <View style={styles.container}>
                <View style={styles.header}>
                    <UserPlus color="#f39c12" size={64} />
                    <Text style={styles.title}>Crear Cuenta</Text>
                </View>

                <View style={styles.form}>
                    <TextInput 
                        placeholder="Email"
                        placeholderTextColor="#aaa"
                        value={email}
                        onChangeText={setEmail}
                        style={styles.input}
                        autoCapitalize="none"
                        keyboardType="email-address"
                    />
                    
                    <TextInput 
                        placeholder="Contraseña"
                        placeholderTextColor="#aaa"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                        style={styles.input}
                    />

                    <Pressable 
                        style={[styles.button, loading && styles.buttonDisabled]}
                        onPress={handleRegister} 
                        disabled={loading}
                    >
                        {loading ? (
                            <ActivityIndicator color="#fff" />
                        ) : (
                            <Text style={styles.buttonText}>Crear Cuenta</Text>
                        )}
                    </Pressable>
                </View>
            </View>
        </SceneLayout>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        gap: 40,
    },
    header: {
        alignItems: 'center',
        gap: 15,
    },
    title: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#fff',
    },
    form: {
        width: '100%',
        gap: 15,
    },
    input: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.3)',
        padding: 15,
        borderRadius: 10,
        fontSize: 16,
        color: '#fff',
    },
    button: {
        backgroundColor: '#f39c12',
        padding: 18,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
    },
    buttonDisabled: {
        opacity: 0.6,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '700',
    },
});