import { ProjectEntity } from '@/modules/project/domain/entity'
import { MemoryRepository } from '@/modules/project/infrastructure/repositories/memory'
import { ProjectUseCase } from '@/modules/project/application/use_cases/project'

import { NamespaceLanguage, Section } from '@/constants'

import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { SectionLayout } from '@/components/SectionLayout'
import { ProjectCard } from '@/components/ProjectCard'

import { HiOutlineCodeBracket  } from 'react-icons/hi2'

const projectRepository = new MemoryRepository()
const projectUseCase = new ProjectUseCase(projectRepository)

function Project() {
  const { t } = useTranslation(NamespaceLanguage.HEADER)
  const [projects, setProjects] = useState<ProjectEntity[]>()

  useEffect(() => {
    const fetchProjects = async () => {
      const projectsObtained = await projectUseCase.getProjects(0, 5)
      setProjects(projectsObtained)
    }

    fetchProjects()
  }, [])

  return (
    <SectionLayout
      icon={HiOutlineCodeBracket}
      title={t('ui.projects')}
      id={Section.PROJECTS}
    >
      <main className='w-full flex justify-center'>
        {projects?.map(project => (
          <div className='mt-4' key={project.id}>
            <ProjectCard
              project={project}
            />
          </div>
        ))}
      </main>
    </SectionLayout>
  )
}

export { Project }