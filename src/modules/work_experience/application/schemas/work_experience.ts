import { z } from 'zod'

export const getWorkExperienceByIDSchema = z.object({
  id: z.string().uuid()
})

export const paginationSchema = z.object({
  offset: z.number().int().min(0),
  limit: z.number().int().positive()
})