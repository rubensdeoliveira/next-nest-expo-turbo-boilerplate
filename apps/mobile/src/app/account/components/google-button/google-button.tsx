import { GoogleSignin } from '@react-native-google-signin/google-signin'
import React from 'react'

import { Button } from '@/app/shared/components/button/button'
import { envVars } from '@/infra/config/env'

GoogleSignin.configure({
  webClientId: envVars.EXPO_PUBLIC_GOOGLE_CLIENT_ID,
  scopes: ['email', 'profile'],
})

export function GoogleButton() {
  async function handleSignInWithGoogle() {
    try {
      const response = await GoogleSignin.signIn()
      console.log(response)
    } catch (error) {
      console.error('Erro no login com Google:', error)
    }
  }

  return <Button title="Sign in with Google" onPress={handleSignInWithGoogle} />
}
