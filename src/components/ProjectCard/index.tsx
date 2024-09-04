import { SkillEntity } from '@/modules/skill/domain/entity'
import { ProjectEntity } from '@/modules/project/domain/entity'
import { MemoryRepository } from '@/modules/skill/infrastructure/repositories/memory'
import { SkillUseCase } from '@/modules/skill/application/use_cases/skill'
import { SkillService } from '@/modules/skill/application/service/skill'

import { useState } from 'react'

import { Button } from '@/components/Button'
import { ButtonTechnology } from '@/components/ButtonTechnology'
import { ModalSkillsUsed } from '@/components/ModalSkillsUsed'

type ProjectCardProps = {
  project: ProjectEntity
}

const skillRepository = new MemoryRepository()
const skillUseCase = new SkillUseCase(skillRepository)
const skillService = new SkillService(skillUseCase)

function ProjectCard({
  project
}: ProjectCardProps) {
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
    <article className='w-full rounded bg flex justify-center p-4 mt-4'>

      {modalIsOpen && selectedSkill && projects ? (
        <ModalSkillsUsed
          skill={selectedSkill}
          projects={projects}
          setSelectedSkill={setSelectedSkill}
          setProjects={setProjects}
          setModalIsOpen={setModalIsOpen}
        />
      ) : undefined}

      <img
        src='https://porfolio.dev/projects/svgl.webp'
        alt={project.title}
        className='w-1/2 rounded object-cover'
      />
      <div className='w-1/2 flex flex-col justify-between pl-4 text'>
        <div className='flex flex-col mb-2'>
          <h2 className='text-lg font-medium'>
            {project.title}
          </h2>
          <p className='text-pretty'>
            {project.description}
          </p>
        </div>
        <div className='flex flex-col justify-center'>
          <div className='flex flex-wrap items-center'>
            {project.technologies.map(technology => (
              <ButtonTechnology
                key={technology.id}
                technology={technology.name}
                onClick={() => fetchProjects(technology)}
              />
            ))}
          </div>
          <div className=''>
            {project.sourceCodeUrl ? (
              <Button
                type='button'
                className='mt-4 mr-1 bg-hover-secondary'
                onClick={() => window.open(project.sourceCodeUrl)}
              >
                Source code
              </Button>
            ): undefined}
            {project.previewUrl ? (
              <Button
                type='button'
                className='mt-4 bg-hover-secondary'
                onClick={() => window.open(project.previewUrl)}
              >
                Preview
              </Button>
            ) : undefined}
          </div>
        </div>
      </div>
    </article>
  )
}

export { ProjectCard }