
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface AppTitleProps {
  text: string;

}

const AppTitle = ({ text }: AppTitleProps) => {
  return (
    <View style={styles.container}>

      <Text style={styles.title}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#eee',
  },
});

export default AppTitle;