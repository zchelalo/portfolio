import { ProjectEntity } from '@/modules/project/domain/entity'
import { SkillEntity } from '@/modules/skill/domain/entity'
import { ProjectRepository } from '@/modules/project/domain/repository'

import { Language, Technology } from '@/constants'

import { skills } from '@/modules/skill/infrastructure/repositories/memory'

import { i18next as i18n } from '@/config/i18n'

const skillsNotitas: SkillEntity[] = []
const skillsSaloncito: SkillEntity[] = []

const node = skills.find(skill => skill.name === Technology.NODE)
if (node) {
  skillsNotitas.push(node)
  skillsSaloncito.push(node)
}

const postgresql = skills.find(skill => skill.name === Technology.POSTGRESQL)
if (postgresql) {
  skillsNotitas.push(postgresql)
  skillsSaloncito.push(postgresql)
}

const docker = skills.find(skill => skill.name === Technology.DOCKER)
if (docker) {
  skillsNotitas.push(docker)
  skillsSaloncito.push(docker)
}

const react = skills.find(skill => skill.name === Technology.REACT)
if (react) {
  skillsNotitas.push(react)
  skillsSaloncito.push(react)
}

const javascript = skills.find(skill => skill.name === Technology.JAVASCRIPT)
if (javascript) skillsNotitas.push(javascript)

const express = skills.find(skill => skill.name === Technology.EXPRESS)
if (express) {
  skillsNotitas.push(express)
  skillsSaloncito.push(express)
}

const go = skills.find(skill => skill.name === Technology.GO)
if (go) skillsSaloncito.push(go)

const typescript = skills.find(skill => skill.name === Technology.TYPESCRIPT)
if (typescript) skillsSaloncito.push(typescript)

const aws = skills.find(skill => skill.name === Technology.AWS)
if (aws) skillsSaloncito.push(aws)

export const projects: ProjectEntity[] = [
  {
    id: '123e4567-e89b-12d3-a456-426614174002',
    title: 'Saloncito',
    description: 'An e-learning platform for students and teachers, similar to Google Classroom. Built with a microservices architecture using a React frontend, an authentication service in TypeScript/Node.js, and user, API gateway, and class management services in Go. Each microservice has its own database. The system is containerized with Docker and orchestrated using Docker Compose.',
    technologies: skillsSaloncito,
    sourceCodeUrl: 'https://github.com/zchelalo/saloncito',
    previewUrl: '/images/projects/saloncito.png',
    lang: Language.EN
  },
  {
    id: '123e4567-e89b-12d3-a456-426614174003',
    title: 'Saloncito',
    description: 'Plataforma de e-learning para estudiantes y docentes, similar a Google Classroom. Desarrollada con una arquitectura de microservicios, utilizando un frontend en React, un servicio de autenticación en TypeScript/Node.js, y microservicios de gestión de usuarios, API gateway y clases en Go. Cada microservicio cuenta con su propia base de datos. La aplicación está contenerizada con Docker y orquestada mediante Docker Compose.',
    technologies: skillsSaloncito,
    sourceCodeUrl: 'https://github.com/zchelalo/saloncito',
    previewUrl: '/images/projects/saloncito.png',
    lang: Language.ES
  },
  {
    id: '123e4567-e89b-12d3-a456-426614174000',
    title: 'Notitas',
    description: 'A simple note-taking app built with microservices architecture. It uses a React frontend, a Node.js backend, and a PostgreSQL database. It also uses Docker and Docker Compose for development and deployment.',
    technologies: skillsNotitas,
    sourceCodeUrl: 'https://github.com/zchelalo/notitas',
    previewUrl: '/images/projects/notitas.png',
    lang: Language.EN
  },
  {
    id: '123e4567-e89b-12d3-a456-426614174001',
    title: 'Notitas',
    description: 'Una aplicación simple para tomar notas construida con arquitectura de microservicios. Utiliza un frontend en React, un backend en Node.js y una base de datos PostgreSQL. También emplea Docker y Docker Compose para el desarrollo y despliegue.',
    technologies: skillsNotitas,
    sourceCodeUrl: 'https://github.com/zchelalo/notitas',
    previewUrl: '/images/projects/notitas.png',
    lang: Language.ES
  },
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