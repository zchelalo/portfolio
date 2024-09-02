import { SkillEntity } from '@/modules/skill/domain/entity'
import { ProjectEntity } from '@/modules/project/domain/entity'
import { MemoryRepository } from '@/modules/skill/infrastructure/repositories/memory'
import { SkillUseCase } from '@/modules/skill/application/use_cases/skill'

import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { Technology } from '@/constants'

import { firstLetterToUpperCase } from '@/utils/string'

import { ProjectCard } from '@/components/ProjectCard'

const skillRepository = new MemoryRepository()
const skillUseCase = new SkillUseCase(skillRepository)

function Skill() {
  const { technology } = useParams()
  const navigate = useNavigate()

  const [skill, setSkill] = useState<SkillEntity>()
  const [projects, setProjects] = useState<ProjectEntity[]>()

  useEffect(() => {
    const fetchSkill = async () => {
      try {
        if (!technology) {
          navigate('/')
          return
        }

        if (!Object.values(Technology).includes(technology as Technology)) {
          navigate('/')
          return
        }

        const skillAndProjectsObtained = await skillUseCase.getSkillByTechnology(technology as Technology)
        setSkill(skillAndProjectsObtained.skill)
        setProjects(skillAndProjectsObtained.projects)
      } catch (error) {
        console.error(error)
        navigate('/')
      }
    }

    fetchSkill()
  }, [technology, navigate])

  return (
    <main>
      {skill ? (
        <>
          <h1 className='text text-2xl font-semibold'>
            Projects that use {firstLetterToUpperCase(skill.name)}
          </h1>
          {projects && projects.length > 0 ? (
            projects.map(project => (
              <ProjectCard
                key={project.id}
                project={project}
              />
            ))
          ) : undefined}
        </>
      ) : undefined}
    </main>
  )
}

export { Skill }