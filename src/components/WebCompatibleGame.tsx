import React, { useEffect, useState } from 'react';
import { Platform, View, Text, StyleSheet } from 'react-native';
import Game from './Game';

// Web-specific wrapper to handle platform differences
const WebCompatibleGame: React.FC<any> = (props) => {
  const [isReady, setIsReady] = useState(Platform.OS !== 'web');
  const [isLoading, setIsLoading] = useState(Platform.OS === 'web');

  useEffect(() => {
    if (Platform.OS === 'web') {
      // For web, we need to ensure Skia is ready
      const checkSkiaReady = async () => {
        try {
          // Try to import Skia and check if it's available
          const { Skia } = await import('@shopify/react-native-skia');
          
          if (Skia && typeof Skia.RuntimeEffect !== 'undefined') {
            console.log('Skia is ready');
            setIsReady(true);
            setIsLoading(false);
          } else {
            // If Skia isn't ready, try again after a short delay
            setTimeout(checkSkiaReady, 100);
          }
        } catch (error) {
          console.warn('Skia not ready yet, retrying...', error);
          setTimeout(checkSkiaReady, 100);
        }
      };
      
      checkSkiaReady();
    }
  }, []);

  if (Platform.OS === 'web' && isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading Game...</Text>
      </View>
    );
  }

  if (!isReady) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Initializing...</Text>
      </View>
    );
  }

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