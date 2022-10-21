import {z} from 'zod'

const StringEnvSchema = z.string().min(1)
const EnvsSchema = z.object({
  VITE_OPENWEATHER_APIKEY: StringEnvSchema,
})

export const envVars = EnvsSchema.parse(import.meta.env)
