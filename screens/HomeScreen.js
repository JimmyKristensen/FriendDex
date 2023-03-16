import * as React from 'react';
import { StyleSheet, View, Button } from 'react-native';

const HomeScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Button 
        title="Friendex"
        onPress={() => navigation.navigate("AllDexScreen")}
      />
      <Button 
        title="Create new FreindDex entry"
        onPress={() => navigation.navigate("CreateDexScreen")}
      />
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-evenly',
      }
})