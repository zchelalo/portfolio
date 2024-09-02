import { SkillEntity } from '@/modules/skill/domain/entity'
import { ProjectEntity } from '@/modules/project/domain/entity'
import { MemoryRepository } from '@/modules/skill/infrastructure/repositories/memory'
import { SkillUseCase } from '@/modules/skill/application/use_cases/skill'

import { useState } from 'react'

import { SkillLevel } from '@/constants'

import { toast } from 'sonner'
import { firstLetterToUpperCase } from '@/utils/string'

import { ModalSkillsUsed } from '@/modules/skill/ui/components/ModalSkillsUsed'
import { ButtonTechnology } from '@/components/ButtonTechnology'

type SkillsLayoutProps = {
  level: SkillLevel
  skills: SkillEntity[]
}

const skillRepository = new MemoryRepository()
const skillUseCase = new SkillUseCase(skillRepository)

function SkillsLayout({
  level,
  skills
}: SkillsLayoutProps) {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [selectedSkill, setSelectedSkill] = useState<SkillEntity>()
  const [projects, setProjects] = useState<ProjectEntity[]>()

  const fetchProjects = async (skill: SkillEntity) => {
    if (!skill) {
      toast.info('No skill selected')
      return
    }
    const skillObtained = await skillUseCase.getSkillById(skill.id as string)

    if (!skillObtained) {
      toast.error('Skill not found')
      return
    }
    if (!skillObtained.projects.length) {
      toast.info('No projects to show')
      return
    }

    setSelectedSkill(skillObtained.skill)
    setProjects(skillObtained.projects)
    setModalIsOpen(true)
  }

  return (
    <section className='w-full flex flex-col mt-4'>
      {modalIsOpen && selectedSkill && projects ? (
        <ModalSkillsUsed
          skill={selectedSkill}
          projects={projects}
          setSelectedSkill={setSelectedSkill}
          setProjects={setProjects}
          setModalIsOpen={setModalIsOpen}
        />
      ) : undefined}

      <h2 className='text text-xl font-medium'>{firstLetterToUpperCase(level)}</h2>
      <div className='w-full flex flex-wrap items-center'>
        {skills.map(skill => (
          <ButtonTechnology
            key={skill.id}
            technology={skill.name}
            onClick={() => fetchProjects(skill)}
          />
        ))}
      </div>
    </section>
  )
}

export { SkillsLayout }