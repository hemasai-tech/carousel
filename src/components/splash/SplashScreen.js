import React, {useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';

const SplashScreen = props => {
  useEffect(() => {
    // Use setTimeout to navigate to another screen after 4 seconds
    const timer = setTimeout(() => {
      props.navigation.replace('Carousel');
    }, 4000); // 4000 milliseconds (4 seconds)

    // Clear the timeout when the component unmounts to avoid memory leaks
    return () => clearTimeout(timer);
  }, [props.navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welocme Vumonic Datalabs</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#12486B', 
  },
  text: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default SplashScreen;
