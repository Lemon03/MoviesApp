import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, View } from 'react-native';
import { ThemeProvider, createTheme, darkColors, lightColors } from '@rneui/themed';
import AppStack from './src/components/stacks/AppStack';

export default function App() {
  const theme = createTheme({
    lightColors: {
      ...Platform.select({
        default: lightColors.platform.android,
        ios: lightColors.platform.ios
      })
    },
    darkColors: {
      ...Platform.select({
        default: darkColors.platform.android,
        ios: darkColors.platform.ios
      })
    },
    mode: 'light'
  })


  return (
    <ThemeProvider theme={theme}>
      <SafeAreaView className="flex flex-1" backgroundColor="#2e4a70">
        <StatusBar style="light" backgroundColor="#2e4a70"/>
        <AppStack />
      </SafeAreaView>
    </ThemeProvider>
  );
}