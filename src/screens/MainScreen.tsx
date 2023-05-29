import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

interface Props {
  navigation: any
}

const MainScreen: React.FC<Props> = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Button color={'green'} title="Tasks" onPress={() => navigation.navigate('Tasks')} />
      <Button title="Lists" onPress={() => navigation.navigate('Lists')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
});

export default MainScreen;