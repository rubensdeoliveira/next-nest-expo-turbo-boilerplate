import axios from 'axios'

import { envVars } from '../config/env'

export function setupAPI() {
  const axiosApi = axios.create({
    baseURL: envVars.API_APP_URL,
  })

  return axiosApi
}

export const api = setupAPI()
