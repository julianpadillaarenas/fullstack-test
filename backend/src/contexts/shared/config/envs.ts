import zod from 'zod'
import { config } from 'dotenv'


const envSchema = zod.object({
  PORT: zod.string().transform((val) => parseInt(val)).nonoptional(),
  DATABASE_URL:  zod.string().nonempty(),
})

type IEnv = zod.infer<typeof envSchema>

class Env {
  private static envs: IEnv

  private constructor(){}

  public static getInstance(): IEnv{
    config()
    if(!Env.envs){
      const result = envSchema.safeParse(process.env)
      if(result?.error){
        console.error(`
          ❌ Invalid environment variables: ${JSON.stringify(result.error.format())}
        `)
        throw new Error('Invalid Environment variables')
      }
      Env.envs = result?.data
    }
    return Env.envs
  }
}

export const {
  PORT,
  DATABASE_URL,
}: IEnv = Env.getInstance()