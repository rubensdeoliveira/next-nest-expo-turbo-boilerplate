import { Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto'
import { useFonts } from 'expo-font'
import React from 'react'
import { StatusBar } from 'react-native'
import { ThemeProvider } from 'styled-components'

import { Loading } from '@/components'
import { Home } from '@/screens'
import theme from '@/theme'

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
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <Home />
    </ThemeProvider>
  )
}
