import { z } from 'zod'

const client = z.object({
  NEXT_PUBLIC_API_URL: z.string().url(),
  NEXT_PUBLIC_BASE_URL: z.string().url(),
  NEXT_PUBLIC_APP_NAME: z.string().min(1),
  NEXT_PUBLIC_ENV: z.enum(['development', 'staging', 'production']),
})

const server = z.object({
  SERVER_PORT: z.coerce.number(),
  DATABASE_URL: z.string().url(),
  JWT_SECRET: z.string().min(1),
  JWT_TOKEN_EXPIRES_IN: z.string().min(1),
  JWT_REFRESH_TOKEN_EXPIRES_IN_DAYS: z.coerce.number(),
  GOOGLE_CLIENT_ID: z.string().min(1),
  GOOGLE_CLIENT_SECRET: z.string().min(1),
  GOOGLE_CLIENT_CALLBACK_URL: z.string().url(),
  API_APP_NAME: z.string().min(1),
  CLIENT_APP_URL: z.string().url(),
  NODE_ENV: z.enum(['development', 'staging', 'production']),
})

/* Do not touch anything below */

export type EnvClientSchema = z.infer<typeof client>
export type EnvServerSchema = z.infer<typeof server>

export function getClientEnv() {
  return getEnvResult(client) as EnvClientSchema
}

export function getServerEnv() {
  return getEnvResult(server) as EnvServerSchema
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
