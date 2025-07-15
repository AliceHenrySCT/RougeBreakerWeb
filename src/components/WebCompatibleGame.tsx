import React from 'react';
import { Platform, View, Text, StyleSheet } from 'react-native';
import { WithSkiaWeb } from '@shopify/react-native-skia/lib/module/web';
import { width, height, ASPECT_RATIO } from '@/src/constants';

// Web-specific wrapper using WithSkiaWeb for proper WASM loading
const WebCompatibleGame: React.FC<any> = (props) => {
  const { onTabVisibilityChange = () => {}, onGameEnd = () => {}, ...otherProps } = props;

  if (Platform.OS === 'web') {
    return (
      <WithSkiaWeb
        getComponent={() => import('./Game').then(module => ({ default: (gameProps: any) => <module.default {...props} /> }))}
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
    width: width,
    height: height,
    alignSelf: 'center',
    aspectRatio: ASPECT_RATIO,
  },
  loadingText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Inter-Regular',
  },
});

export default WebCompatibleGame;