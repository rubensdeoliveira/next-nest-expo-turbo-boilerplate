import { Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto'
import { useFonts } from 'expo-font'
import React from 'react'
import { StatusBar } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { ThemeProvider } from 'styled-components'

import { Home } from '@/app/account/screens/home/home.screen'
import { Loading } from '@/app/shared/components/loading/loading'
import theme from '@/app/shared/theme/default-theme'

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  })
  if (!fontsLoaded) {
    return <Loading />
  }

  return (
    <ThemeProvider theme={theme}>
      <SafeAreaProvider style={{ backgroundColor: theme.COLORS.GRAY_800 }}>
        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          translucent
        />
        <Home />
      </SafeAreaProvider>
    </ThemeProvider>
  )
}
