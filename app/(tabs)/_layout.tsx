import React, { createContext, useContext, useState } from 'react';
import { Tabs } from 'expo-router';
import { Play, Trophy, Settings } from 'lucide-react-native';
import * as NavigationBar from 'expo-navigation-bar';
import { useEffect, Platform } from 'react';
import { View, StyleSheet } from 'react-native';
import { width, height } from '@/src/constants';

// Create context for tab visibility
const TabVisibilityContext = createContext<{
  tabsVisible: boolean;
  setTabsVisible: (visible: boolean) => void;
}>({
  tabsVisible: true,
  setTabsVisible: () => {},
});

export const useTabVisibility = () => useContext(TabVisibilityContext);

export default function TabLayout() {
  const [tabsVisible, setTabsVisible] = useState(true);

  // Hide/show Android navigation bar based on tab visibility
  useEffect(() => {
    const updateNavigationBar = async () => {
      try {
        if (tabsVisible) {
          await NavigationBar.setVisibilityAsync('visible');
        } else {
          await NavigationBar.setVisibilityAsync('hidden');
        }
      } catch (error) {
        console.error('Error updating navigation bar:', error);
      }
    };
    
    updateNavigationBar();
  }, [tabsVisible]);
  return (
    <TabVisibilityContext.Provider value={{ tabsVisible, setTabsVisible }}>
      <View style={Platform.OS === 'web' ? styles.webContainer : styles.nativeContainer}>
        <Tabs
          screenOptions={{
            headerShown: false,
            tabBarStyle: {
              backgroundColor: '#000',
              borderTopColor: '#333',
              display: tabsVisible ? 'flex' : 'none',
            },
            tabBarActiveTintColor: '#6200EE',
            tabBarInactiveTintColor: '#666',
          }}>
          <Tabs.Screen
            name="index"
            options={{
              title: 'Play',
              tabBarIcon: ({ size, color }) => (
                <Play size={size} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="leaderboard"
            options={{
              title: 'Scores',
              tabBarIcon: ({ size, color }) => (
                <Trophy size={size} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="settings"
            options={{
              title: 'Settings',
              tabBarIcon: ({ size, color }) => (
                <Settings size={size} color={color} />
              ),
            }}
          />
        </Tabs>
      </View>
    </TabVisibilityContext.Provider>
  );
}

const styles = StyleSheet.create({
  webContainer: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100vw',
    height: '100vh',
  },
  nativeContainer: {
    flex: 1,
  },
});

// Apply consistent sizing for web
if (Platform.OS === 'web' && typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
    #root {
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      width: 100vw !important;
      height: 100vh !important;
      background-color: #000 !important;
    }
    
    #root > div {
      width: ${width}px !important;
      height: ${height}px !important;
      max-width: 100vw !important;
      max-height: 100vh !important;
      background-color: #000 !important;
    }
  `;
  document.head.appendChild(style);
}