import axios from 'axios'

import { envVars } from '../config/env'

export function setupAPI() {
  const axiosApi = axios.create({
    baseURL: envVars.NEXT_PUBLIC_API_URL,
  })

  return axiosApi
}

export const api = setupAPI()
