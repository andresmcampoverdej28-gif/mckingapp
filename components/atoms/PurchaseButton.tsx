import { ShoppingBag } from 'lucide-react-native';
import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

interface PurchaseButtonProps {
  onPress: () => void;
  disabled?: boolean;
}

const PurchaseButton = ({ onPress, disabled = false }: PurchaseButtonProps) => {
  return (
    <Pressable 
      style={[styles.button, disabled && styles.buttonDisabled]}
      onPress={onPress}
      disabled={disabled}
      android_ripple={{ color: 'rgba(255,255,255,0.2)' }}
    >
      <ShoppingBag color="#fff" size={24} />
      <Text style={styles.buttonText}>Comprar Hamburguesa</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    backgroundColor: '#27ae60',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    width: '90%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonDisabled: {
    backgroundColor: '#95a5a6',
    opacity: 0.6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
});

export default PurchaseButton;