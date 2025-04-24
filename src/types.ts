import * as z from 'zod'

export const WarningMessage = z.object({
  message: z.string(),
})
export type WarningMessage = z.infer<typeof WarningMessage>
