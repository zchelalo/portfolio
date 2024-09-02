import { SkillEntity } from '@/modules/skill/domain/entity'
import { ProjectEntity } from '@/modules/project/domain/entity'
import { MemoryRepository } from '@/modules/skill/infrastructure/repositories/memory'
import { SkillUseCase } from '@/modules/skill/application/use_cases/skill'

import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { Technology } from '@/constants'

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
    <div>
      <pre>
        {skill && JSON.stringify(skill, null, 2)}
      </pre>
      <pre>
        {projects && JSON.stringify(projects, null, 2)}
      </pre>
    </div>
  )
}

export { Skill }