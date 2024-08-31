import { Technology } from '@/constants'

export interface ProjectEntity {
  id?: string
  title: string
  description: string
  technologies: TechnologyEntity[]
  sourceCodeUrl?: string
  previewUrl?: string
}

export interface TechnologyEntity {
  id?: string
  name: Technology
}