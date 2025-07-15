import React from 'react';
import { Platform, View, Text, StyleSheet } from 'react-native';
import { WithSkiaWeb } from '@shopify/react-native-skia/lib/module/web';

// Web-specific wrapper using WithSkiaWeb for proper WASM loading
const WebCompatibleGame: React.FC<any> = (props) => {
  if (Platform.OS === 'web') {
    return (
      <WithSkiaWeb
        getComponent={() => import('./Game')}
        fallback={
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Loading graphics...</Text>
          </View>
        }
      />
    );
  }

  // For native platforms, import directly
  const Game = require('./Game').default;
  return <Game {...props} />;
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Inter-Regular',
  },
});

export default WebCompatibleGame;