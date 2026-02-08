// components/molecules/CustomAlert.tsx
import { AlertCircle, CheckCircle, ShoppingBag, XCircle } from 'lucide-react-native';
import React from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';

export type AlertType = 'success' | 'error' | 'warning' | 'info' | 'purchase';

interface CustomAlertProps {
  visible: boolean;
  type: AlertType;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  onClose?: () => void;
}

const CustomAlert: React.FC<CustomAlertProps> = ({
  visible,
  type,
  title,
  message,
  confirmText = 'Aceptar',
  cancelText = 'Cancelar',
  onConfirm,
  onCancel,
  onClose,
}) => {
  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle size={48} color="#10B981" />;
      case 'error':
        return <XCircle size={48} color="#EF4444" />;
      case 'warning':
        return <AlertCircle size={48} color="#F59E0B" />;
      case 'purchase':
        return <ShoppingBag size={48} color="#3B82F6" />;
      case 'info':
      default:
        return <AlertCircle size={48} color="#6B7280" />;
    }
  };

  const getBackgroundColor = () => {
    switch (type) {
      case 'success':
        return '#10B98120';
      case 'error':
        return '#EF444420';
      case 'warning':
        return '#F59E0B20';
      case 'purchase':
        return '#3B82F620';
      case 'info':
      default:
        return '#6B728020';
    }
  };

  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={[styles.alertContainer, { backgroundColor: '#1F2937' }]}>
          <View style={[styles.iconContainer, { backgroundColor: getBackgroundColor() }]}>
            {getIcon()}
          </View>
          
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>
          
          <View style={styles.buttonContainer}>
            {cancelText && onCancel && (
              <Pressable
                style={[styles.button, styles.cancelButton]}
                onPress={onCancel}
              >
                <Text style={styles.cancelButtonText}>{cancelText}</Text>
              </Pressable>
            )}
            
            <Pressable
              style={[styles.button, styles.confirmButton]}
              onPress={onConfirm}
            >
              <Text style={styles.confirmButtonText}>{confirmText}</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  alertContainer: {
    width: '100%',
    maxWidth: 400,
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#374151',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 8,
  },
  message: {
    fontSize: 16,
    color: '#D1D5DB',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 24,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
  },
  button: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButton: {
    backgroundColor: '#374151',
  },
  confirmButton: {
    backgroundColor: '#3B82F6',
  },
  cancelButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  confirmButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default CustomAlert;