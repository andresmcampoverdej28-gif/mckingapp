import React from 'react';
import { View, StyleSheet } from 'react-native';
import SectionTab from '@/components/atoms/SectionTab';

interface TabSelectorProps {
  activeTab: 'layers' | 'assembled';
  onTabChange: (tab: 'layers' | 'assembled') => void;
}

const TabSelector = ({ activeTab, onTabChange }: TabSelectorProps) => {
  return (
    <View style={styles.container}>
      <SectionTab
        title="Por Capas"
        active={activeTab === 'layers'}
        onPress={() => onTabChange('layers')}
      />
      <SectionTab
        title="Ensamblada"
        active={activeTab === 'assembled'}
        onPress={() => onTabChange('assembled')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 20,
    width: '100%',
  },
});

export default TabSelector;