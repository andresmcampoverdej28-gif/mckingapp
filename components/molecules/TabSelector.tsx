import React from 'react';
import { StyleSheet, View } from 'react-native';
import SectionTab from '../atoms/SectionTab';

interface TabSelectorProps {
  activeTab: 'layers' | 'assembled' | 'custom'; // Agregar 'custom'
  onTabChange: (tab: 'layers' | 'assembled' | 'custom') => void;
}

const TabSelector = ({ activeTab, onTabChange }: TabSelectorProps) => {
  return (
    <View style={styles.container}>
      <SectionTab
        title="Capas"
        active={activeTab === 'layers'}
        onPress={() => onTabChange('layers')}
      />
      <SectionTab
        title="Completa"
        active={activeTab === 'assembled'}
        onPress={() => onTabChange('assembled')}
      />
      <SectionTab
        title="Armar"
        active={activeTab === 'custom'}
        onPress={() => onTabChange('custom')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 15,
    width: '100%',
  },
});

export default TabSelector;