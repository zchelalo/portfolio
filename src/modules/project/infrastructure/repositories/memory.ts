import { ProjectEntity } from '@/modules/project/domain/entity'
import { SkillEntity } from '@/modules/skill/domain/entity'
import { ProjectRepository } from '@/modules/project/domain/repository'

import { Language, Technology } from '@/constants'

import { skills } from '@/modules/skill/infrastructure/repositories/memory'

import { i18next as i18n } from '@/config/i18n'

import notitasPreview from '@/assets/images/projects/notitas.png'

const skillsNotitas: SkillEntity[] = []

const node = skills.find(skill => skill.name === Technology.NODE)
if (node) skillsNotitas.push(node)

const sequelize = skills.find(skill => skill.name === Technology.SEQUELIZE)
if (sequelize) skillsNotitas.push(sequelize)

const postgresql = skills.find(skill => skill.name === Technology.POSTGRESQL)
if (postgresql) skillsNotitas.push(postgresql)

const docker = skills.find(skill => skill.name === Technology.DOCKER)
if (docker) skillsNotitas.push(docker)

const react = skills.find(skill => skill.name === Technology.REACT)
if (react) skillsNotitas.push(react)

const tailwindCss = skills.find(skill => skill.name === Technology.TAILWIND_CSS)
if (tailwindCss) skillsNotitas.push(tailwindCss)

const shadcn = skills.find(skill => skill.name === Technology.SHADCN)
if (shadcn) skillsNotitas.push(shadcn)

const i18next = skills.find(skill => skill.name === Technology.I18NEXT)
if (i18next) skillsNotitas.push(i18next)

const zod = skills.find(skill => skill.name === Technology.ZOD)
if (zod) skillsNotitas.push(zod)

const javascript = skills.find(skill => skill.name === Technology.JAVASCRIPT)
if (javascript) skillsNotitas.push(javascript)

const express = skills.find(skill => skill.name === Technology.EXPRESS)
if (express) skillsNotitas.push(express)

export const projects: ProjectEntity[] = [
  {
    id: '123e4567-e89b-12d3-a456-426614174000',
    title: 'Notitas',
    description: 'A simple note-taking app built with microservices architecture. It uses a React frontend, a Node.js backend, and a PostgreSQL database. It also uses Docker and Docker Compose for development and deployment.',
    technologies: skillsNotitas,
    sourceCodeUrl: 'https://github.com/zchelalo/notitas',
    previewUrl: notitasPreview,
    lang: Language.EN
  },
  {
    id: '123e4567-e89b-12d3-a456-426614174001',
    title: 'Notitas',
    description: 'Una aplicación simple para tomar notas construida con arquitectura de microservicios. Utiliza un frontend en React, un backend en Node.js y una base de datos PostgreSQL. También emplea Docker y Docker Compose para el desarrollo y despliegue.',
    technologies: skillsNotitas,
    sourceCodeUrl: 'https://github.com/zchelalo/notitas',
    previewUrl: notitasPreview,
    lang: Language.ES
  }
]

export class MemoryRepository implements ProjectRepository {
  async getProjectById(id: string): Promise<ProjectEntity> {
    const projectObtained = projects.find(project => project.id === id)
    if (!projectObtained) {
      throw new Error(`project with id ${id} not found`)
    }
    return projectObtained
  }

  async getProjects(offset: number, limit: number): Promise<ProjectEntity[]> {
    let projectsObtained = projects.filter(project => project.lang === i18n.language)
    if (projectsObtained.length === 0) {
      throw new Error('projects not found')
    }
    projectsObtained = projectsObtained.slice(offset, offset + limit)
    if (projectsObtained.length === 0) {
      throw new Error('projects not found')
    }
    return projectsObtained
  }
}