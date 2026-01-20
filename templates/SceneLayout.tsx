import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';

interface SceneLayoutProps {
  children: React.ReactNode;
  backgroundColor?: string;
}

const SceneLayout = ({ 
  children, 
  backgroundColor = '#1a1a2e' 
}: SceneLayoutProps) => {
  return (
    <View style={[styles.container, { backgroundColor }]}>
      <StatusBar barStyle="light-content" />
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SceneLayout;