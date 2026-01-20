import React from 'react';
import { StyleSheet, Text } from 'react-native';

interface LayerInfoProps {
  name: string;
}

const LayerInfo = ({ name }: LayerInfoProps) => {
  return <Text style={styles.name}>{name}</Text>;
};

const styles = StyleSheet.create({
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
});

export default LayerInfo;