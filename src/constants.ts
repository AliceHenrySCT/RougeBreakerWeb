import { Dimensions, Platform } from "react-native";

// Fixed aspect ratio for consistent gameplay across all devices
const FIXED_ASPECT_RATIO = 9 / 16; // Width to height ratio (mobile portrait)

// Fixed dimensions based on modern Android phone (e.g., Samsung Galaxy S24, Pixel 8)
const ANDROID_PHONE_WIDTH = 360; // Standard Android dp width
const ANDROID_PHONE_HEIGHT = 800; // Standard Android dp height

// Web-compatible dimension handling with scalable fixed aspect ratio
const getScreenDimensions = () => {
  if (Platform.OS === 'web') {
    // Use fixed Android phone dimensions for web to ensure consistent experience
    return {
      width: ANDROID_PHONE_WIDTH,
      height: ANDROID_PHONE_HEIGHT,
    };
  }
  
  // For native platforms, use screen dimensions but maintain aspect ratio
  const screenDimensions = Dimensions.get("screen");
  const screenWidth = screenDimensions.width;
  const screenHeight = screenDimensions.height;
  
  let width, height;
  
  if (screenWidth / screenHeight > FIXED_ASPECT_RATIO) {
    // Screen is wider than target ratio, constrain by height
    height = Math.max(screenHeight, ANDROID_PHONE_HEIGHT);
    width = height * FIXED_ASPECT_RATIO;
    
    // Ensure we meet minimum width requirement
    if (width < ANDROID_PHONE_WIDTH) {
      width = ANDROID_PHONE_WIDTH;
      height = width / FIXED_ASPECT_RATIO;
    }
  } else {
    // Screen is taller than target ratio, constrain by width
    width = Math.max(screenWidth, ANDROID_PHONE_WIDTH);
    height = width / FIXED_ASPECT_RATIO;
    
    // Ensure we meet minimum height requirement
    if (height < ANDROID_PHONE_HEIGHT) {
      height = ANDROID_PHONE_HEIGHT;
      width = height * FIXED_ASPECT_RATIO;
    }
  }
  
  return {
    width: Math.floor(width),
    height: Math.floor(height),
  };
};

const { height: windowHeight, width: windowWidth } = getScreenDimensions();

export const BALL_COLOR = "#d1d5db"; // Light grey color

export const TOTAL_BRICKS = 60; // Increased for solid wall
export const BRICK_ROW_LENGTH = 12; // 12 bricks per row
export const PADDLE_HEIGHT = Math.floor(windowHeight * 0.056); // ~40px at 711px height
export const PADDLE_WIDTH = Math.floor(windowWidth * 0.25); // ~100px at 400px width
export const BRICK_HEIGHT = Math.floor(windowHeight * 0.028); // ~20px at 711px height
export const BRICK_WIDTH = windowWidth / 12; // Bricks span full width
export const BRICK_MIDDLE = windowWidth / 2 - BRICK_WIDTH / 2;
export const PADDLE_MIDDLE = windowWidth / 2 - PADDLE_WIDTH / 2;
export const RADIUS = Math.floor(windowWidth * 0.0175); // ~7px at 400px width
export const MAX_SPEED = Math.floor(windowWidth * 0.1); // ~40px at 400px width
export const BRICK_START_Y = Math.floor(windowHeight * 0.141); // ~100px at 711px height

export const height = windowHeight;
export const width = windowWidth;

// Export the fixed aspect ratio for use in other components
export const ASPECT_RATIO = FIXED_ASPECT_RATIO;