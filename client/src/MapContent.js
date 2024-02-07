/* import React from 'react';
import { StyleSheet, View } from 'react-native';
import Mapbox from '@rnmapbox/maps';

// THIS IS THE REACT NATIVE MAPBOX NPM PACKAGE APPROACH
// https://github.com/rnmapbox/maps 

Mapbox.setAccessToken('');
// remember to add the access token here ^^

export const MapContent = () => {
  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <Mapbox.MapView style={styles.map} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    height: 300,
    width: 300,
  },
  map: {
    flex: 1
  }
}); */