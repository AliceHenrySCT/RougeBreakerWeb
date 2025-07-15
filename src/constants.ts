import { Dimensions, Platform } from "react-native";

// Web-compatible dimension handling
const getScreenDimensions = () => {
  const screenDimensions = Dimensions.get("screen");
  if (Platform.OS === 'web') {
    if (typeof window !== 'undefined') {
      return {
        width: Math.min(window.innerWidth, 400), // Cap width for better web experience
        height: Math.min(window.innerHeight, 800), // Cap height for better web experience
      };
    }
    return {
      width: Math.min(screenDimensions.width, 400),
      height: Math.min(screenDimensions.height, 800),
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