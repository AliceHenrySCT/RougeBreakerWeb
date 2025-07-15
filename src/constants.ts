import { Dimensions, Platform } from "react-native";

// Web-compatible dimension handling with consistent aspect ratio
const getScreenDimensions = () => {
  const screenDimensions = Dimensions.get("screen");
  if (Platform.OS === 'web') {
    if (typeof window !== 'undefined') {
      // Target aspect ratio (width:height = 1:2, like a mobile phone)
      const targetAspectRatio = 0.5; // width / height
      
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      
      // Calculate dimensions that fit within the window while maintaining aspect ratio
      let width, height;
      
      if (windowWidth / windowHeight > targetAspectRatio) {
        // Window is wider than target ratio, constrain by height
        height = windowHeight;
        width = height * targetAspectRatio;
      } else {
        // Window is taller than target ratio, constrain by width
        width = windowWidth;
        height = width / targetAspectRatio;
      }
      
      return {
        width: Math.floor(width),
        height: Math.floor(height),
      };
    }
    return {
      width: 400,
      height: 800,
    };
  }
  return screenDimensions;
};

const { height: windowHeight, width: windowWidth } = getScreenDimensions();

export const BALL_COLOR = "#d1d5db"; // Light grey color

export const TOTAL_BRICKS = 60; // Increased for solid wall
export const BRICK_ROW_LENGTH = 12; // 12 bricks per row
export const PADDLE_HEIGHT = 40;
export const PADDLE_WIDTH = 100;
export const BRICK_HEIGHT = 20; // Smaller bricks
export const BRICK_WIDTH = windowWidth / 12; // Bricks span full width
export const BRICK_MIDDLE = windowWidth / 2 - BRICK_WIDTH / 2;
export const PADDLE_MIDDLE = windowWidth / 2 - PADDLE_WIDTH / 2;
export const RADIUS = 7; // Even smaller ball
export const MAX_SPEED = 40;
export const BRICK_START_Y = 100; // Starting Y position for bricks

export const height = windowHeight;
export const width = windowWidth;