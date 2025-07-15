import React, { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import Game from './Game';

// Web-specific wrapper to handle platform differences
const WebCompatibleGame: React.FC<any> = (props) => {
  const [isWebReady, setIsWebReady] = useState(Platform.OS !== 'web');

  useEffect(() => {
    if (Platform.OS === 'web') {
      // Ensure CanvasKit is loaded before rendering
      const checkCanvasKit = () => {
        if (typeof window !== 'undefined' && (window as any).CanvasKitInit) {
          setIsWebReady(true);
        } else {
          setTimeout(checkCanvasKit, 100);
        }
      };
      checkCanvasKit();
    }
  }, []);

  if (!isWebReady) {
    return null; // or a loading spinner
  }

  return <Game {...props} />;
};

export default WebCompatibleGame;