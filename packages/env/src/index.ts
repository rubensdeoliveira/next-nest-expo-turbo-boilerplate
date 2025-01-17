import { z } from 'zod'

const api = z.object({
  SERVER_PORT: z.coerce.number(),
  DATABASE_URL: z.string().url(),
  JWT_SECRET: z.string().min(1),
  JWT_TOKEN_EXPIRES_IN: z.string().min(1),
  JWT_REFRESH_TOKEN_EXPIRES_IN_DAYS: z.coerce.number(),
  GOOGLE_CLIENT_ID: z.string().min(1),
  GOOGLE_CLIENT_SECRET: z.string().min(1),
  GOOGLE_CLIENT_CALLBACK_URL: z.string().url(),
  API_APP_NAME: z.string().min(1),
  WEB_APP_URL: z.string().url(),
  ENV: z.enum(['development', 'staging', 'production']),
})

const web = z.object({
  NEXT_PUBLIC_API_APP_URL: z.string().url(),
  API_APP_URL: z.string().url(),
  API_APP_NAME: z.string().min(1),
  ENV: z.enum(['development', 'staging', 'production']),
  JWT_SECRET: z.string().min(1),
})

const mobile = z.object({
  EXPO_PUBLIC_GOOGLE_CLIENT_ID: z.string().min(1),
  EXPO_PUBLIC_API_APP_URL: z.string().url(),
  EXPO_PUBLIC_ENV: z.enum(['development', 'staging', 'production']),
})

/* Do not touch anything below */

export type EnvApiSchema = z.infer<typeof api>
export type EnvWebSchema = z.infer<typeof web>
export type EnvMobileSchema = z.infer<typeof mobile>

export function getApiEnv() {
  return getEnvResult(api) as EnvApiSchema
}

export function getWebEnv() {
  return getEnvResult(web) as EnvWebSchema
}

export function getMobileEnv() {
  return getEnvResult(mobile) as EnvMobileSchema
}

function getEnvResult(schema: z.ZodSchema) {
  const parsed = schema.safeParse(process.env)
  if (parsed.success === false) {
    console.error(
      '❌ Invalid environment variables:',
      parsed.error.flatten().fieldErrors,
    )
    throw new Error('Invalid environment variables')
  } else {
    return parsed.data
  }
}
