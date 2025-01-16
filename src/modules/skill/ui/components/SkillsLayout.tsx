import { SkillEntity } from '@/modules/skill/domain/entity'
import { ProjectEntity } from '@/modules/project/domain/entity'
import { MemoryRepository } from '@/modules/skill/infrastructure/repositories/memory'
import { SkillUseCase } from '@/modules/skill/application/use_cases/skill'
import { SkillService } from '@/modules/skill/application/service/skill'

import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { NamespaceLanguage, SkillLevel } from '@/constants'

import { ModalSkillsUsed } from '@/components/ModalSkillsUsed'
import { ButtonTechnology } from '@/components/ButtonTechnology'

type SkillsLayoutProps = {
  level: SkillLevel
  skills: SkillEntity[]
}

const skillRepository = new MemoryRepository()
const skillUseCase = new SkillUseCase(skillRepository)
const skillService = new SkillService(skillUseCase)

function SkillsLayout({
  level,
  skills
}: SkillsLayoutProps) {
  const { t } = useTranslation(NamespaceLanguage.COMMON)
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [selectedSkill, setSelectedSkill] = useState<SkillEntity>()
  const [projects, setProjects] = useState<ProjectEntity[]>()

  const fetchProjects = async (skill: SkillEntity) => {
    const skillAndProjects = await skillService.fetchSkillAndProjects(skill, 0, 10)

    if (!skillAndProjects) {
      return
    }

    setSelectedSkill(skillAndProjects.skill)
    setProjects(skillAndProjects.projects)
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

      <h2 className='text text-xl font-medium'>{t(level)}</h2>
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