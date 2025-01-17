import { GoogleSignin } from '@react-native-google-signin/google-signin'

import { envVars } from '../config/env'

GoogleSignin.configure({
  webClientId: envVars.EXPO_PUBLIC_GOOGLE_CLIENT_ID,
})
