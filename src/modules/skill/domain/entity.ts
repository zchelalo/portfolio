import { SkillLevel, Technology } from '@/constants'

export interface SkillEntity {
  id?: string
  name: Technology
  level: SkillLevel
}