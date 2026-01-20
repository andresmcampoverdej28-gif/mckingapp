import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

interface SectionTabProps {
  title: string;
  active: boolean;
  onPress: () => void;
}

const SectionTab = ({ title, active, onPress }: SectionTabProps) => {
  return (
    <Pressable 
      style={[styles.tab, active && styles.tabActive]} 
      onPress={onPress}
    >
      <Text style={[styles.tabText, active && styles.tabTextActive]}>
        {title}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 10,
  },
  tabActive: {
    backgroundColor: '#f39c12',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#aaa',
  },
  tabTextActive: {
    color: '#fff',
  },
});

export default SectionTab;