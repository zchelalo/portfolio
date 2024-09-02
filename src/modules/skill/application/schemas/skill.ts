import { z } from 'zod'

import { SkillLevel } from '@/constants'

export const getSkillByIDSchema = z.object({
  id: z.string().uuid()
})

export const paginationSchema = z.object({
  offset: z.number().int().min(0),
  limit: z.number().int().positive()
})

export const filtersSchema = z.object({
  level: z.nativeEnum(SkillLevel).optional()
})